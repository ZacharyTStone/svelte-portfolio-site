/**
 * Motion utilities for the SPA — Lenis smooth-scroll + Motion One scroll-driven choreography.
 *
 * All helpers are no-ops on the server and on reduced-motion. Motion + Lenis are dynamically
 * imported so they don't ship with the initial bundle; init from onMount + requestIdleCallback.
 */

export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isCoarsePointer(): boolean {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

export function isNarrowViewport(): boolean {
	if (typeof window === 'undefined') return false;
	return window.innerWidth < 768;
}

/** Match `.experience-stage` desktop pin layout (`@media min-width: 901px`). */
export function prefersExperienceHorizontalPin(): boolean {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia('(min-width: 901px)').matches;
}

/** Idle-load wrapper. Falls back to setTimeout if requestIdleCallback isn't available. */
export function onIdle(cb: () => void, timeout = 1500): () => void {
	if (typeof window === 'undefined') return () => {};
	const ric = (window as any).requestIdleCallback as
		| undefined
		| ((cb: () => void, opts?: { timeout?: number }) => number);
	const cic = (window as any).cancelIdleCallback as undefined | ((id: number) => void);
	if (typeof ric === 'function') {
		const id = ric(cb, { timeout });
		return () => cic?.(id);
	}
	const id = window.setTimeout(cb, 120);
	return () => window.clearTimeout(id);
}

const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));

// ─────────────────────────────────────────────────────────────────
// Lenis smooth-scroll
// ─────────────────────────────────────────────────────────────────

let lenisInstance: { raf: (time: number) => void; destroy: () => void } | null = null;

export async function initLenis(): Promise<() => void> {
	if (typeof window === 'undefined') return () => {};
	if (prefersReducedMotion() || isCoarsePointer()) return () => {};
	if (lenisInstance) return () => {};

	const { default: Lenis } = await import('lenis');
	const lenis = new Lenis({
		duration: 1.05,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		wheelMultiplier: 1,
		touchMultiplier: 1
	});

	let rafId = 0;
	function raf(time: number) {
		lenis.raf(time);
		rafId = requestAnimationFrame(raf);
	}
	rafId = requestAnimationFrame(raf);

	lenisInstance = lenis as unknown as typeof lenisInstance;

	return () => {
		cancelAnimationFrame(rafId);
		lenis.destroy();
		lenisInstance = null;
	};
}

// ─────────────────────────────────────────────────────────────────
// Cursor-aware ambient orb
// ─────────────────────────────────────────────────────────────────

/**
 * Make an element follow the mouse with damped easing. The element is moved via
 * CSS custom properties so the styling layer can compose the offset with other transforms.
 */
export function setupCursorOrb(orb: HTMLElement): () => void {
	if (typeof window === 'undefined') return () => {};
	if (prefersReducedMotion() || isCoarsePointer()) return () => {};

	let targetX = window.innerWidth * 0.65;
	let targetY = window.innerHeight * 0.35;
	let currentX = targetX;
	let currentY = targetY;
	let rafId = 0;

	const onMove = (e: MouseEvent) => {
		targetX = e.clientX;
		targetY = e.clientY;
	};

	const tick = () => {
		const damp = 0.06;
		currentX += (targetX - currentX) * damp;
		currentY += (targetY - currentY) * damp;
		orb.style.setProperty('--orb-x', `${currentX}px`);
		orb.style.setProperty('--orb-y', `${currentY}px`);
		rafId = requestAnimationFrame(tick);
	};

	window.addEventListener('mousemove', onMove, { passive: true });
	rafId = requestAnimationFrame(tick);

	return () => {
		window.removeEventListener('mousemove', onMove);
		cancelAnimationFrame(rafId);
	};
}

// ─────────────────────────────────────────────────────────────────
// Hero choreography (scroll-tied)
// ─────────────────────────────────────────────────────────────────

export interface HeroElements {
	section: HTMLElement;
	eyebrow: HTMLElement;
	name: HTMLElement;
	tagline: HTMLElement;
	ctas: HTMLElement;
	scrollCue: HTMLElement;
}

export async function setupHeroChoreography(els: HeroElements): Promise<() => void> {
	if (typeof window === 'undefined') return () => {};
	if (prefersReducedMotion() || isNarrowViewport()) return () => {};

	const { scroll } = await import('motion');

	const cleanup = scroll(
		(info: any) => {
			const p = clamp(info.y?.progress ?? 0);

			// Name: scale 1 → 0.42, drift up-left, soft blur near end, opacity fade in last third
			const scale = 1 - p * 0.58;
			const translateX = -p * 6; // vw — drifts left toward nav
			const translateY = -p * 8; // vh — drifts up toward nav
			const nameBlur = clamp(p - 0.65) * 8;
			els.name.style.transform = `translate3d(${translateX}vw, ${translateY}vh, 0) scale(${scale})`;
			els.name.style.opacity = `${1 - clamp((p - 0.55) * 2.2)}`;
			els.name.style.filter = `blur(${nameBlur}px)`;

			// Eyebrow: slide up, fade out by mid
			els.eyebrow.style.opacity = `${1 - clamp(p * 1.6)}`;
			els.eyebrow.style.transform = `translate3d(0, ${-p * 24}px, 0)`;

			// Tagline: blur-fade in starting at p≈0.18, settled by p≈0.55
			const tp = clamp((p - 0.18) / 0.4);
			els.tagline.style.opacity = `${tp}`;
			els.tagline.style.filter = `blur(${(1 - tp) * 8}px)`;
			els.tagline.style.transform = `translate3d(0, ${(1 - tp) * 26}px, 0)`;

			// CTAs: appear last
			const cp = clamp((p - 0.42) / 0.28);
			els.ctas.style.opacity = `${cp}`;
			els.ctas.style.transform = `translate3d(0, ${(1 - cp) * 22}px, 0)`;

			// Scroll cue: fades immediately on first scroll
			els.scrollCue.style.opacity = `${1 - clamp(p * 4)}`;
		},
		{
			target: els.section,
			offset: ['start start', 'end start']
		}
	);

	return () => {
		try {
			cleanup?.();
		} catch {
			/* noop */
		}
		for (const el of [els.name, els.eyebrow, els.tagline, els.ctas, els.scrollCue]) {
			el.style.transform = '';
			el.style.opacity = '';
			el.style.filter = '';
		}
	};
}

// ─────────────────────────────────────────────────────────────────
// Horizontal-pin choreography (shared by Projects + Experience)
// ─────────────────────────────────────────────────────────────────

export interface HorizontalPinElements {
	section: HTMLElement;
	track: HTMLElement;
	cards: HTMLElement[];
	progress?: HTMLElement;
	onActiveIndexChange?: (index: number) => void;
}

export interface HorizontalPinOptions {
	/** Min scale for cards furthest from center. Default 0.86. */
	scaleMin?: number;
	/** Min opacity for cards furthest from center. Default 0.6. */
	opacityMin?: number;
	/** Max blur (px) on cards far from center. Default 0 (off). */
	blurMax?: number;
	/** Width of the "in-focus" zone as a fraction of viewport width. Default 0.55. */
	focusWindow?: number;
	/** Map scroll progress to discrete card positions (equal steps) instead of smooth scrub. */
	snapToCards?: boolean;
	/** Minimum viewport width (px) at which this pin activates. Below it, falls back to static layout via CSS. Default 768. */
	minWidth?: number;
}

const DRAG_SCROLL_MOVE_PX = 6;

/** Pointer-drag to change scrollLeft on a horizontal overflow element; skips touch-primary devices. */
export function setupPointerDragHorizontalScroll(scrollEl: HTMLElement): () => void {
	if (typeof window === 'undefined') return () => {};
	if (isCoarsePointer()) return () => {};

	let capturedId: number | null = null;
	let startX = 0;
	let startScrollLeft = 0;
	let dragMoved = false;

	function onPointerDown(e: PointerEvent) {
		if (e.button !== 0) return;
		capturedId = e.pointerId;
		startX = e.clientX;
		startScrollLeft = scrollEl.scrollLeft;
		dragMoved = false;
		scrollEl.setPointerCapture(e.pointerId);
		scrollEl.classList.add('is-drag-scrolling');
	}

	function onPointerMove(e: PointerEvent) {
		if (capturedId !== e.pointerId) return;
		const dx = e.clientX - startX;
		if (Math.abs(dx) > DRAG_SCROLL_MOVE_PX) dragMoved = true;
		scrollEl.scrollLeft = startScrollLeft - dx;
	}

	function onPointerEnd(e: PointerEvent) {
		if (capturedId !== e.pointerId) return;
		scrollEl.releasePointerCapture(e.pointerId);
		scrollEl.classList.remove('is-drag-scrolling');
		capturedId = null;
	}

	function onClickCapture(e: MouseEvent) {
		if (!dragMoved) return;
		e.preventDefault();
		e.stopPropagation();
		dragMoved = false;
	}

	scrollEl.addEventListener('pointerdown', onPointerDown);
	scrollEl.addEventListener('pointermove', onPointerMove);
	scrollEl.addEventListener('pointerup', onPointerEnd);
	scrollEl.addEventListener('pointercancel', onPointerEnd);
	scrollEl.addEventListener('click', onClickCapture, true);

	return () => {
		scrollEl.removeEventListener('pointerdown', onPointerDown);
		scrollEl.removeEventListener('pointermove', onPointerMove);
		scrollEl.removeEventListener('pointerup', onPointerEnd);
		scrollEl.removeEventListener('pointercancel', onPointerEnd);
		scrollEl.removeEventListener('click', onClickCapture, true);
		scrollEl.classList.remove('is-drag-scrolling');
	};
}

export async function setupHorizontalPin(
	els: HorizontalPinElements,
	opts: HorizontalPinOptions = {}
): Promise<() => void> {
	if (typeof window === 'undefined') return () => {};
	if (prefersReducedMotion()) return () => {};

	const {
		scaleMin = 0.86,
		opacityMin = 0.6,
		blurMax = 0,
		focusWindow = 0.55,
		snapToCards = false,
		minWidth = 768
	} = opts;

	if (window.innerWidth < minWidth) return () => {};

	// Resolve cards: prefer the explicit array, fall back to direct children of the track.
	let cards = els.cards.filter(Boolean) as HTMLElement[];
	if (cards.length === 0) {
		cards = Array.from(els.track.children).filter(
			(c) => (c as HTMLElement).dataset?.pinSpacer !== ''
		) as HTMLElement[];
		// Drop any spacer element marked for exclusion
		cards = cards.filter((c) => !c.classList.contains('pin-spacer'));
	}
	if (cards.length === 0) return () => {};

	const computeTravel = () => {
		const trackWidth = els.track.scrollWidth;
		const wrap = els.track.parentElement;
		const containerWidth = wrap?.clientWidth ?? els.section.clientWidth;
		return Math.max(0, trackWidth - containerWidth);
	};

	let travelPx = computeTravel();
	let lastIndex = -1;
	let rafId = 0;
	let pending = false;

	function update() {
		pending = false;

		// Compute scroll progress from the section's bounding rect — independent of
		// Motion's scroll observer, so it works whether Lenis is active or not.
		const rect = els.section.getBoundingClientRect();
		const viewportH = window.innerHeight;
		const sectionH = rect.height;
		const scrollableH = sectionH - viewportH;

		// Progress 0 at section top == viewport top; 1 at section bottom == viewport bottom.
		const scrolled = -rect.top;
		const p = scrollableH > 0 ? clamp(scrolled / scrollableH) : 0;

		const nCards = cards.length;
		let trackProgress: number;

		if (snapToCards && nCards > 0) {
			const maxStep = Math.max(1, nCards - 1);
			const step = Math.min(maxStep, Math.max(0, Math.round(p * maxStep)));
			trackProgress = step / maxStep;
		} else {
			trackProgress = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
		}

		const x = -travelPx * trackProgress;
		els.track.style.transform = `translate3d(${x}px, 0, 0)`;

		if (els.progress) {
			els.progress.style.transform = `scaleX(${trackProgress})`;
		}

		const viewportCenter = window.innerWidth / 2;
		let bestIndex = 0;
		let bestDist = Infinity;

		cards.forEach((card, idx) => {
			const cardRect = card.getBoundingClientRect();
			const cardCenter = cardRect.left + cardRect.width / 2;
			const dist = Math.abs(cardCenter - viewportCenter);
			if (dist < bestDist) {
				bestDist = dist;
				bestIndex = idx;
			}
			const norm = clamp(dist / (window.innerWidth * focusWindow));
			const cardScale = 1 - norm * (1 - scaleMin);
			const opacity = 1 - norm * (1 - opacityMin);
			const blur = blurMax * norm;
			card.style.transform = `scale(${cardScale})`;
			card.style.opacity = `${opacity}`;
			if (blurMax > 0) {
				card.style.filter = blur > 0.05 ? `blur(${blur}px)` : '';
			}
		});

		const indexToReport = snapToCards
			? Math.min(Math.max(0, nCards - 1), Math.round(p * Math.max(1, nCards - 1)))
			: bestIndex;

		if (indexToReport !== lastIndex && els.onActiveIndexChange) {
			lastIndex = indexToReport;
			els.onActiveIndexChange(indexToReport);
		}
	}

	function onScroll() {
		if (pending) return;
		pending = true;
		rafId = requestAnimationFrame(update);
	}

	function onResize() {
		travelPx = computeTravel();
		onScroll();
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onResize, { passive: true });

	const roTrack = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
	if (roTrack) roTrack.observe(els.track);

	// Run once to set initial state.
	update();

	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onResize);
		roTrack?.disconnect();
		cancelAnimationFrame(rafId);
		els.track.style.transform = '';
		if (els.progress) els.progress.style.transform = '';
		for (const card of cards) {
			card.style.transform = '';
			card.style.opacity = '';
			card.style.filter = '';
		}
	};
}

/** Backwards-compatible alias used by ProjectsStage. */
export type ProjectsElements = HorizontalPinElements;
export const setupProjectsChoreography = (
	els: HorizontalPinElements
): Promise<() => void> => setupHorizontalPin(els);

// ─────────────────────────────────────────────────────────────────
// Generic in-view reveal (sequenced fade + lift)
// ─────────────────────────────────────────────────────────────────

export interface RevealOptions {
	delay?: number; // base delay ms
	stagger?: number; // ms between siblings
	distance?: number; // px
	duration?: number; // ms
	margin?: string;
	once?: boolean;
}

export async function setupReveals(
	els: HTMLElement[],
	opts: RevealOptions = {}
): Promise<() => void> {
	if (typeof window === 'undefined') return () => {};
	if (prefersReducedMotion()) {
		// In reduced-motion, just ensure the elements are visible and unstyled.
		for (const el of els) {
			el.style.opacity = '1';
			el.style.transform = '';
		}
		return () => {};
	}

	const {
		delay = 0,
		stagger = 80,
		distance = 28,
		duration = 720,
		margin = '0px 0px -10% 0px',
		once = true
	} = opts;

	const { inView } = await import('motion');

	for (const el of els) {
		el.style.opacity = '0';
		el.style.transform = `translate3d(0, ${distance}px, 0)`;
		el.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
		el.style.willChange = 'opacity, transform';
	}

	const cleanups: Array<() => void> = [];
	els.forEach((el, i) => {
		const fire = () => {
			const totalDelay = delay + i * stagger;
			window.setTimeout(() => {
				el.style.opacity = '1';
				el.style.transform = 'translate3d(0, 0, 0)';
			}, totalDelay);
		};

		const stop = inView(
			el,
			() => {
				fire();
				if (once) {
					// Remove transitions + clear will-change after settle to free GPU layers
					window.setTimeout(() => {
						el.style.willChange = '';
					}, delay + i * stagger + duration + 50);
				}
				return undefined;
			},
			{ margin } as any
		);
		cleanups.push(stop);
	});

	return () => cleanups.forEach((c) => c());
}

// ─────────────────────────────────────────────────────────────────
// Contact display headline scale-in
// ─────────────────────────────────────────────────────────────────

export async function setupContactScale(
	section: HTMLElement,
	heading: HTMLElement
): Promise<() => void> {
	if (typeof window === 'undefined') return () => {};
	if (prefersReducedMotion() || isNarrowViewport()) return () => {};

	const { scroll } = await import('motion');

	heading.style.transformOrigin = 'left center';
	heading.style.willChange = 'transform, letter-spacing';

	const cleanup = scroll(
		(info: any) => {
			const p = clamp(info.y?.progress ?? 0);
			// Scale 1.2 → 1.0 across the entry of the section
			const scale = 1.2 - p * 0.2;
			heading.style.transform = `scale(${scale})`;
		},
		{
			target: section,
			offset: ['start end', 'center center']
		}
	);

	return () => {
		try {
			cleanup?.();
		} catch {
			/* noop */
		}
		heading.style.transform = '';
		heading.style.willChange = '';
	};
}

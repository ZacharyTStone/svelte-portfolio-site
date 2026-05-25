<script lang="ts">
	import { browser } from '$app/environment';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { getAssetURL } from '$lib/data/assets';
	import { PROJECTS } from '$lib/params';
	import type { Project } from '$lib/types';
	import { isCoarsePointer, prefersReducedMotion } from '$lib/utils/motion';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	const visibleProjects = PROJECTS.items.filter((p) => !p.dont_show);
	const projectCount = visibleProjects.length;

	let sectionEl: HTMLElement | undefined = $state();
	let stackCardEls: HTMLElement[] = [];
	let activeIndex = $state(0);
	let stackProgress = $state(0);

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	function pickImage(project: Project): string {
		if (project.screenshots && project.screenshots.length > 0) {
			return project.screenshots[0].src;
		}
		return getAssetURL(project.logo);
	}

	function easeInQuart(t: number): number {
		return t * t * t * t;
	}

	/** Svelte action: subtle 3-D tilt + specular glare that follows the cursor. */
	function tilt(node: HTMLElement) {
		if (typeof window === 'undefined') return {};
		if (prefersReducedMotion() || isCoarsePointer()) return {};

		const STRENGTH = 5;
		const glare = node.querySelector('.showcase-glare') as HTMLElement | null;

		function onMove(e: MouseEvent) {
			const rect = node.getBoundingClientRect();
			const cx = rect.width / 2;
			const cy = rect.height / 2;
			const dx = (e.clientX - rect.left - cx) / cx;
			const dy = (e.clientY - rect.top - cy) / cy;

			node.style.transform = `perspective(900px) rotateY(${dx * STRENGTH}deg) rotateX(${-dy * STRENGTH}deg) translateY(-3px)`;
			node.style.transition = 'transform 60ms linear';

			if (glare) {
				const gx = ((e.clientX - rect.left) / rect.width) * 100;
				const gy = ((e.clientY - rect.top) / rect.height) * 100;
				glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.1) 0%, transparent 65%)`;
				glare.style.opacity = '1';
			}
		}

		function onLeave() {
			node.style.transform = '';
			node.style.transition = 'transform 480ms cubic-bezier(0.16,1,0.3,1)';
			if (glare) glare.style.opacity = '0';
		}

		node.addEventListener('mousemove', onMove, { passive: true });
		node.addEventListener('mouseleave', onLeave);

		return {
			destroy() {
				node.removeEventListener('mousemove', onMove);
				node.removeEventListener('mouseleave', onLeave);
			}
		};
	}

	onMount(() => {
		if (typeof window === 'undefined') return;

		const isWide = window.matchMedia('(min-width: 901px)').matches;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!isWide || reduced) return;

		let rafId: number;
		const n = projectCount;

		function updateStack() {
			if (!sectionEl) return;
			const rect = sectionEl.getBoundingClientRect();
			const scrollTotal = sectionEl.offsetHeight - window.innerHeight;
			if (scrollTotal <= 0) return;

			const scrolled = Math.max(0, -rect.top);
			const p = Math.min(1, scrolled / scrollTotal);
			const activeFloat = p * n;
			const newActive = Math.min(n - 1, Math.floor(activeFloat));
			const cardProgress = activeFloat - newActive;

			activeIndex = newActive;
			stackProgress = p;

			stackCardEls.forEach((card, i) => {
				if (!card) return;
				const diff = i - newActive;
				let ty = 0,
					scale = 1,
					opacity = 0;

				if (diff < 0) {
					// Exited: instantly hidden above
					ty = -110;
					scale = 0.9;
					opacity = 0;
					card.style.zIndex = '0';
				} else if (diff === 0) {
					// Active card
					card.style.zIndex = String(n + 1);
					if (cardProgress > 0.55) {
						const t = easeInQuart((cardProgress - 0.55) / 0.45);
						ty = -110 * t;
						scale = 1 - 0.1 * t;
						opacity = 1 - t;
					} else {
						opacity = 1;
					}
				} else if (diff === 1) {
					// Next card: fades in as active card exits
					card.style.zIndex = String(n);
					if (cardProgress > 0.55) {
						const t = easeInQuart((cardProgress - 0.55) / 0.45);
						ty = 4 - 4 * t; // slides up from 4% to 0%
						scale = 0.97 + 0.03 * t;
						opacity = t;
					} else {
						ty = 4;
						scale = 0.97;
						opacity = 0;
					}
				} else {
					// All other waiting cards: invisible
					ty = 4;
					scale = 0.94;
					opacity = 0;
					card.style.zIndex = String(n - diff);
				}

				card.style.transform = `translateY(${ty}%) scale(${scale})`;
				card.style.opacity = String(Math.max(0, Math.min(1, opacity)));
			});
		}

		function onScroll() {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(updateStack);
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		updateStack();

		return () => {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(rafId);
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="projects"
	class="projects-stage"
	style="--project-count: {projectCount}"
	aria-labelledby="projects-heading"
>
	<!-- ── DESKTOP: Stacked scroll-driven stack ─────────────── -->
	<div class="projects-pin" aria-hidden="false">
		<header class="pin-header">
			<div class="projects-header-row">
				<div>
					<div class="mono-eyebrow">{safeT('PROJECTS.eyebrow')}</div>
					<h2 id="projects-heading" class="projects-title">
						{safeT('PROJECTS.heading_prefix')}
						<span class="accent">{safeT('PROJECTS.heading_accent')}</span>
					</h2>
				</div>
				<div class="projects-counter mono-eyebrow" aria-live="polite">
					<span class="projects-counter-label">{safeT('PROJECTS.counter_label')}</span>
					<span class="projects-counter-num">
						{(activeIndex + 1).toString().padStart(2, '0')} / {projectCount.toString().padStart(2, '0')}
					</span>
				</div>
			</div>
		</header>

		<div class="stack-viewport">
			{#each visibleProjects as project, i (project.slug)}
				<div class="stack-card" bind:this={stackCardEls[i]} style="--card-i: {i}">
					<div class="stack-card-inner" use:tilt>
						<div class="showcase-glare" aria-hidden="true"></div>

						<div class="stack-left">
							<div class="stack-meta-top">
								<span class="stack-eyebrow mono-eyebrow">{safeT(project.type ?? '')}</span>
								<span class="stack-card-index mono-eyebrow" aria-hidden="true">
									{(i + 1).toString().padStart(2, '0')} / {projectCount.toString().padStart(2, '0')}
								</span>
							</div>
							<h3 class="stack-title">{safeT(project.name)}</h3>
							<p class="stack-desc">{safeT(project.shortDescription)}</p>
							{#if project.project_skills?.length}
								<div class="stack-tags">
									{#each project.project_skills.slice(0, 5) as tag}
										<span class="showcase-tag">{tag.label}</span>
									{/each}
									{#if (project.project_skills.length ?? 0) > 5}
										<span class="showcase-tag-more">+{project.project_skills.length - 5}</span>
									{/if}
								</div>
							{/if}
							<a href="/projects/{project.slug}" class="stack-cta">
								<span>{safeT('PROJECTS.open_case')}</span>
								<UIcon icon="i-carbon-arrow-up-right" classes="text-1.05em" alt="" />
							</a>
						</div>

						<div class="stack-right">
							<img
								class="stack-image"
								src={pickImage(project)}
								alt={safeT(project.name)}
								loading={i < 2 ? 'eager' : 'lazy'}
								decoding="async"
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<footer class="pin-footer">
			<div class="pin-progress-track">
				<div
					class="pin-progress-fill"
					style="transform: scaleX({stackProgress.toFixed(4)})"
				></div>
			</div>
			<div class="pin-scroll-hint mono-eyebrow">
				<UIcon icon="i-carbon-arrow-down" classes="text-1em" alt="" />
				<span>{safeT('PROJECTS.scroll_hint')}</span>
			</div>
		</footer>
	</div>

	<!-- ── MOBILE: existing CSS grid ───────────────────────── -->
	<div class="projects-inner">
		<header class="projects-header">
			<div class="projects-header-row">
				<div>
					<div class="mono-eyebrow">{safeT('PROJECTS.eyebrow')}</div>
					<h2 class="projects-title" aria-hidden="true">
						{safeT('PROJECTS.heading_prefix')}
						<span class="accent">{safeT('PROJECTS.heading_accent')}</span>
					</h2>
				</div>
				<div class="projects-counter mono-eyebrow">
					<span class="projects-counter-label">{safeT('PROJECTS.counter_label')}</span>
					<span class="projects-counter-num">{projectCount.toString().padStart(2, '0')}</span>
				</div>
			</div>
		</header>

		<ul class="projects-grid">
			{#each visibleProjects as project, i (project.slug)}
				<li class="projects-grid-item" style="--card-i: {i}">
					<a href="/projects/{project.slug}" class="showcase" use:tilt>
						<div class="showcase-glare" aria-hidden="true"></div>
						<div class="showcase-frame">
							<img
								class="showcase-image"
								src={pickImage(project)}
								alt={safeT(project.name)}
								loading={i < 3 ? 'eager' : 'lazy'}
								decoding="async"
							/>
							<div class="showcase-frame-overlay" aria-hidden="true"></div>
							<span class="showcase-index mono-eyebrow" aria-hidden="true">
								{(i + 1).toString().padStart(2, '0')} / {projectCount.toString().padStart(2, '0')}
							</span>
						</div>

						<div class="showcase-meta">
							<div class="showcase-eyebrow mono-eyebrow">
								{safeT(project.type ?? '')}
							</div>
							<h3 class="showcase-title">{safeT(project.name)}</h3>
							<p class="showcase-desc">{safeT(project.shortDescription)}</p>
							{#if project.project_skills?.length}
								<div class="showcase-tags">
									{#each project.project_skills.slice(0, 4) as tag}
										<span class="showcase-tag">{tag.label}</span>
									{/each}
									{#if (project.project_skills.length ?? 0) > 4}
										<span class="showcase-tag-more">
											+{project.project_skills.length - 4}
										</span>
									{/if}
								</div>
							{/if}
							<span class="showcase-cta">
								<span>{safeT('PROJECTS.open_case')}</span>
								<UIcon icon="i-carbon-arrow-up-right" classes="text-1.05em" alt="" />
							</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	/* ─── Section ──────────────────────────────────────── */
	.projects-stage {
		position: relative;
		scroll-margin-top: var(--scroll-anchor-offset);
	}

	/* ─── Sticky pin (base — desktop only via media query below) ── */
	.projects-pin {
		display: none; /* hidden by default; desktop @media below enables it */
		position: sticky;
		top: var(--nav-h);
		height: calc(100dvh - var(--nav-h));
		grid-template-rows: auto minmax(0, 1fr) auto;
		gap: clamp(0.6rem, 1.5vh, 1.25rem);
		padding-block: clamp(1rem, 2.5vh, 1.75rem);
		overflow: hidden;
	}

	/* ─── Desktop: tall section for scroll-driven stack ── */
	@media (min-width: 901px) {
		.projects-stage {
			height: calc(var(--project-count, 6) * 85vh + 20vh);
		}

		.projects-pin {
			display: grid; /* enable the sticky pin on desktop */
		}

		.projects-inner {
			display: none;
		}
	}

	/* ─── Mobile: normal document flow ─────────────────── */
	@media (max-width: 900px) {
		.projects-stage {
			padding-block: clamp(2.5rem, 7vh, 5rem);
		}
	}

	/* ─── Pin header ────────────────────────────────────── */
	.pin-header {
		max-width: 1500px;
		margin: 0 auto;
		padding-inline: clamp(1.5rem, 6vw, 6rem);
		width: 100%;
	}

	.projects-header-row {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.projects-title {
		font-family: var(--title-f);
		font-size: clamp(1.5rem, 2.6vw, 2.5rem);
		font-weight: var(--fw-medium);
		line-height: 1.15;
		letter-spacing: -0.015em;
		color: var(--main-text);
		margin: 0.35rem 0 0 0;
		max-width: 26ch;
		overflow-wrap: anywhere;
	}

	.accent {
		color: var(--accent-electric);
		font-style: italic;
	}

	.projects-counter {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		color: var(--secondary-text);
	}

	.projects-counter-label {
		font-size: var(--fs-xs);
	}

	.projects-counter-num {
		font-size: clamp(1.5rem, 2.4vw, 2.1rem);
		color: var(--accent-electric);
		font-weight: var(--fw-light);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	/* ─── Stack viewport ────────────────────────────────── */
	.stack-viewport {
		position: relative;
		overflow: hidden;
		min-height: 0;
	}

	/* ─── Stack card ─────────────────────────────────────── */
	.stack-card {
		position: absolute;
		top: 0;
		bottom: 0;
		left: clamp(1.5rem, 6vw, 6rem);
		right: clamp(1.5rem, 6vw, 6rem);
		will-change: transform, opacity;
		transform-origin: center top;
	}

	.stack-card-inner {
		height: 100%;
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(1.5rem, 3vw, 3rem);
		/* Opaque background prevents text from underlying cards bleeding through */
		background: var(--main-elevated);
		border: 1px solid var(--border);
		border-radius: clamp(1rem, 1.6vw, 1.5rem);
		overflow: hidden;
		position: relative;
		transition: border-color 280ms ease, box-shadow 280ms ease;
		transform-style: preserve-3d;
	}

	.stack-card-inner:hover {
		border-color: var(--accent-electric);
		box-shadow: 0 30px 80px -30px rgba(106, 166, 255, 0.4);
	}

	/* Specular glare */
	.showcase-glare {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		opacity: 0;
		pointer-events: none;
		transition: opacity 300ms ease;
		z-index: 2;
		mix-blend-mode: screen;
	}

	:global(:root[data-theme='light']) .showcase-glare {
		mix-blend-mode: overlay;
	}

	/* ─── Stack left column ─────────────────────────────── */
	.stack-left {
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2vh, 1.75rem);
		padding: clamp(1.75rem, 3vw, 3rem);
		justify-content: center;
		min-width: 0;
		position: relative;
		z-index: 1;
	}

	.stack-meta-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.stack-eyebrow {
		color: var(--accent-electric);
	}

	.stack-card-index {
		color: var(--secondary-text);
		opacity: 0.5;
	}

	.stack-title {
		font-family: var(--title-f);
		font-size: clamp(1.6rem, 3vw, 2.8rem);
		font-weight: var(--fw-semibold);
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--main-text);
		margin: 0;
		overflow-wrap: anywhere;
	}

	.stack-desc {
		font-family: var(--text-f);
		font-size: clamp(0.95rem, 1.15vw, 1.1rem);
		line-height: 1.65;
		color: var(--secondary-text);
		margin: 0;
		max-width: 52ch;
	}

	.stack-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.stack-cta {
		margin-top: 0.25rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		color: var(--accent-electric);
		text-decoration: none;
		align-self: flex-start;
		padding: 0.6em 1.1em;
		border: 1px solid var(--accent-electric);
		border-radius: 999px;
		transition: background 240ms ease, color 240ms ease;

		&:hover {
			background: var(--accent-electric);
			color: #0a0a0c;
		}
	}

	/* ─── Stack right column ────────────────────────────── */
	.stack-right {
		position: relative;
		overflow: hidden;
		background: var(--main-elevated);
	}

	.stack-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.stack-card-inner:hover .stack-image {
		transform: scale(1.04);
	}

	/* ─── Pin footer (progress) ─────────────────────────── */
	.pin-footer {
		max-width: 1500px;
		margin: 0 auto;
		padding-inline: clamp(1.5rem, 6vw, 6rem);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.pin-progress-track {
		height: 2px;
		background: var(--border);
		border-radius: 999px;
		overflow: hidden;
	}

	.pin-progress-fill {
		height: 100%;
		width: 100%;
		background: var(--accent-electric);
		transform-origin: left center;
		transform: scaleX(0);
		will-change: transform;
		box-shadow: 0 0 10px var(--accent-electric-glow);
		transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.pin-scroll-hint {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--secondary-text);
	}

	/* ─── Reduced motion: skip stack, show grid ─────────── */
	@media (min-width: 901px) and (prefers-reduced-motion: reduce) {
		.projects-stage {
			height: auto;
			padding-block: clamp(4rem, 10vh, 7rem);
		}
		.projects-pin {
			display: none;
		}
		.projects-inner {
			display: block;
		}
	}

	/* ─── Mobile grid (projects-inner) ─────────────────── */
	.projects-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding-inline: clamp(1rem, 5vw, 6rem);
		min-width: 0;
	}

	.projects-header {
		margin-bottom: clamp(2.5rem, 6vh, 4rem);
	}

	/* Grid ─────────────────────────────────── */
	.projects-grid {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(1rem, 1.8vw, 1.75rem);
		align-items: stretch;
	}

	.projects-grid-item {
		min-width: 0;
		isolation: isolate;
		opacity: 0;
		animation: project-rise 720ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: calc(150ms + var(--card-i, 0) * 70ms);
	}

	@keyframes project-rise {
		from {
			opacity: 0;
			transform: translate3d(0, 18px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@media (max-width: 1100px) {
		.projects-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.projects-inner {
			padding-inline: clamp(0.85rem, 4vw, 1.5rem);
		}
		.projects-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 0.85rem;
		}
		.projects-header {
			margin-bottom: 1.5rem;
		}
		.projects-title {
			font-size: clamp(1.2rem, 6vw, 2rem);
		}
		.showcase-meta {
			padding: 0.9rem 1rem;
			gap: 0.5rem;
		}
		.showcase-title {
			font-size: 1.1rem;
		}
		.showcase-desc {
			font-size: var(--fs-sm);
			-webkit-line-clamp: 3;
			line-clamp: 3;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.projects-grid-item {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}

	/* Showcase card ────────────────────────── */
	.showcase {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
		text-decoration: none;
		color: inherit;
		background: rgba(255, 255, 255, 0.018);
		border: 1px solid var(--border);
		border-radius: clamp(0.85rem, 1.4vw, 1.4rem);
		overflow: hidden;
		position: relative;
		transition: border-color 280ms ease, box-shadow 280ms ease, transform 480ms cubic-bezier(0.16, 1, 0.3, 1);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transform-style: preserve-3d;
	}

	:global(:root[data-theme='light']) .showcase {
		background: rgba(255, 255, 255, 0.55);
	}

	.showcase:hover {
		border-color: var(--accent-electric);
		box-shadow: 0 24px 60px -20px rgba(106, 166, 255, 0.45);
	}

	.showcase-frame {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--main-elevated);
	}

	.showcase-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.showcase:hover .showcase-image {
		transform: scale(1.04);
	}

	.showcase-frame-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			transparent 0%,
			transparent 55%,
			rgba(var(--main-rgb), 0.7) 100%
		);
		pointer-events: none;
	}

	.showcase-index {
		position: absolute;
		top: 0.85rem;
		left: 0.85rem;
		padding: 0.35rem 0.65rem;
		background: rgba(0, 0, 0, 0.52);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.9);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
	}

	.showcase-meta {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		padding: clamp(1rem, 1.6vw, 1.5rem);
	}

	.showcase-eyebrow {
		color: var(--accent-electric);
	}

	.showcase-title {
		font-family: var(--title-f);
		font-size: clamp(1.2rem, 1.8vw, 1.55rem);
		font-weight: var(--fw-semibold);
		line-height: 1.2;
		letter-spacing: -0.015em;
		color: var(--main-text);
		margin: 0;
	}

	.showcase-desc {
		font-size: var(--fs-sm);
		line-height: 1.55;
		color: var(--secondary-text);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.showcase-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.25rem;
	}

	.showcase-tag {
		display: inline-flex;
		align-items: center;
		padding: 0.25em 0.55em;
		background: var(--main);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-wide);
		color: var(--secondary-text);
	}

	.showcase-tag-more {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		color: var(--accent-electric);
		align-self: center;
	}

	.showcase-cta {
		margin-top: 0.5rem;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		color: var(--accent-electric);
		align-self: flex-start;
	}
</style>

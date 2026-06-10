<script lang="ts">
	/**
	 * Global depth-of-field starfield rendered behind the whole SPA flow.
	 *
	 * - Particles drift toward the camera; scroll velocity warps them into
	 *   light streaks (forward when scrolling down, backward when scrolling up).
	 * - The hue of the whole scene eases toward a per-section target, and is
	 *   published as `--scene-hue` / `--accent-electric-rgb` on :root so the
	 *   site's accent color travels with you.
	 * - No-op on prefers-reduced-motion. Pauses when the tab is hidden.
	 */
	import { activeSection } from '$lib/stores/activeSection';
	import { isCoarsePointer, isNarrowViewport, prefersReducedMotion } from '$lib/utils/motion';
	import { onMount } from 'svelte';

	const SECTION_HUES: Record<string, number> = {
		hero: 216, // electric blue
		about: 190, // cyan
		experience: 250, // indigo
		projects: 285, // violet
		skills: 170, // teal
		resume: 210, // blue
		contact: 320 // magenta finale
	};

	const DEFAULT_HUE = 216;

	let canvasEl: HTMLCanvasElement | undefined = $state();

	interface Particle {
		x: number;
		y: number;
		z: number;
		prevSx: number;
		prevSy: number;
		hasPrev: boolean;
	}

	function hslToRgbTriplet(h: number, s: number, l: number): string {
		const sat = s / 100;
		const lig = l / 100;
		const k = (n: number) => (n + h / 30) % 12;
		const a = sat * Math.min(lig, 1 - lig);
		const f = (n: number) => lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
		return [f(0), f(8), f(4)].map((v) => Math.round(v * 255)).join(', ');
	}

	onMount(() => {
		if (!canvasEl || prefersReducedMotion()) return;

		const canvas = canvasEl;
		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		const root = document.documentElement;
		const lite = isCoarsePointer() || isNarrowViewport();
		const COUNT = lite ? 70 : 150;

		let width = 0;
		let height = 0;
		let dpr = 1;

		function resize() {
			width = window.innerWidth;
			height = window.innerHeight;
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
		}
		resize();

		const particles: Particle[] = Array.from({ length: COUNT }, () => ({
			x: Math.random() * 2 - 1,
			y: Math.random() * 2 - 1,
			z: 0.08 + Math.random() * 0.92,
			prevSx: 0,
			prevSy: 0,
			hasPrev: false
		}));

		function respawn(p: Particle, atFar: boolean) {
			p.x = Math.random() * 2 - 1;
			p.y = Math.random() * 2 - 1;
			p.z = atFar ? 0.95 + Math.random() * 0.05 : 0.08 + Math.random() * 0.08;
			p.hasPrev = false;
		}

		let targetHue = SECTION_HUES[document.location.hash.slice(1)] ?? DEFAULT_HUE;
		let hue = targetHue;
		let appliedHue = Number.NaN;

		const unsubscribe = activeSection.subscribe((id) => {
			targetHue = SECTION_HUES[id] ?? DEFAULT_HUE;
		});

		function publishHue() {
			if (Math.abs(hue - appliedHue) < 0.3) return;
			appliedHue = hue;
			root.style.setProperty('--scene-hue', hue.toFixed(1));
			root.style.setProperty('--accent-electric-rgb', hslToRgbTriplet(hue, 100, 71));
		}

		let lastScrollY = window.scrollY;
		let velocity = 0; // smoothed, signed px/s
		let lastTime = 0;
		let rafId = 0;
		let running = true;
		let auroraPhase = Math.random() * 100;

		function drawAurora(t: number) {
			const blobs: Array<[number, number, number, number]> = [
				// [x-frac, y-frac, radius-frac, alpha-mult]
				[0.22 + Math.sin(t * 0.05 + auroraPhase) * 0.06, 0.3 + Math.cos(t * 0.04) * 0.08, 0.62, 1],
				[
					0.8 + Math.cos(t * 0.045 + auroraPhase) * 0.05,
					0.72 + Math.sin(t * 0.06) * 0.07,
					0.55,
					0.8
				]
			];
			const dark = root.getAttribute('data-theme') !== 'light';
			const baseAlpha = dark ? 0.075 : 0.055;
			for (const [fx, fy, fr, am] of blobs) {
				const cx = fx * width;
				const cy = fy * height;
				const r = fr * Math.max(width, height);
				const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r);
				g.addColorStop(0, `hsla(${hue.toFixed(1)}, 85%, ${dark ? 62 : 52}%, ${baseAlpha * am})`);
				g.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
				ctx!.fillStyle = g;
				ctx!.fillRect(cx - r, cy - r, r * 2, r * 2);
			}
		}

		function frame(now: number) {
			if (!running) return;
			const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
			lastTime = now;

			// Signed scroll velocity, smoothed.
			const sy = window.scrollY;
			const rawV = (sy - lastScrollY) / Math.max(dt, 0.001);
			lastScrollY = sy;
			velocity += (rawV - velocity) * 0.085;

			// Hue eases toward the active section's atmosphere.
			hue += (targetHue - hue) * Math.min(1, dt * 2.2);
			publishHue();

			ctx!.clearRect(0, 0, width, height);
			drawAurora(now / 1000);

			const dark = root.getAttribute('data-theme') !== 'light';
			// Warp factor: ±1 around two viewport-heights per second.
			const warp = Math.max(-1, Math.min(1, velocity / (height * 2.2)));
			const zSpeed = (0.045 + Math.abs(warp) * 1.25) * (warp < -0.02 ? -1 : 1) * dt;

			const cx = width / 2;
			const cy = height / 2;
			const focal = 0.85;

			ctx!.lineCap = 'round';

			for (const p of particles) {
				p.z -= zSpeed;
				if (p.z <= 0.06) {
					respawn(p, true);
				} else if (p.z >= 1) {
					respawn(p, false);
				}

				const sx = cx + (p.x * cx * focal) / p.z;
				const syp = cy + (p.y * cy * focal) / p.z;

				if (sx < -40 || sx > width + 40 || syp < -40 || syp > height + 40) {
					respawn(p, true);
					continue;
				}

				const depth = 1 - p.z; // 0 far → 1 near
				const alpha = (0.12 + depth * 0.55) * (dark ? 1 : 0.3);
				const size = 0.5 + depth * 1.9;
				const color = dark
					? `hsla(${hue.toFixed(1)}, 70%, 80%, ${alpha.toFixed(3)})`
					: `hsla(${hue.toFixed(1)}, 65%, 45%, ${alpha.toFixed(3)})`;

				if (p.hasPrev) {
					ctx!.strokeStyle = color;
					ctx!.lineWidth = size;
					ctx!.beginPath();
					ctx!.moveTo(p.prevSx, p.prevSy);
					ctx!.lineTo(sx, syp);
					ctx!.stroke();
				} else {
					ctx!.fillStyle = color;
					ctx!.beginPath();
					ctx!.arc(sx, syp, size / 2, 0, Math.PI * 2);
					ctx!.fill();
				}

				p.prevSx = sx;
				p.prevSy = syp;
				p.hasPrev = true;
			}

			rafId = requestAnimationFrame(frame);
		}

		function onVisibility() {
			if (document.hidden) {
				running = false;
				cancelAnimationFrame(rafId);
			} else if (!running) {
				running = true;
				lastTime = 0;
				lastScrollY = window.scrollY;
				rafId = requestAnimationFrame(frame);
			}
		}

		window.addEventListener('resize', resize, { passive: true });
		document.addEventListener('visibilitychange', onVisibility);
		rafId = requestAnimationFrame(frame);

		return () => {
			running = false;
			cancelAnimationFrame(rafId);
			window.removeEventListener('resize', resize);
			document.removeEventListener('visibilitychange', onVisibility);
			unsubscribe();
			root.style.removeProperty('--scene-hue');
			root.style.removeProperty('--accent-electric-rgb');
		};
	});
</script>

<canvas bind:this={canvasEl} class="scene-canvas" aria-hidden="true"></canvas>

<style>
	.scene-canvas {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100dvh;
		z-index: -1;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.scene-canvas {
			display: none;
		}
	}
</style>

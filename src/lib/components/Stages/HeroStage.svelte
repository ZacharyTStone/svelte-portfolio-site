<script lang="ts">
	import { browser } from '$app/environment';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { HOME } from '$lib/params';
	import { onIdle, setupCursorOrb, setupHeroChoreography } from '$lib/utils/motion';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	const { name, lastName, description } = HOME;

	let sectionEl: HTMLElement | undefined = $state();
	let pinEl: HTMLElement | undefined = $state();
	let eyebrowEl: HTMLElement | undefined = $state();
	let nameEl: HTMLElement | undefined = $state();
	let taglineEl: HTMLElement | undefined = $state();
	let ctasEl: HTMLElement | undefined = $state();
	let scrollCueEl: HTMLElement | undefined = $state();
	let orbEl: HTMLElement | undefined = $state();

	let motionReady = $state(false);

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	let firstName = $derived(safeT(name));
	let surname = $derived(safeT(lastName));
	let firstChars = $derived(Array.from(firstName));
	let lastChars = $derived(Array.from(surname));

	onMount(() => {
		let heroCleanup: (() => void) | null = null;
		let orbCleanup: (() => void) | null = null;

		const cancel = onIdle(() => {
			if (
				sectionEl &&
				eyebrowEl &&
				nameEl &&
				taglineEl &&
				ctasEl &&
				scrollCueEl
			) {
				setupHeroChoreography({
					section: sectionEl,
					eyebrow: eyebrowEl,
					name: nameEl,
					tagline: taglineEl,
					ctas: ctasEl,
					scrollCue: scrollCueEl
				}).then((cleanup) => {
					heroCleanup = cleanup;
					motionReady = true;
				});
			}

			if (orbEl) {
				orbCleanup = setupCursorOrb(orbEl);
			}
		});

		return () => {
			cancel();
			heroCleanup?.();
			orbCleanup?.();
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="hero"
	class="hero-stage"
	class:motion-ready={motionReady}
	aria-labelledby="hero-heading"
>
	<!-- Animated mesh gradient layers -->
	<div class="hero-bg" aria-hidden="true">
		<div class="mesh mesh-a"></div>
		<div class="mesh mesh-b"></div>
		<div class="mesh mesh-c"></div>
	</div>

	<!-- Cursor-tracked spotlight orb -->
	<div bind:this={orbEl} class="cursor-orb" aria-hidden="true"></div>

	<!-- Subtle grain overlay -->
	<div class="grain" aria-hidden="true"></div>

	<div bind:this={pinEl} class="hero-pin">
		<div class="hero-content">
			<div bind:this={eyebrowEl} class="hero-eyebrow">
				<span class="hero-eyebrow-status" aria-hidden="true">
					<span class="status-pulse"></span>
				</span>
				<span class="hero-eyebrow-label">{safeT('HERO.available_label')}</span>
			</div>

			<h1 bind:this={nameEl} id="hero-heading" class="hero-name" aria-label="{firstName} {surname}">
				<span class="hero-name-line" aria-hidden="true">
					{#each firstChars as ch, i}
						<span class="hero-name-char" style="--char-i: {i}">
							{ch === ' ' ? ' ' : ch}
						</span>
					{/each}
				</span>
				<span class="hero-name-line hero-name-line-2" aria-hidden="true">
					{#each lastChars as ch, i}
						<span class="hero-name-char" style="--char-i: {firstChars.length + i + 1}">
							{ch === ' ' ? ' ' : ch}
						</span>
					{/each}
					<span
						class="hero-name-char hero-name-period"
						style="--char-i: {firstChars.length + lastChars.length + 1}">.</span
					>
				</span>
			</h1>

			<div class="hero-meta">
				<span class="hero-meta-item">{safeT(description)}</span>
			</div>

			<p bind:this={taglineEl} class="hero-tagline">
				{safeT('ABOUT.full_about')}
			</p>

			<div bind:this={ctasEl} class="hero-cta-row">
				<a href="#projects" class="cta cta-primary">
					<span>{safeT('HERO.cta_view_work')}</span>
					<UIcon icon="i-carbon-arrow-down" classes="text-1.05em" alt="" />
				</a>
				<a href="#contact" class="cta cta-ghost">
					<span>{safeT('HERO.cta_get_in_touch')}</span>
				</a>
			</div>
		</div>

		<a
			bind:this={scrollCueEl}
			href="#about"
			class="hero-scroll-cue"
			aria-label={safeT('HERO.scroll_to_about')}
		>
			<span class="hero-scroll-cue-label">{safeT('HERO.scroll_to_explore')}</span>
			<span class="hero-scroll-cue-line" aria-hidden="true"></span>
		</a>
	</div>
</section>

<style lang="scss">
	.hero-stage {
		position: relative;
		min-height: 100dvh;
		/* Pin distance — scroll span for hero choreography (smaller than before
		   so About follows sooner after the first screen). */
		height: 135vh;
		overflow: hidden;
		isolation: isolate;
		color: var(--main-text);
	}

	/* Soft fade at bottom of hero into the next section's background */
	.hero-stage::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 30vh;
		background: linear-gradient(to bottom, transparent 0%, var(--main) 85%);
		pointer-events: none;
		z-index: 5;
	}

	.hero-pin {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100dvh;
		height: 100dvh;
		padding-block: clamp(4rem, 10vh, 8rem) clamp(2rem, 5vh, 4rem);
		padding-inline: clamp(1.5rem, 6vw, 6rem);
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: clamp(1.25rem, 2.5vw, 2rem);
		max-width: 1400px;
		width: 100%;
		margin: 0 auto;
		transform-origin: top left;
	}

	/* Mesh gradient background ─────────────── */
	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
	}

	.mesh {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.55;
		will-change: transform;
	}

	.mesh-a {
		top: -10%;
		left: -10%;
		width: 65vw;
		height: 65vw;
		max-width: 900px;
		max-height: 900px;
		background: radial-gradient(circle, rgba(106, 166, 255, 0.45) 0%, transparent 65%);
		animation: drift-a 24s ease-in-out infinite alternate;
	}

	.mesh-b {
		bottom: -20%;
		right: -10%;
		width: 70vw;
		height: 70vw;
		max-width: 1000px;
		max-height: 1000px;
		background: radial-gradient(circle, rgba(143, 188, 255, 0.3) 0%, transparent 60%);
		animation: drift-b 30s ease-in-out infinite alternate;
	}

	.mesh-c {
		top: 35%;
		left: 40%;
		width: 35vw;
		height: 35vw;
		max-width: 500px;
		max-height: 500px;
		background: radial-gradient(circle, rgba(106, 166, 255, 0.2) 0%, transparent 70%);
		animation: drift-c 26s ease-in-out infinite alternate;
		animation-delay: -8s;
	}

	@keyframes drift-a {
		0% {
			transform: translate3d(0, 0, 0) rotate(0deg);
		}
		100% {
			transform: translate3d(8vw, 6vh, 0) rotate(20deg);
		}
	}
	@keyframes drift-b {
		0% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(-6vw, -8vh, 0);
		}
	}
	@keyframes drift-c {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		100% {
			transform: translate3d(-12vw, 10vh, 0) scale(1.15);
		}
	}

	:global(:root[data-theme='light']) .mesh {
		opacity: 0.32;
	}

	/* Cursor-tracked orb ─────────────────────── */
	.cursor-orb {
		position: fixed;
		top: 0;
		left: 0;
		width: 50vmax;
		height: 50vmax;
		max-width: 900px;
		max-height: 900px;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(106, 166, 255, 0.12) 0%,
			rgba(106, 166, 255, 0.04) 45%,
			transparent 75%
		);
		filter: blur(70px);
		transform: translate(
			calc(var(--orb-x, 65vw) - 50%),
			calc(var(--orb-y, 35vh) - 50%)
		);
		pointer-events: none;
		z-index: 1;
		opacity: 0.55;
		mix-blend-mode: screen;
		will-change: transform;
	}

	:global(:root[data-theme='light']) .cursor-orb {
		opacity: 0.35;
		mix-blend-mode: multiply;
	}

	/* Grain overlay ───────────────────────────── */
	.grain {
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>");
		opacity: 0.05;
		pointer-events: none;
		z-index: 2;
		mix-blend-mode: overlay;
	}

	/* Eyebrow status pill ─────────────────────── */
	.hero-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.45rem 0.85rem 0.45rem 0.5rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.025);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-wide);
		text-transform: uppercase;
		color: var(--secondary-text);
		width: max-content;
		max-width: 100%;
		opacity: 0;
		animation: hero-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms forwards;
		will-change: transform, opacity;
		z-index: 3;
		position: relative;
	}

	:global(:root[data-theme='light']) .hero-eyebrow {
		background: rgba(0, 0, 0, 0.025);
	}

	.hero-eyebrow-status {
		position: relative;
		display: inline-flex;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent-electric);
		flex: 0 0 8px;
	}

	.status-pulse {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: var(--accent-electric);
		animation: status-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes status-ping {
		0% {
			transform: scale(1);
			opacity: 0.7;
		}
		70%,
		100% {
			transform: scale(2.6);
			opacity: 0;
		}
	}

	.hero-eyebrow-label {
		line-height: 1;
	}

	/* Massive name ────────────────────────────── */
	.hero-name {
		font-family: var(--text-f);
		font-weight: var(--fw-extrabold);
		font-size: clamp(3.5rem, 11vw, 10rem);
		line-height: 0.88;
		letter-spacing: -0.04em;
		margin: 0;
		color: var(--main-text);
		transform-origin: top left;
		will-change: transform, opacity, filter;
		display: flex;
		flex-direction: column;
		gap: 0;
		z-index: 3;
		position: relative;
	}

	.hero-name-line {
		display: inline-flex;
		flex-wrap: wrap;
	}

	.hero-name-line-2 {
		color: var(--secondary-text);
		font-weight: var(--fw-light);
		font-style: italic;
		font-family: var(--title-f);
		letter-spacing: -0.03em;
	}

	.hero-name-char {
		display: inline-block;
		opacity: 0;
		transform: translate3d(0, 60%, 0);
		animation: char-rise 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: calc(280ms + var(--char-i) * 35ms);
		will-change: transform, opacity;
	}

	.hero-name-period {
		color: var(--accent-electric);
		font-style: normal;
	}

	@keyframes char-rise {
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	/* Meta line under name ──────────────────── */
	.hero-meta {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		font-family: var(--mono-f);
		font-size: var(--fs-sm);
		letter-spacing: var(--ls-wide);
		color: var(--secondary-text);
		text-transform: uppercase;
		opacity: 0;
		animation: hero-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 1100ms forwards;
		z-index: 3;
		position: relative;
	}

	.hero-meta-item {
		position: relative;
		padding-left: 1.25rem;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			width: 0.75rem;
			height: 1px;
			background: var(--accent-electric);
		}
	}

	@keyframes hero-fade-up {
		from {
			opacity: 0;
			transform: translate3d(0, 16px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	/* Tagline + CTAs (hidden by default; revealed via scroll choreography) */
	.hero-tagline {
		font-family: var(--text-f);
		font-size: clamp(1rem, 1.4vw, 1.18rem);
		line-height: 1.7;
		color: var(--secondary-text);
		max-width: 56ch;
		margin: 0;
		font-weight: var(--fw-regular);
		will-change: transform, opacity, filter;
		z-index: 3;
		position: relative;
	}

	.hero-cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.5rem;
		will-change: transform, opacity;
		z-index: 3;
		position: relative;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.55em;
		padding: 0.95em 1.6em;
		border-radius: 999px;
		font-family: var(--mono-f);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		letter-spacing: var(--ls-wide);
		text-decoration: none;
		text-transform: uppercase;
		transition:
			transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
			background-color 220ms ease,
			border-color 220ms ease,
			color 220ms ease,
			box-shadow 220ms ease;
	}

	.cta-primary {
		background: var(--accent-electric);
		color: #0a0a0c;
		border: 1px solid var(--accent-electric);
		box-shadow: 0 8px 24px -8px var(--accent-electric-glow);
	}

	.cta-primary:hover {
		transform: translateY(-2px);
		background: #8fbcff;
		border-color: #8fbcff;
		box-shadow: 0 14px 32px -10px rgba(106, 166, 255, 0.6);
	}

	.cta-ghost {
		background: rgba(255, 255, 255, 0.02);
		color: var(--main-text);
		border: 1px solid var(--border);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	:global(:root[data-theme='light']) .cta-ghost {
		background: rgba(0, 0, 0, 0.02);
	}

	.cta-ghost:hover {
		border-color: var(--accent-electric);
		color: var(--accent-electric);
		transform: translateY(-2px);
	}

	/* Default state: tagline + CTAs visible (static fallback). When motion is
	   active on desktop, choreography hides them initially and reveals via scroll. */
	.hero-tagline {
		opacity: 0;
		animation: hero-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 1300ms forwards;
	}
	.hero-cta-row {
		opacity: 0;
		animation: hero-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 1500ms forwards;
	}

	@media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
		.hero-stage.motion-ready .hero-tagline,
		.hero-stage.motion-ready .hero-cta-row {
			animation: none;
			opacity: 0;
		}
	}

	/* Scroll cue ─────────────────────────────── */
	.hero-scroll-cue {
		position: absolute;
		bottom: clamp(1.5rem, 4vh, 2.5rem);
		left: clamp(1.5rem, 6vw, 6rem);
		display: flex;
		align-items: center;
		gap: 0.85rem;
		text-decoration: none;
		color: var(--secondary-text);
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		opacity: 0;
		animation: hero-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 1700ms forwards;
		z-index: 3;
		transition: color 220ms ease;

		&:hover {
			color: var(--accent-electric);
		}
	}

	.hero-scroll-cue-line {
		position: relative;
		width: 56px;
		height: 1px;
		background: var(--border);
		overflow: hidden;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--accent-electric);
			transform: translateX(-100%);
			animation: cue-line 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
		}
	}

	@keyframes cue-line {
		0% {
			transform: translateX(-100%);
		}
		60% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	/* Responsive: collapse pin on mobile + reduced motion ───────── */
	@media (max-width: 767px) {
		.hero-stage {
			height: auto;
		}
		.hero-pin {
			position: static;
			height: auto;
			min-height: calc(100dvh - var(--nav-h));
		}
		.hero-name {
			font-size: clamp(3rem, 18vw, 6rem);
		}
		.hero-scroll-cue {
			display: none;
		}
		.cursor-orb {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-stage {
			height: auto;
		}
		.hero-pin {
			position: static;
			height: auto;
			min-height: calc(100dvh - var(--nav-h));
		}
		.hero-name-char,
		.hero-eyebrow,
		.hero-meta,
		.hero-tagline,
		.hero-cta-row,
		.hero-scroll-cue {
			animation: none !important;
			opacity: 1 !important;
			transform: none !important;
		}
		.mesh,
		.status-pulse,
		.hero-scroll-cue-line::before {
			animation: none !important;
		}
		.cursor-orb {
			display: none;
		}
	}
</style>

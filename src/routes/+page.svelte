<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import HeroLetters from '$lib/components/Page/HeroLetters.svelte';
	import { HOME, TITLE_SUFFIX } from '$lib/params';
	import { handleNavigation, useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';

	let { description, lastName, links, name, title } = HOME;

	let tiltContainer: HTMLElement | null = null;
	let mouseX = 0;
	let mouseY = 0;

	function handleMouseMove(event: MouseEvent): void {
		if (!tiltContainer) return;

		const rect = tiltContainer.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		// Calculate distance from center
		mouseX = ((event.clientX - centerX) / (rect.width / 2)) * 5;
		mouseY = ((event.clientY - centerY) / (rect.height / 2)) * 5;
	}

	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<HeroLetters />
<div
	class="hero-container relative items-center overflow-hidden bg-transparent"
	bind:this={tiltContainer}
	style="--mouse-x: {mouseX}deg; --mouse-y: {mouseY}deg;"
>
	<div class="asymmetric-grid">
		<div class="hero-content-left">
			<h1 class="hero-title">
				{$_(name)} <span class="last-name">{$_(lastName)}</span>
			</h1>
			<div class="floating-element shape-1"></div>
		</div>

		<div class="hero-content-right">
			<h3 class="hero-description font-text text-accent-text">
				{$_(description)}
			</h3>
			<div class="cta-button">
				<Card nofade={true} enhanced3d={true} onClick={(e) => handleNavigation(e, '/about')}
					>{$_('ABOUT.cta')}</Card
				>
			</div>
			<div class="floating-element shape-2"></div>
		</div>
	</div>
</div>

<style>
	.hero-container {
		min-height: calc(100dvh - 151px);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		position: relative;
		overflow: hidden;
		animation: fadeIn 1.5s ease-in;
	}

	.asymmetric-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		position: relative;
		z-index: 2;
		transform-style: preserve-3d;
		transform: perspective(1000px) rotateX(calc(var(--mouse-y) * -0.1))
			rotateY(calc(var(--mouse-x) * 0.1));
		transition: transform 0.05s ease-out;
	}

	@media (max-width: 768px) {
		.hero-container {
			padding: 0rem;
		}

		.asymmetric-grid {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
			gap: 1.5rem;
			text-align: center;
			padding: 0rem;
			transform: none;
		}

		.hero-content-left,
		.hero-content-right {
			padding: 0px !important;
			justify-content: center;
			align-items: center;
			transform: none !important;
		}

		.cta-button {
			align-self: center;
			margin-top: 1rem;
		}

		@media (max-width: 600px) {
			.cta-button {
				width: 100%;
			}
		}

		.floating-element {
			display: none;
		}

		.hero-title {
			text-align: center;
			max-width: 100%;
			transform: none !important;
			margin: 0 auto 1rem auto;
			white-space: nowrap;
			font-size: 40px !important;
			line-height: 1.2;
		}

		.last-name {
			display: inline;
			transform: none !important;
		}

		.hero-description {
			text-align: center;
			font-size: 20px !important;
			line-height: 1.5;
			max-width: 90%;
			margin: 0 auto 0rem auto;
			transform: none !important;
		}
	}

	.hero-content-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem;
		position: relative;
		transform: translateZ(20px);
	}

	.hero-content-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem;
		position: relative;
		transform: translateZ(40px);
	}

	.hero-title {
		font-size: var(--fs-6xl);
		font-weight: var(--fw-bold);
		letter-spacing: var(--ls-tight);
		line-height: var(--lh-tight);
		opacity: 0;
		animation: flyIn 1s ease-out 0.5s forwards;
		margin-bottom: 1.5rem;
		transform: translateZ(30px);
		position: relative;
		z-index: 3;
	}

	.last-name {
		font-weight: var(--fw-light);
		font-style: italic;
		transform: translateZ(50px);
	}

	.hero-description {
		font-weight: var(--fw-light);
		line-height: var(--lh-relaxed);
		letter-spacing: var(--ls-wide);
		font-size: var(--fs-xl);
		opacity: 0;
		animation: flyIn 1s ease-out 1s forwards;
		margin-bottom: 2rem;
		position: relative;
		z-index: 3;
	}

	.cta-button {
		opacity: 0;
		animation: flyIn 1s ease-out 1.5s forwards;
		align-self: flex-start;
		position: relative;
		z-index: 3;
	}

	.floating-element {
		position: absolute;
		background-color: var(--accent);
		opacity: 0.1;
		border-radius: 10px;
		transform-style: preserve-3d;
		animation: floatAnimation 10s ease-in-out infinite alternate;
	}

	.shape-1 {
		width: 100px;
		height: 100px;
		bottom: 10%;
		right: 20%;
		transform: rotate(45deg) translateZ(10px);
		animation-delay: 0.5s;
		background: linear-gradient(135deg, var(--accent) 0%, transparent 70%);
	}

	.shape-2 {
		width: 120px;
		height: 120px;
		top: 10%;
		left: 10%;
		transform: rotate(-15deg) translateZ(-20px);
		border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
		background: linear-gradient(45deg, var(--accent) 0%, transparent 70%);
	}

	@keyframes flyIn {
		0% {
			transform: translateY(50px) translateZ(30px);
			opacity: 0;
		}
		100% {
			transform: translateY(0) translateZ(30px);
			opacity: 1;
		}
	}

	/* Mobile-specific animation */
	@media (max-width: 768px) {
		@keyframes flyIn {
			0% {
				transform: translateY(30px);
				opacity: 0;
			}
			100% {
				transform: translateY(0);
				opacity: 1;
			}
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes floatAnimation {
		0% {
			transform: translate(0, 0) rotate(45deg) translateZ(10px);
		}
		50% {
			transform: translate(10px, -10px) rotate(47deg) translateZ(15px);
		}
		100% {
			transform: translate(-5px, 5px) rotate(43deg) translateZ(10px);
		}
	}
</style>

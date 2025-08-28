<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import HeroLetters from '$lib/components/Page/HeroLetters.svelte';
	import { HOME, TITLE_SUFFIX } from '$lib/params';
       import { useTitle, debounce } from '$lib/utils/helpers';
       import { handleNavigation } from '$lib/utils/navigation';
	import { createContainerPerspective } from '$lib/utils/animation';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import SocialLinks from '$lib/components/Contact/SocialLinks.svelte';

	let { description, lastName, links, name, title } = HOME;

	let tiltContainer: HTMLElement | null = null;
	let mouseX = 0;
	let mouseY = 0;

	function calculateMousePosition(
		event: MouseEvent,
		container: HTMLElement
	): { x: number; y: number } {
		const rect = container.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		return {
			x: ((event.clientX - centerX) / (rect.width / 2)) * 5,
			y: ((event.clientY - centerY) / (rect.height / 2)) * 5
		};
	}

	const handleMouseMove = debounce((event: MouseEvent) => {
		if (!tiltContainer) return;
		const { x, y } = calculateMousePosition(event, tiltContainer);
		mouseX = x;
		mouseY = y;
	}, 8); // ~120fps

	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
	<meta name="description" content={$_(description)} />
</svelte:head>

<HeroLetters />
<div
	class="hero-container relative items-center overflow-hidden bg-transparent"
	bind:this={tiltContainer}
	style="--mouse-x: {mouseX}deg; --mouse-y: {mouseY}deg;"
	role="main"
	aria-labelledby="hero-title"
>
	<div class="asymmetric-grid">
		<div class="hero-content-left">
			<h1 id="hero-title" class="hero-title">
				{$_(name)} <span class="last-name">{$_(lastName)}</span>
			</h1>
			<div class="floating-element shape-1" aria-hidden="true"></div>
		</div>

		<div class="hero-content-right">
			<h3 class="hero-description font-text text-accent-text">
				{$_(description)}
			</h3>
			<div class="cta-button">
				<Card
					nofade={true}
					enhanced3d={true}
					onClick={(e) => handleNavigation(e, '/about')}
					ariaLabel={$_('ABOUT.cta')}
				>
					{$_('ABOUT.cta')}
				</Card>
			</div>
			<div class="floating-element shape-2" aria-hidden="true"></div>
		</div>
	</div>
</div>

<style>
	.hero-container {
		min-height: calc(100dvh - 151px);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		animation: fadeIn 1.5s ease-in;
		background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
	}

	.asymmetric-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-2xl);
		position: relative;
		z-index: 2;
		transform-style: preserve-3d;
		will-change: transform;
		transform: perspective(1000px) rotateX(calc(var(--mouse-y) * -0.1))
			rotateY(calc(var(--mouse-x) * 0.1));
		transition: transform 0.05s ease-out;
		backface-visibility: hidden;
		gap: var(--space-2xl);
	}

	.hero-content-left,
	.hero-content-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: var(--space-xl);
		position: relative;
		will-change: transform;
		backface-visibility: hidden;
	}

	.hero-content-left {
		transform: translateZ(20px);
	}

	.hero-content-right {
		transform: translateZ(40px);
	}

	.hero-title {
		font-size: var(--fs-6xl);
		font-weight: var(--fw-bold);
		letter-spacing: var(--ls-tight);
		line-height: var(--lh-tight);
		opacity: 0;
		animation: flyIn 1s ease-out 0.5s forwards;
		margin-bottom: var(--space-lg);
		will-change: transform, opacity;
		transform: translateZ(30px);
		position: relative;
		z-index: 3;
		backface-visibility: hidden;
		background: linear-gradient(135deg, var(--main-text) 0%, var(--accent-text) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.last-name {
		font-weight: var(--fw-light);
		font-style: italic;
		will-change: transform;
		transform: translateZ(50px);
		backface-visibility: hidden;
		background: linear-gradient(135deg, var(--accent-text) 0%, var(--secondary-text) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-description {
		font-weight: var(--fw-light);
		line-height: var(--lh-relaxed);
		letter-spacing: var(--ls-wide);
		font-size: var(--fs-xl);
		opacity: 0;
		animation: flyIn 1s ease-out 1s forwards;
		margin-bottom: var(--space-2xl);
		position: relative;
		z-index: 3;
		will-change: transform, opacity;
		backface-visibility: hidden;
		color: var(--secondary-text);
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
		border-radius: var(--radius-xl);
		transform-style: preserve-3d;
		animation: floatAnimation 10s ease-in-out infinite alternate;
		backface-visibility: hidden;
		filter: blur(1px);
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

	@media (max-width: 768px) {
		.hero-container {
			padding: 0;
		}

		.asymmetric-grid {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
			gap: 1.5rem;
			text-align: center;
			padding: 0;
			transform: none;
		}

		.hero-content-left,
		.hero-content-right {
			padding: 0;
			justify-content: center;
			align-items: center;
			transform: none;
		}

		.cta-button {
			align-self: center;
			margin-top: 1rem;
			width: 100%;
		}

		.floating-element {
			display: none;
		}

		.hero-title {
			text-align: center;
			max-width: 100%;
			transform: none;
			margin: 0 auto 1rem;
			white-space: nowrap;
			font-size: 40px;
			line-height: 1.2;
		}

		.last-name {
			display: inline;
			transform: none;
		}

		.hero-description {
			text-align: center;
			font-size: 20px;
			line-height: 1.5;
			max-width: 90%;
			margin: 0 auto;
			transform: none;
		}
	}

	@keyframes flyIn {
		0% {
			transform: translate3d(0, 50px, 30px);
			opacity: 0;
		}
		100% {
			transform: translate3d(0, 0, 30px);
			opacity: 1;
		}
	}

	/* Mobile-specific animation */
	@media (max-width: 768px) {
		@keyframes flyIn {
			0% {
				transform: translate3d(0, 30px, 0);
				opacity: 0;
			}
			100% {
				transform: translate3d(0, 0, 0);
				opacity: 1;
			}
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes floatAnimation {
		0% {
			transform: translate3d(0, 0, 10px) rotate(45deg);
		}
		50% {
			transform: translate3d(10px, -10px, 15px) rotate(47deg);
		}
		100% {
			transform: translate3d(-5px, 5px, 10px) rotate(43deg);
		}
	}
</style>

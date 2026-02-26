<script lang="ts">
	import HeroLetters from '$lib/components/Page/HeroLetters.svelte';
	import AboutSection from '$lib/components/Sections/AboutSection.svelte';
	import SkillsSection from '$lib/components/Sections/SkillsSection.svelte';
	import ProjectsSection from '$lib/components/Sections/ProjectsSection.svelte';
	import ExperienceSection from '$lib/components/Sections/ExperienceSection.svelte';
	import ResumeSection from '$lib/components/Sections/ResumeSection.svelte';
	import ContactSection from '$lib/components/Sections/ContactSection.svelte';
	import { HOME, TITLE_SUFFIX } from '$lib/params';
	import { useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';

	let { description, lastName, name, title } = HOME;
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
	<meta name="description" content={$_(description)} />
</svelte:head>

<!-- Hero -->
<HeroLetters />
<div
	class="hero-container relative items-center overflow-hidden bg-transparent"
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
			<a href="#about" class="cta-link">
				<span class="cta-btn">{$_('ABOUT.cta')}</span>
			</a>
			<div class="floating-element shape-2" aria-hidden="true"></div>
		</div>
	</div>
</div>

<!-- All Sections -->
<div class="spa-sections">
	<AboutSection />
	<SkillsSection />
	<ProjectsSection />
	<ExperienceSection />
	<ResumeSection />
	<ContactSection />
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
		background: radial-gradient(circle at 50% 50%, var(--accent-brand-muted) 0%, transparent 55%);
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
		transform-style: flat;
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
		backface-visibility: hidden;
	}

	.hero-content-left:hover,
	.hero-content-right:hover {
		will-change: transform;
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
		transform: translateZ(30px);
		position: relative;
		z-index: 3;
		backface-visibility: hidden;
		background: linear-gradient(135deg, var(--main-text) 0%, var(--accent-text) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		will-change: transform, opacity;
	}

	.last-name {
		font-weight: var(--fw-medium);
		font-style: italic;
		transform: translateZ(50px);
		backface-visibility: hidden;
		background: linear-gradient(135deg, var(--secondary-text) 0%, var(--tertiary-text) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		opacity: 0.95;
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
		backface-visibility: hidden;
		color: var(--secondary-text);
	}

	.cta-link {
		opacity: 0;
		animation: flyIn 1s ease-out 1.5s forwards;
		align-self: flex-start;
		position: relative;
		z-index: 3;
		text-decoration: none;
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		padding: 0.75rem 1.5rem;
		border: 1px solid var(--main-text-subtle);
		border-radius: 15px;
		color: var(--main-text);
		font-family: var(--text-f);
		font-size: var(--fs-base);
		font-weight: var(--fw-medium);
		letter-spacing: var(--ls-wide);
		transition: all 0.3s ease;
		background: transparent;
		cursor: pointer;
	}

	.cta-btn:hover {
		border-color: var(--border-hover);
		background: var(--hover);
		transform: translateY(-2px);
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

	/* SPA Sections container */
	.spa-sections {
		display: flex;
		flex-direction: column;
	}

	/* Global section styles */
	:global(.spa-section) {
		scroll-margin-top: 60px;
		padding: 4rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
	}

	:global(.spa-section:nth-child(even)) {
		background: var(--accent);
		max-width: 100%;
		padding-left: calc((100% - 1200px) / 2 + 1rem);
		padding-right: calc((100% - 1200px) / 2 + 1rem);
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

		.cta-link {
			align-self: center;
			margin-top: 1rem;
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

		:global(.spa-section) {
			padding: 3rem 1rem;
			scroll-margin-top: 50px;
		}

		:global(.spa-section:nth-child(even)) {
			padding-left: 1rem;
			padding-right: 1rem;
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

	@media (prefers-reduced-motion: reduce) {
		.hero-container {
			animation: none;
		}

		.asymmetric-grid {
			transform: none;
			transition: none;
		}

		.hero-title,
		.hero-description,
		.cta-link {
			animation: none;
			opacity: 1;
		}

		.floating-element {
			animation: none;
		}
	}
</style>

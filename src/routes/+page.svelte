<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import ContactLInks from '$lib/components/Contact/ContactLInks.svelte';
	import HeroLetters from '$lib/components/Page/HeroLetters.svelte';
	import { HOME, TITLE_SUFFIX } from '$lib/params';
	import { handleNavigation, useTitle } from '$lib/utils/helpers';
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';

	let { description, lastName, links, name, title } = HOME;

	let greeting = '';

	onMount(() => {
		document.title = useTitle(title, TITLE_SUFFIX);
	});

	$: {
		greeting = calculateGreeting({
			language: $locale?.includes('en') ? 'en' : $locale?.includes('ja') ? 'ja' : null
		});
	}

	const calculateGreeting = ({ language }: { language: string | null }) => {
		const hours = new Date().getHours();

		if (language === 'en') {
			return hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
		}

		if (language === 'ja') {
			return hours < 12 ? 'おはようございます' : hours < 18 ? 'こんにちは' : 'こんばんは';
		}

		return '';
	};
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<HeroLetters />
<div class="hero-container">
	<div class="hero-content">
		<h1 class="hero-title fadeIn">
			<span class="text-gradient">{greeting}</span>
		</h1>
		<h3 class="hero-description fadeIn">
			{$_(description)}
		</h3>
		<div class="hidden lg:block cta-button fadeIn">
			<Card nofade={true} onClick={(e) => handleNavigation(e, '/about')}>{$_('ABOUT.cta')}</Card>
		</div>
	</div>
</div>

<style>
	.hero-container {
		height: calc(100dvh - 151px);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		position: relative;
		overflow: hidden;
		animation: fadeIn 4s ease-in;
	}

	.hero-content {
		text-align: center;
		max-width: 800px;
		z-index: 2;
	}

	.hero-title {
		font-size: 3rem;
		font-weight: bold;
		margin-bottom: 1rem;
		color: var(--main-text);
	}

	.hero-description {
		font-size: 1.5rem;
		color: var(--accent-text);
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Media query for mobile devices */
	@media (max-width: 640px) {
		.hero-title {
			font-size: 2rem; /* Smaller size for mobile */
		}

		.hero-description {
			font-size: 1.2rem; /* Smaller size for mobile */
		}
	}

	.text-gradient {
		color: var(--accent-text-hover);
	}

	@keyframes shimmer {
		to {
			background-position: 200% 90%;
		}
	}

	@keyframes flyIn {
		0% {
			transform: translateY(50px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>

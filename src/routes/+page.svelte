<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut, cubicOut } from 'svelte/easing';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { HOME, TITLE_SUFFIX, getPlatfromIcon } from '$lib/params';
	import { useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { getAssetURL } from '$lib/data/assets';
	import HeroLetters from '$lib/components/Page/HeroLetters.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import { locale } from 'svelte-i18n';
	import { handleNavigation } from '$lib/utils/helpers';
	import { goto } from '$app/navigation';

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
		<div
			class="hidden lg:fixed bottom-0 left-0 lg:right-auto lg:left-0 flex justify-center gap-5 pb-15 px-15"
		>
			{#each links as { platform, link }, index}
				<div class="fadeIn">
					<ChipIcon name={platform} href={link} newtab>
						<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
					</ChipIcon>
				</div>
			{/each}
		</div>

		<div class="hidden lg:block cta-button fadeIn">
			<Card onClick={(e) => handleNavigation(e, '/about')}>{$_('ABOUT.title')}</Card>
		</div>
	</div>
</div>

<style>
	.hero-container {
		height: calc(100dvh - 50px);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		position: relative;
		overflow: hidden;
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
</style>

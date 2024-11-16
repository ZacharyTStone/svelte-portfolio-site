<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
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

	let { description, lastName, links, name, title } = HOME;

	let hours = new Date().getHours();

	onMount(() => {
		document.title = useTitle(title, TITLE_SUFFIX);
	});

	const calculateNameIntroduction = ({ language }: { language: string | null }) => {
		if (language === 'en') {
			return hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
		}

		if (language === 'ja') {
			return hours < 12 ? 'おはよう' : hours < 18 ? 'こんにちは' : 'こんばんは';
		}

		return '';
	};

	// Reactive statement to update the greeting when currentLocale changes
	$: greeting = calculateNameIntroduction({
		language: $locale?.includes('en') ? 'en' : $locale?.includes('ja') ? 'ja' : null
	});
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<HeroLetters />
<div class="hero-container">
	<div class="hero-content">
		<h1 class="hero-title" in:fly={{ y: -50, duration: 1000, easing: cubicOut }}>
			<span class="text-gradient">{greeting}</span>
		</h1>
		<h3 class="hero-description" in:fade={{ delay: 500, duration: 1000 }}>
			{$_(description)}
		</h3>
		<div
			class="hidden lg:fixed bottom-0 left-0 lg:right-auto lg:left-0 flex justify-center gap-5 pb-15 px-15"
		>
			{#each links as { platform, link }, index}
				<div in:fade={{ delay: 1000 + index * 100, duration: 600 }}>
					<ChipIcon name={platform} href={link} newtab>
						<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
					</ChipIcon>
				</div>
			{/each}
		</div>

		<div
			class="
			hidden lg:block
			cta-button"
			in:fly={{ y: 50, delay: 1500, duration: 500, easing: cubicOut }}
		>
			<Card href={base + '/about'}>{$_('ABOUT.title')}</Card>
		</div>
	</div>
</div>

<style>
	.hero-container {
		height: calc(100vh - 50px);
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
</style>

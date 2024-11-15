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

	onMount(() => {
		document.title = useTitle(title, TITLE_SUFFIX);
	});

	const calculateNameIntroduction = ({
		name,
		lastName,
		english
	}: {
		name: string;
		lastName: string;
		english: boolean;
	}) => {
		const now = new Date();
		const hours = now.getHours();

		if (english) {
			return hours < 12 ? 'Good Morning 👋' : hours < 18 ? 'Good Afternoon 👋' : 'Good Evening 👋';
		}

		return hours < 12 ? 'おはよう 👋' : hours < 18 ? 'こんにちは 👋' : 'こんばんは 👋';
	};

	// Reactive statement to update the greeting when currentLocale changes
	$: greeting = calculateNameIntroduction({
		name: $_(name),
		lastName: $_(lastName),
		english: $locale?.includes('en') ?? false
	});
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<HeroLetters />
<div class="hero-container">
	<div class="hero-content">
		<h1 class="hero-title" in:fly={{ y: -50, duration: 1000, easing: cubicOut }}>
			{greeting}
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
			<Card href={base + '/projects'}>View Projects</Card>
		</div>
	</div>
</div>

<style>
	.hero-container {
		min-height: 100vh;
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
</style>

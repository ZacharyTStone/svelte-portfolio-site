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

	let { description, lastName, links, name, title } = HOME;

	onMount(() => {
		document.title = useTitle(title, TITLE_SUFFIX);
	});
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<HeroLetters />
<div class="hero-container">
	<div class="hero-content">
		<h1 class="hero-title" in:fly={{ y: -50, duration: 1000, easing: cubicOut }}>
			<span class="text-color">
				{$_(name)}
				{$_(lastName)}
			</span>
		</h1>
		<p class="hero-description" in:fade={{ delay: 500, duration: 1000 }}>
			{$_(description)}
		</p>
		<div
			class="hidden lg:fixed bottom-0 left-0 lg:right-auto lg:left-0 flex justify-center gap-5 pb-15 px-15"
		>
			{#each links as { platform, link, index }}
				<div in:fade={{ delay: 1000 + index * 100, duration: 600 }}>
					<ChipIcon name={platform} href={link} newtab>
						<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
					</ChipIcon>
				</div>
			{/each}
		</div>

		<div class="cta-button" in:fly={{ y: 50, delay: 1500, duration: 500, easing: cubicOut }}>
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
		font-size: 4rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.text-color {
		color: var(--text);
	}

	.hero-description {
		font-size: 1.5rem;
		color: var(--text);
		margin-bottom: 2rem;
	}

	.social-icons {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.social-icon {
		background-color: var(--card-bg);
		border-radius: 50%;
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition:
			transform 0.3s ease,
			background-color 0.3s ease;
		animation: fadeInUp 0.5s ease forwards;
		opacity: 0;
	}

	.social-icon:hover {
		transform: translateY(-5px);
		background-color: var(--card-bg-hover);
	}

	.btn {
		display: inline-block;
		padding: 1rem 2rem;
		border-radius: 0.25rem;
		font-weight: 600;
		text-align: center;
		text-decoration: none;
		transition:
			background-color 0.3s ease,
			transform 0.3s ease;
	}

	.btn-primary {
		background-color: var(--accent);
		color: var(--text-inverse);
	}

	.btn-lg {
		font-size: 1.25rem;
	}

	.btn:hover {
		background-color: var(--accent-hover);
		transform: translateY(-2px);
	}

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

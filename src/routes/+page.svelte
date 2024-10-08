<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store'; // Importing writable store
	import { fade, fly } from 'svelte/transition'; // Importing fade and fly transitions
	import { cubicOut } from 'svelte/easing'; // Importing cubicOut easing
	import Carrousel from '$lib/components/Carrousel/Carrousel.svelte';
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import { HOME, TITLE_SUFFIX, getPlatfromIcon } from '$lib/params';
	import MY_SKILLS from '$lib/skills.params';
	import { useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { getAssetURL } from '$lib/data/assets';

	let { description, lastName, links, name, title, skills } = HOME;

	// Set page title
	onMount(() => {
		document.title = useTitle(title, TITLE_SUFFIX);
		const interval = setInterval(cycleSkills, 3000); // Cycle every 3 seconds
		return () => clearInterval(interval);
	});

	// Store to hold the index of the currently displayed skill
	const currentIndex = writable(0);
	let isHovering = writable(false);

	// Function to cycle through skills
	function cycleSkills() {
		if (!$isHovering) {
			currentIndex.update((value) => (value + 1) % MY_SKILLS.length);
		}
	}
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<div class="min-h-screen flex flex-col justify-center items-center p-4 md:p-8 fadeIn">
	<div class="max-w-4xl w-full space-y-8">
		<div class="text-center md:text-left space-y-4">
			<h1 class="text-4xl md:text-6xl font-bold tracking-tight">
				<span class="text-gray-400">
					{$_(name)}
					{$_(lastName)}
				</span>
			</h1>
			<p class="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
				{$_(description)}
			</p>
		</div>

		<div class="flex flex-wrap justify-center md:justify-start gap-4">
			{#each links as { platform, link }}
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					class="transform hover:scale-110 transition-transform duration-200"
				>
					<ChipIcon name={platform}>
						<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
					</ChipIcon>
				</a>
			{/each}
		</div>

		<div class="mt-12 relative h-64 md:h-96">
			{#if MY_SKILLS.length > 0}
				{#key $currentIndex}
					<div
						in:fly={{ y: 50, duration: 600, easing: cubicOut }}
						out:fade={{ duration: 200 }}
						class="absolute inset-0 flex items-center justify-center"
						on:mouseenter={() => isHovering.set(true)}
						on:mouseleave={() => isHovering.set(false)}
						role="button"
						tabindex="0"
						aria-label={MY_SKILLS[$currentIndex].name}
					>
						<a href={`${base}/skills/${MY_SKILLS[$currentIndex].slug}`} class="group no-underline">
							<img
								src={getAssetURL(MY_SKILLS[$currentIndex].logo)}
								alt={$_(MY_SKILLS[$currentIndex].name)}
								class="w-32 h-32 md:w-48 md:h-48 object-contain duration-600"
							/>
							<p class="mt-4 text-center text-gray-400 duration-600 text-lg md:text-xl">
								{$_(MY_SKILLS[$currentIndex].name)}
							</p>
						</a>
					</div>
				{/key}
			{/if}
		</div>
	</div>
</div>

<style>
	:global(body) {
		background-color: #1a202c;
		color: white;
	}
</style>

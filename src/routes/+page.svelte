<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store'; // Importing writable store
	import { fade } from 'svelte/transition'; // Importing fade transition
	import { quintInOut } from 'svelte/easing'; // Importing quintInOut easing
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
		const interval = setInterval(cycleSkills, 10000); // Cycle every 10 seconds
		return () => clearInterval(interval);
	});

	// Store to hold the index of the currently displayed skill
	const currentIndex = writable(0);

	// Function to cycle through skills
	function cycleSkills() {
		currentIndex.update((value) => (value + 1) % MY_SKILLS.length);
	}
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<div
	class="col self-center flex-1 md:flex-row md:self-stretch justify-center lg:justify-between items-center p-0 gap-10"
>
	<div class="md:flex-1 flex flex-col items-center md:items-start gap-5 fadeIn">
		<MainTitle classes="text-center md:text-left mb-5 md:mb-3">{$_(name)} {$_(lastName)},</MainTitle
		>
		<p
			class="text-[var(--tertiary-text)] text-center md:text-left text-lg md:text-xl font-extralight leading-relaxed max-w-prose mb-5 md:mb-3"
		>
			{$_(description)}
		</p>
		<div
			class="hidden md:fixed bottom-0 left-0 lg:right-auto lg:left-0 flex justify-center gap-5 pb-15 px-15"
		>
			{#each links as { platform, link }}
				<ChipIcon name={platform} href={link} newtab>
					<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
				</ChipIcon>
			{/each}
		</div>
	</div>
	<div class="fixed bottom--10 right--20 z-10 fade-in">
		{#if MY_SKILLS.length > 0}
			{#key currentIndex}
				<a href={`${base}/skills/${MY_SKILLS[$currentIndex].slug}`} rel="noreferrer">
					<img
						src={getAssetURL(MY_SKILLS[$currentIndex].logo)}
						alt="Skill Logo"
						class="opacity-20 w-100 h-100 aspect-square md:w-200 md:h-200 skill-logo"
						style="object-fit: contain;"
						transition:fade={{ duration: 5000, delay: 0, easing: quintInOut }}
					/>
				</a>
			{/key}
		{/if}
	</div>
</div>

<style>
	.skill-logo {
		opacity: 0.2; /* Start with 0.2 opacity */
	}
</style>

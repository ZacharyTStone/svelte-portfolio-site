<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	// Importing writable store
	// Importing fade transition
	// Importing quintInOut easing
	import zach_large_3 from '$lib/assets/images/zach_large_3.png';
	import Carrousel from '$lib/components/Carrousel/Carrousel.svelte';
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import { HOME, TITLE_SUFFIX, getPlatfromIcon } from '$lib/params';
	import MY_SKILLS from '$lib/skills.params';
	import { useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';

	let { description, lastName, links, name, title, skills } = HOME;

	// Set page title
	onMount(() => {
		document.title = useTitle(title, TITLE_SUFFIX);
		const interval = setInterval(cycleSkills, 5000); // Cycle every 5 seconds
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
	class="col self-center flex-1 lg:flex-row lg:self-stretch justify-center lg:justify-between items-center p-0 gap-10"
>
	<div class="lg:flex-1 flex flex-col items-center lg:items-start gap-5 fadeIn">
		<MainTitle classes="text-center lg:text-left mb-5 lg:mb-3">{$_(name)} {$_(lastName)},</MainTitle
		>
		<p
			class="text-[var(--tertiary-text)] text-center lg:text-left text-lg lg:text-xl font-extralight leading-relaxed max-w-prose mb-5 lg:mb-3 z-10 

			bg-opacity-50			
			description-background"
		>
			{$_(description)}
		</p>
		<div
			class="hidden lg:fixed bottom-0 left-0 lg:right-auto lg:left-0 flex justify-center gap-5 pb-15 px-15"
		>
			{#each links as { platform, link }}
				<ChipIcon name={platform} href={link} newtab>
					<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
				</ChipIcon>
			{/each}
		</div>
	</div>
	<div class="fadeIn block lg:hidden">
		<Carrousel items={skills ?? MY_SKILLS} />
	</div>
	<div class="fixed bottom--0 right--0 fade-in hidden lg:block">
		<img
			src={zach_large_3}
			alt="Zach Large"
			class="w-200 h-200 aspect-square"
			style="object-fit: contain;"
		/>
	</div>
</div>

<style>
	:global(body) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.description-background {
		background-color: var(--main);
		opacity: 0.8;
		backdrop-filter: blur(10px);
		border-radius: 10px;
	}
</style>

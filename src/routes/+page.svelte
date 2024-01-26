<script lang="ts">
	import { onMount } from 'svelte';
	import Carrousel from '$lib/components/Carrousel/Carrousel.svelte';
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import { HOME, TITLE_SUFFIX, getPlatfromIcon } from '$lib/params';
	import MY_SKILLS from '$lib/skills.params';
	import { useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';

	let { description, lastName, links, name, title, skills } = HOME;

	// Function to handle link clicks
	function handleClick(link: string) {
		window.open(link, '_blank');
	}

	// Set page title
	onMount(() => {
		document.title = useTitle(title, TITLE_SUFFIX);
	});
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<div
	class="col self-center flex-1 md:flex-row md:slef-stretch justify-center lg:justify-between items-center p-y-0px p-x-10px gap-10px"
>
	<div class="md:flex-1 gap-10px fadeIn">
		<MainTitle classes="md:text-left mb-10 md:mb-5">{$_(name)} {$_(lastName)},</MainTitle>
		<p
			class="text-[var(--tertiary-text)] text-center md:text-left text-[1em] md:text-[1.2em] font-extralight leading-relaxed md:w-[80%] mb-10 md:mb-5"
		>
			{$_(description)}
		</p>
		<div class="row justify-center md:justify-start p-y-15px p-x-0px gap-3">
			{#each links as { platform, link }}
				<ChipIcon name={platform} on:click={() => handleClick(link)}>
					<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'12px'} />
				</ChipIcon>
			{/each}
		</div>
	</div>
	<div class="fadeIn">
		<Carrousel items={skills ?? MY_SKILLS} />
	</div>
</div>

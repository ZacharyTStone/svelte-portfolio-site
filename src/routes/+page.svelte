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

	// Set page title
	onMount(() => {
		document.title = useTitle(title, TITLE_SUFFIX);
	});
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
		<div class="flex flex-wrap justify-center md:justify-start gap-3">
			{#each links as { platform, link }}
				<ChipIcon name={platform} href={link} newtab>
					<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'12px'} />
				</ChipIcon>
			{/each}
		</div>
	</div>
	<div class="fadeIn">
		<Carrousel items={skills ?? MY_SKILLS} />
	</div>
</div>

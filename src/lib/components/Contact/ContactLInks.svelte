<script lang="ts">
	import { getPlatfromIcon, HOME } from '$lib/params';
	import { _ } from 'svelte-i18n';
	import ChipIcon from '../Chip/ChipIcon.svelte';
	import UIcon from '../Icon/UIcon.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	const { links } = HOME;
	import { page } from '$app/stores';
	import { readable } from 'svelte/store';

	interface Props {
		showOnMobile?: boolean;
		showText?: boolean;
	}

	let { showOnMobile = true, showText = true }: Props = $props();

	let onHome = $state($page.url.pathname === '/');

	$effect(() => {
		onHome = $page.url.pathname === '/';
	});
</script>

<div
	class="fadeInSlow flex justify-center gap-5 pb-15 px-15 2xl:fixed bottom-0 left-0 2xl:right-auto 2xl:left-0 {showOnMobile
		? ''
		: 'hidden sm:flex'}"
>
	{#each links as { platform, link }, index}
		<div class="fadeIn">
			<ChipIcon name={platform} href={link} newtab>
				<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
			</ChipIcon>
		</div>
	{/each}
	{#if onHome}
		<div class="fadeIn">
			<div class="flex flex-row items-center gap-2 cursor-pointer h-100%">
				<UIcon icon="i-carbon-arrow-left" />
				<span class="text-gradient">{$_('HOME.connect_cta')}</span>
			</div>
		</div>
	{/if}
</div>

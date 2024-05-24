<script lang="ts">
	import { base } from '$app/paths';
	import CardLogo from '$lib/components/Card/CardLogo.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import { getAssetURL } from '$lib/data/assets';
	import { EXPERIENCES } from '$lib/params';
	import type { Experience } from '$lib/types';

	import Banner from '$lib/components/Banner/Banner.svelte';
	import CardDivider from '$lib/components/Card/CardDivider.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import Screenshots from '$lib/components/Screenshots.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import { _ } from 'svelte-i18n';
	import { marked } from 'marked';
	import { locale } from 'svelte-i18n';

	export let data: { experience?: Experience };

	const { title } = EXPERIENCES;

	$: computedTitle = data.experience ? `${$_(data.experience.name)} - ${$_(title)}` : $_(title);

	const screenshots = data.experience?.screenshots ?? [];
</script>

<TabTitle title={computedTitle} />

{#if data.experience === undefined}
	<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)]">
		<UIcon icon="i-carbon-cube" classes="text-3.5em" />
		<p class="font-300">Could not load experience data...</p>
	</div>
{:else}
	<div class="flex flex-col items-center overflow-x-hidden p-5 md:p-0">
		<Banner img={getAssetURL(data.experience.logo)}>
			<div class="col-center p-y-20">
				<div class="text-0.9em">
					<MainTitle>{$_(data.experience.name)}</MainTitle>
				</div>
				<p class="font-300 text-[var(--tertiary-text)] m-y-2 text-center">
					{$_(data.experience.company)} · {$_(data.experience.location)} · {$_(
						data.experience.type
					)}
				</p>
				<div class="w-75%">
					<CardDivider />
				</div>
				<div class="row-center flex-wrap text-[0.9em] text-[var(--tertiary-text)] m-b-2">
					{#each data.experience.links as item}
						<Chip href={item.to}>
							<div class="row-center gap-2">
								<UIcon icon="i-carbon-link" />
								<span>{item.label}</span>
							</div>
						</Chip>
					{/each}
				</div>
			</div>
		</Banner>
		{#if data?.experience?.quote?.text}
			<div class="p-5 md:p-0 pt-3 pb-1 overflow-x-hidden w-full">
				<div class="px-10px m-y-5">
					<div class="flex flex-row gap-1 self-stretch flex-wrap">
						<div class="flex flex-col">
							<p class="font-300 italic text-[var(--tertiary-text)] m-y-2 text-center">
								{$_(data.experience.quote.text)} -
								<a
									href={data.experience.quote.link.to}
									target={data.experience.quote.link.newTab ? '_blank' : '_self'}
									class="text-[var(--accent-text)]"
									referrerpolicy="no-referrer">{$_(data.experience.quote.link.label)}</a
								>
							</p>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<div class="p-5 md:p-0 pt-3 pb-1 overflow-x-hidden w-full">
			<div class="px-10px m-y-5">
				{#if data.experience.description}
					{#if data.experience.description_is_markdown}
						// manually check for language and use marked() function on japanese or english
						{#if $locale === 'ja'}
							{@html marked(data?.experience?.markdown_description?.ja_markdown ?? '')}
						{:else if $locale === 'en'}
							{@html marked(data?.experience?.markdown_description?.en_markdown ?? '')}
						{:else}
							{$_(data.experience.description)}
						{/if}
					{:else}
						{$_(data.experience.description)}
					{/if}
				{:else}
					<div class="p-5 col-center gap-3 m-y-auto text-[var(--border)]">
						<UIcon icon="i-carbon-text-font" classes="text-3.5em" />
						<p class="font-300">No description</p>
					</div>
				{/if}
			</div>
			<div class="pt-3 pb-1 overflow-x-hidden w-full">
				<div class="px-10px m-y-5">
					<div class="flex flex-row gap-1 self-stretch flex-wrap">
						<h4 class="mr-6">
							{$_('EXTRA_INFO_LABELS.skills')}
						</h4>
						{#each data.experience.skills as item}
							<Chip
								classes="inline-flex flex-row items-center justify-center"
								href={`${base}/skills/${item.slug}`}
								newTab={false}
							>
								<CardLogo
									src={getAssetURL(item.logo)}
									alt={$_(item.name)}
									radius={'0px'}
									size={15}
									classes="mr-2"
								/>
								<span class="text-[0.9em]">{$_(item.name)}</span>
							</Chip>
						{/each}
					</div>
				</div>
			</div>
			{#if screenshots.length > 0}
				<Screenshots {screenshots} />
			{/if}
		</div>
	</div>
{/if}

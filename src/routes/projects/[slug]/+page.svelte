<script lang="ts">
	import CardLogo from '$lib/components/Card/CardLogo.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';

	import { base } from '$app/paths';
	// @ts-ignore
	import { type Project } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';
	import { PROJECTS } from '$lib/params';

	import TabTitle from '$lib/components/TabTitle.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import Banner from '$lib/components/Banner/Banner.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import CardDivider from '$lib/components/Card/CardDivider.svelte';
	import { Icons } from '$lib/utils/index';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import SvelteMarkdown from 'svelte-markdown';

	// @ts-ignore
	import { tooltip } from '@svelte-plugins/tooltips';

	export let data: { project?: Project };

	const { title } = PROJECTS;

	const screenshots = data.project?.screenshots ?? [];

	const description = data.project?.description ?? '';

	$: computedTitle = data.project ? `${$_(data.project.name ?? '')} - ${$_(title)}` : $_(title);
</script>

<TabTitle title={computedTitle} />

<div class="pb-10 overflow-x-hidden col flex-1">
	{#if data.project === undefined}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)]">
			<UIcon icon="i-carbon-cube" classes="text-3.5em" />
			<p class="font-300">Could not load project data...</p>
		</div>
	{:else}
		<div class="flex flex-col items-center overflow-x-hidden">
			<Banner img={getAssetURL(data.project.logo)}>
				<div class="col-center p-y-20">
					<div class="text-0.9em">
						<MainTitle>{$_(data.project.name)}</MainTitle>
					</div>
					<p class="font-300 text-center text-[var(--tertiary-text)] m-y-2">
						{$_(data.project.type)}
					</p>
					<div class="w-75%">
						<CardDivider />
					</div>
					<div class="row-center flex-wrap text-[0.9em] text-[var(--tertiary-text)] m-b-2 gap-5">
						{#each data.project.links as item}
							<Chip href={item.to}>
								<div class="row-center gap-2">
									<u title={$_(item.label)} use:tooltip>
										{#if item.label === 'PROJECTS.live_site'}
											<Icon icon={Icons.Projects} color={'var(--accent-text)'} size={'20px'} />
										{:else if item.label === 'YouTube'}
											<Icon icon={Icons.Youtube} color={'var(--accent-text)'} size={'20px'} />
										{:else}
											<Icon icon={Icons.GitHub} color={'var(--accent-text)'} size={'20px'} />
										{/if}
									</u>
								</div>
							</Chip>
						{/each}
					</div>
				</div>
			</Banner>
			<div
				class=" 
					p-5 md:p-0 
					pt-3 pb-1 overflow-x-hidden w-full"
			>
				<div class="px-10px m-y-5">
					{#if data.project.description}
						{#if data.project.description_is_markdown}
							<SvelteMarkdown source={description} />
						{:else}
							{$_(description)}
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
							{#each data.project.skills as item}
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
				<div class="pt-3 pb-1 overflow-x-hidden w-full">
					<div class="px-10px m-y-5">
						{#if data.project.project_skills && data.project.project_skills.length > 0}
							<div class="flex flex-row gap-1 self-stretch flex-wrap">
								<h4 class="mr-6">
									{$_('EXTRA_INFO_LABELS.project_tech')}
								</h4>
								{#each data.project.project_skills as item}
									<Chip
										classes="inline-flex flex-row items-center justify-center"
										href={item.to}
										newTab={false}
									>
										<span class="text-[0.9em]"> {$_(item.label)}</span>
									</Chip>
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<div class="w-100% m-t-8">
					<CardDivider />
				</div>
				{#if screenshots.length > 0}
					<div
						class="px-10px grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-t-10"
					>
						{#each screenshots as item}
							<div class="col-center gap-3 overflow-hidden w-100% h-100% rounded-10px">
								<img class="aspect-video w-100%" src={item.src} alt={item.label} />
								<p class="text-[var(--tertiary-text)] font-300">{item.label}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<script lang="ts">
	import CardDivider from '$lib/components/Card/CardDivider.svelte';
	import CardLogo from '$lib/components/Card/CardLogo.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import MY_EXPERIENCES from '$lib/experiences.params';
	import MY_PROJECTS from '$lib/projects.params';

	import { base } from '$app/paths';
	import type { Skill } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';
	import { SKILLS } from '$lib/params';

	import TabTitle from '$lib/components/Page/TabTitle.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import Banner from '$lib/components/Banner/Banner.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import { _ } from 'svelte-i18n';
	import Image from '$lib/components/Image/Image.svelte';
	import Screenshots from '$lib/components/Screenshots/Screenshots.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	type Related = {
		display: string;
		name: string;
		img: string;
		type: 'projects' | 'experience';
		url: string;
	};

	interface Props {
		data: { skill?: Skill };
	}

	let { data }: Props = $props();

	const { title } = SKILLS;

	const screenshots = data.skill?.screenshots ?? [];

	const getRelatedProjects = (): Array<Related> => {
		const out: Array<Related> = [];

		const skill = data.skill;

		if (!skill) {
			return [];
		}

		MY_PROJECTS.forEach((item) => {
			if (item.skills.some((tech) => tech.slug === skill.slug)) {
				out.push({
					img: getAssetURL(item.logo),
					display: item.name,
					name: item.name,
					type: 'projects',
					url: `/projects/${item.slug}`
				});
			}
		});
		MY_EXPERIENCES.forEach((item) => {
			if (item.skills.some((tech) => tech.slug === skill.slug)) {
				out.push({
					img: getAssetURL(item.logo),
					display: item.name,
					name: item.name,
					type: 'experience',
					url: `/experience/${item.slug}`
				});
			}
		});

		return out;
	};

	let computedTitle = $derived(
		data.skill ? `${$_(data.skill.name)} - ${$_(title)}` : `${$_(title)}`
	);

	let related = $derived(data.skill ? getRelatedProjects() : []);

	let mounted = $state(false);
	let fadeInDelay = 0;

	onMount(() => {
		mounted = true;
		fadeInDelay = 0; // Reset fadeInDelay when component mounts
	});

	function getAnimationDelay() {
		const delay = fadeInDelay;
		fadeInDelay += 200; // Increase delay for each subsequent item
		return delay;
	}
</script>

<TabTitle title={computedTitle} />

<div class="pb-10 overflow-x-hidden col flex-1">
	{#if data.skill === undefined}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)]">
			<UIcon icon="i-carbon-software-resource-cluster" classes="text-3.5em" />
			<p class="font-300">Could not load skill data.</p>
		</div>
	{:else}
		<div class="flex flex-col items-center overflow-x-hidden">
			<Banner img={getAssetURL(data.skill.logo)}>
				<MainTitle>{$_(data.skill.name)}</MainTitle>
			</Banner>
			<div class="p-5 md:p-0 flex flex-col items-center overflow-x-hidden">
				{#if mounted}
					<div
						in:fade={{ delay: getAnimationDelay(), duration: 300 }}
						class="pt-3 pb-1 overflow-x-hidden w-full"
					>
						<div class="px-10px m-y-5">
							{#if data.skill.description}
								{$_(data.skill.description)}
							{:else}
								<div class="p-5 col-center gap-3 m-y-auto text-[var(--border)]">
									<UIcon icon="i-carbon-text-font" classes="text-3.5em" />
									<p class="font-300">No description</p>
								</div>
							{/if}
						</div>
						<div class="px-10px m-y-5">
							{#if data?.skill?.extraInfo?.length}
								{#each data.skill.extraInfo as any}
									<div class="flex flex-row gap-1 flex-wrap mb-5 items-center">
										<span class="text-[var(--accent-text)] text-[1.1em] font-500">
											{$_(any.title)}
										</span>
										<div class="px-10px flex flex-row gap-3 flex-wrap align-center">
											{#each any.content as info}
												{#if any.title === 'Frameworks'}
													<ChipIcon
														logo={getAssetURL(info.icon)}
														name={info.label}
														href={info.link}
													/>
												{:else}
													<a class="font-300" href={info.link}>
														<span class="text-[var(--accent-text)]">{info.label},{' '}</span>
													</a>
												{/if}
											{/each}
										</div>
									</div>
								{/each}
							{/if}
							{#if data?.skill?.certifications?.length}
								<div class="flex flex-row gap-1 self-s flex-wrap mb-5 items-center">
									<span class="text-[var(--accent-text)] text-[1.1em] font-500">
										{$_('EXTRA_INFO_LABELS.certifications')}
									</span>
									<div class="px-10px flex flex-row gap-3 flex-wrap align-center">
										<ul class="list-disc list-inside">
											{#each data.skill.certifications as info}
												<div class="font-300">
													<li class="text-[var(--accent-text)]">
														{@html info.link
															? `<a href="${info.link}" class="text-blue-500 hover:underline" target="_blank">${info.label}</a>`
															: info.label}
													</li>
												</div>
											{/each}
										</ul>
									</div>
								</div>
							{/if}
							{#if data?.skill?.courses?.length}
								<div class="flex flex-row gap-1 flex-wrap mb-5 items-center">
									<span class="text-[var(--accent-text)] text-[1.1em] font-500">
										{$_('EXTRA_INFO_LABELS.courses')}
									</span>
									<div class="px-10px flex flex-row gap-3 flex-wrap align-center">
										<ul class="list-disc list-inside">
											{#each data.skill.courses as info}
												<div class="font-300">
													<li class="text-[var(--accent-text)]">
														{@html info.link
															? `<a href="${info.link}" class="text-blue-500 hover:underline" target="_blank">${info.label}</a>`
															: info.label}
													</li>
												</div>
											{/each}
										</ul>
									</div>
								</div>
							{/if}
						</div>
					</div>

					<div class="mb-2">
						<CardDivider />
					</div>

					<div
						in:fade={{ delay: getAnimationDelay(), duration: 300 }}
						class="flex flex-wrap gap-2 px-10px w-full"
					>
						{#each related as item}
							<div>
								<Chip classes="inline-flex items-center" href={`${base}${item.url}`} newTab={false}>
									<CardLogo
										src={item.img}
										alt={$_(item.name)}
										radius={'0px'}
										size={15}
										classes="mr-2"
									/>
									<span class="text-[0.9em]">{$_(item.display)}</span>
								</Chip>
							</div>
						{/each}
					</div>

					{#if screenshots.length > 0}
						<div in:fade={{ delay: getAnimationDelay(), duration: 300 }}>
							<Screenshots {screenshots} />
						</div>
					{/if}
				{/if}
			</div>
		</div>
	{/if}
</div>

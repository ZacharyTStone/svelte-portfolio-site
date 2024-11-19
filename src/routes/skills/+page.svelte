<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { getAssetURL } from '$lib/data/assets';
	import { SKILLS } from '$lib/params';
	import type { Skill } from '$lib/types';
	import { handleNavigation } from '$lib/utils/helpers';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	const { items } = SKILLS;

	import { _ } from 'svelte-i18n';

	let result: Array<Skill> = items;
	let mounted = $state(false);
	const visibleItems = writable(new Set());
	const staggerDelay = 100; // milliseconds between each skill's fade-in

	onMount(() => {
		mounted = true;

		// Fade in skills gradually
		let index = 0;
		const interval = setInterval(() => {
			if (index < result.length) {
				visibleItems.update((set) => {
					set.add(index);
					return set;
				});
				index++;
			} else {
				clearInterval(interval);
			}
		}, staggerDelay);
	});
</script>

<CommonPage title={$_(SKILLS.title)}>
	{#if result.length === 0}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
			<UIcon icon="i-carbon-cube" classes="text-3.5em" />
			<p class="font-300">Could not find anything...</p>
		</div>
	{:else if mounted}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-10">
			{#each result as skill, index (skill.slug)}
				{#if $visibleItems.has(index)}
					<div in:fade={{ duration: 300 }} style="display: contents;">
						<Card
							classes={[
								'cursor-pointer decoration-none rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg'
							]}
							tiltDegree={1}
							onClick={(e) => handleNavigation(e, `/skills/${skill.slug}`)}
							bgImg={getAssetURL(skill.logo)}
						>
							<p class="text-[var(--tertiary-text)] w-max">
								{$_(skill.name)}
							</p>
						</Card>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</CommonPage>

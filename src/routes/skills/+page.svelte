<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import { base } from '$app/paths';
	import { SKILLS } from '$lib/params';
	import type { Skill } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';

	const { items } = SKILLS;

	import { _ } from 'svelte-i18n';

	let result: Array<Skill> = items;
</script>

<CommonPage title={SKILLS.title}>
	{#if result.length === 0}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
			<UIcon icon="i-carbon-cube" classes="text-3.5em" />
			<p class="font-300">Could not find anything...</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 mt-10">
			{#each result as skill (skill.slug)}
				<Card
					classes={['cursor-pointer decoration-none']}
					tiltDegree={1}
					href={`${base}/skills/${skill.slug}`}
					bgImg={getAssetURL(skill.logo)}
				>
					<p class="text-[var(--tertiary-text)] w-max">
						{$_(skill.name)}
					</p>
				</Card>
			{/each}
		</div>
	{/if}
</CommonPage>

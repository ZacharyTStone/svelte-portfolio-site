<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { getAssetURL } from '$lib/data/assets';
	import { SKILLS } from '$lib/params';
	import type { Skill } from '$lib/types';
	import { handleNavigation } from '$lib/utils/helpers';

	const { items } = SKILLS;

	import { _ } from 'svelte-i18n';

	let result: Array<Skill> = items;
</script>

<CommonPage title={$_(SKILLS.title)}>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-10">
		{#each result as skill, index (skill.slug)}
			<Card
				classes={'decoration-none rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg'}
				style="cursor: pointer;"
				tiltDegree={1}
				onClick={(e) => handleNavigation(e, `/skills/${skill.slug}`)}
				bgImg={getAssetURL(skill.logo)}
			>
				<p class="text-[var(--tertiary-text)] w-max google-font skill-card-text">
					{$_(skill.name)}
				</p>
			</Card>
		{/each}
	</div>
</CommonPage>

<style>
	/* Apply the Google font specifically to skill cards */
	.skill-card-text {
		font-family: var(--title-f);
		font-weight: var(--fw-bold);
	}
</style>

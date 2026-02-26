<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import SectionTitle from './SectionTitle.svelte';
	import { getAssetURL } from '$lib/data/assets';
	import { SKILLS } from '$lib/params';
	import type { Skill } from '$lib/types';
	import { handleNavigation } from '$lib/utils/navigation';
	import { _ } from 'svelte-i18n';

	const { items } = SKILLS;
	let result: Array<Skill> = items || [];
</script>

<section id="skills" class="spa-section">
	<SectionTitle>{$_('SKILLS.title')}</SectionTitle>
	<div class="skills-grid">
		{#each result as skill (skill.slug)}
			<Card
				classes={'decoration-none rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg'}
				style="cursor: pointer;"
				tiltDegree={1}
				onClick={(e) => handleNavigation(e, `/skills/${skill.slug}`)}
				bgImg={getAssetURL(skill.logo)}
			>
				<p class="text-[var(--tertiary-text)] w-max skill-card-text">
					{$_(skill.name)}
				</p>
			</Card>
		{/each}
	</div>
</section>

<style>
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		max-width: 900px;
		margin: 1.5rem auto 0;
	}

	@media (max-width: 768px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}
	}

	.skill-card-text {
		font-family: var(--title-f);
		font-weight: var(--fw-bold);
	}
</style>

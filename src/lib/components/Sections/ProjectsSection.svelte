<script lang="ts">
	import Chip from '$lib/components/Chip/Chip.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
	import SectionTitle from './SectionTitle.svelte';
	import { PROJECTS } from '$lib/params';
	import MY_SKILLS from '$lib/skills.params';
	import type { Project, Skill } from '$lib/types';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';

	interface SkillFilter extends Skill {
		isSelected?: boolean;
	}

	const { items, title } = PROJECTS;

	let filters: Array<SkillFilter> = $state(
		MY_SKILLS.filter((it) =>
			items.some((project) => project.skills.some((skill) => skill.slug === it.slug))
		)
	);

	let search = $state('');
	let isInitialized = $state(false);

	let displayed = $derived.by(() => {
		const selectedFilters = filters.filter((tech) => tech.isSelected);
		const trimmedSearch = search.trim().toLowerCase();

		const filtered = items.filter((project) => {
			const isFiltered =
				selectedFilters.length === 0 ||
				selectedFilters.every((tech) => project.skills.some((skill) => skill.slug === tech.slug));
			const isSearched =
				trimmedSearch.length === 0 || $_(project.name).trim().toLowerCase().includes(trimmedSearch);

			return isFiltered && isSearched && !project.dont_show;
		});

		return [...filtered.filter((p) => p.featured), ...filtered.filter((p) => !p.featured)];
	});

	const isSelected = (slug: string): boolean =>
		filters.some((item) => item.slug === slug && item.isSelected);

	const onSelected = (slug: string) => {
		filters = filters.map((tech) => {
			if (tech.slug === slug) {
				tech.isSelected = !isSelected(slug);
			}
			return tech;
		});
	};

	onMount(() => {
		isInitialized = true;
	});
</script>

<section id="projects" class="spa-section">
	<SectionTitle>{$_(title)}</SectionTitle>
	<div class="projects-content">
		<div class="projects-filters">
			<div class="filter-chips">
				<Chip
					classes={'text-0.9em md:text-0.8em'}
					onClick={() => (filters = filters.map((tech) => ({ ...tech, isSelected: false })))}
					active={filters.every((tech) => !tech.isSelected)}
				>
					{$_(PROJECTS.no_filter_option ?? 'N/A')}
				</Chip>
				{#each filters as tech}
					<Chip
						active={tech.isSelected}
						classes={'text-0.9em md:text-0.8em min-w-max-content'}
						onClick={() => onSelected(tech.slug)}
					>
						{$_(tech.name)}
					</Chip>
				{/each}
			</div>
		</div>
		{#if displayed.length === 0}
			<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
				<UIcon icon="i-carbon-cube" classes="text-3.5em" />
				<p class="font-300">Could not find anything...</p>
			</div>
		{:else if isInitialized}
			<div class="projects-grid">
				{#each displayed as project (project.slug)}
					<div in:fade={{ duration: 300 }}>
						<ProjectCard {project} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.projects-content {
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	.projects-filters {
		margin: 1.5rem 0;
	}

	.filter-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		width: 100%;
		min-height: 282px;

		@media (max-width: 1100px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (max-width: 680px) {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>

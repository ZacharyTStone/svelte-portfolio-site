<script lang="ts">
	import Chip from '$lib/components/Chip/Chip.svelte';
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import { PROJECTS } from '$lib/params';
	import type { Project, Skill } from '$lib/types';
	import { onMount } from 'svelte';
	import MY_SKILLS from '$lib/skills.params';
	import UIcon from '$lib/components/Icon/UIcon.svelte';

	interface SkillFilter extends Skill {
		isSelected?: boolean;
	}

	const { items, title } = PROJECTS;

	let filters: Array<SkillFilter> = MY_SKILLS.filter((it) =>
		items.some((project) => project.skills.some((skill) => skill.slug === it.slug))
	);

	let search = '';
	let displayed: Array<Project> = [];

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

	$: {
		const selectedFilters = filters.filter((tech) => tech.isSelected);
		displayed = items.filter((project) => {
			const isFiltered =
				selectedFilters.length === 0 ||
				selectedFilters.every(
					(tech) => tech.isSelected && project.skills.some((skill) => skill.slug === tech.slug)
				);
			const isSearched =
				search.trim().length === 0 ||
				project.name.trim().toLowerCase().includes(search.trim().toLowerCase());
			return isFiltered && isSearched;
		});
	}

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		search = e.detail.search;
	};

	onMount(() => {
		const query = location.search;
		if (query) {
			const queryParams = new URLSearchParams(location.search);
			const item = queryParams.get('item');
			if (item) {
				search = item;
			}
		}
	});
</script>

<SearchPage {title} on:search={onSearch}>
	<div class="projects-filters">
		<div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 overflow-y-auto">
			<Chip
				classes={'text-0.6em md:text-0.8em'}
				on:click={() => {
					// clear all
					filters = filters.map((tech) => {
						tech.isSelected = false;
						return tech;
					});
				}}
				active={filters.every((tech) => !tech.isSelected)}
			>
				No Filters
			</Chip>
			{#each filters as tech}
				<Chip
					active={tech.isSelected}
					classes={'text-0.6em md:text-0.8em'}
					on:click={() => onSelected(tech.slug)}
				>
					{tech.name}
				</Chip>
			{/each}
		</div>
	</div>
	{#if displayed.length === 0}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
			<UIcon icon="i-carbon-cube" classes="text-3.5em" />
			<p class="font-300">Could not find anything...</p>
		</div>
	{:else}
		<h4 class="text-[var(--accent-text)] text-1.5em font-300 m-y-12 mx-auto">Featured Projects</h4>
		<div class="projects-list mt-5 mx-auto">
			{#each displayed as project}
				{#if project.featured}
					<ProjectCard {project} />
				{/if}
			{/each}
		</div>
		<h4 class="text-[var(--accent-text)] text-1.5em font-300 m-y-12 mx-auto">Other Projects</h4>
		<div class="projects-list mt-5 mx-auto">
			{#each displayed as project}
				{#if !project.featured}
					<ProjectCard {project} />
				{/if}
			{/each}
		</div>
	{/if}
</SearchPage>

<style lang="scss">
	.projects-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;

		@media (max-width: 1350px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (max-width: 850px) {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	.vertical-hr-container {
		display: flex; /* Use flexbox to lay out children */
		align-items: center; /* Center children vertically */
		height: 50px; /* Set a fixed height for the container */
	}

	// hide the hr on mobile
	@media (max-width: 850px) {
		.vertical-hr-container {
			display: none;
		}
	}

	.vertical-hr {
		border-left: 0.2px solid var(--accent-text); /* Adds the line to the left side */
		margin: 0 10px; /* Adds margin to the left and right */
		height: 30%; /* Makes the height of the line 80% of the parent */
	}
</style>

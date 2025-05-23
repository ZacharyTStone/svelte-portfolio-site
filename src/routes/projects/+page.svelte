<script lang="ts">
	import { run } from 'svelte/legacy';

	import Chip from '$lib/components/Chip/Chip.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import ProjectCard from '$lib/components/ProjectCard/ProjectCard.svelte';
	import SearchPage from '$lib/components/Page/SearchPage.svelte';
	import { PROJECTS } from '$lib/params';
	import MY_SKILLS from '$lib/skills.params';
	import type { Project, Skill } from '$lib/types';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';

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
	let displayed: Array<Project> = $state([]);
	const visibleItems = writable(new Set());
	let isInitialized = $state(false);
	const staggerDelay = 100;
	let featuredTitleVisible = $state(false);
	let otherTitleVisible = $state(false);

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

	const updateDisplayedProjects = () => {
		const selectedFilters = filters.filter((tech) => tech.isSelected);
		const trimmedSearch = search.trim().toLowerCase();

		displayed = items.filter((project) => {
			const isFiltered =
				selectedFilters.length === 0 ||
				selectedFilters.every((tech) => project.skills.some((skill) => skill.slug === tech.slug));
			const isSearched =
				trimmedSearch.length === 0 || $_(project.name).trim().toLowerCase().includes(trimmedSearch);

			return isFiltered && isSearched && !project.dont_show;
		});
	};

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		search = e.detail.search;
	};

	const initializeProjects = () => {
		isInitialized = true;

		let index = 0;
		const interval = setInterval(() => {
			if (index < displayed.length) {
				visibleItems.update((set) => new Set([...set, index]));
				index++;
			} else {
				clearInterval(interval);
			}
		}, staggerDelay);

		setTimeout(() => {
			featuredTitleVisible = true;
			setTimeout(() => {
				otherTitleVisible = true;
			}, 300);
		}, 200);
	};

	onMount(() => {
		const queryParams = new URLSearchParams(location.search);
		const item = queryParams.get('item');
		if (item) {
			search = item;
		}

		initializeProjects();
	});

	run(updateDisplayedProjects);
</script>

<SearchPage {title} on:search={onSearch}>
	<div class="projects-filters">
		<div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3 overflow-y-auto">
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
		{#if featuredTitleVisible}
			<h4
				class="text-[var(--accent-text)] text-1.5em font-300 m-y-12 mx-auto"
				in:fade={{ duration: 300 }}
			>
				{$_(PROJECTS.featured_projects ?? 'Featured Projects')}
			</h4>
		{:else}
			<div class="text-[var(--accent-text)] text-1.5em font-300 m-y-12 mx-auto opacity-0">
				Placeholder
			</div>
		{/if}
		<div class="projects-list mt-5 mx-auto">
			{#each displayed.filter((project) => project.featured) as project, index (project.slug)}
				{#if $visibleItems.has(index)}
					<div in:fade={{ duration: 300 }}>
						<ProjectCard {project} />
					</div>
				{/if}
			{/each}
		</div>
		{#if otherTitleVisible}
			<h4
				class="text-[var(--accent-text)] text-1.5em font-300 m-y-12 mx-auto"
				in:fade={{ duration: 300 }}
			>
				{$_(PROJECTS.other_projects ?? 'Other Projects')}
			</h4>
		{:else}
			<div class="text-[var(--accent-text)] text-1.5em font-300 m-y-12 mx-auto opacity-0">
				Placeholder
			</div>
		{/if}
		<div class="projects-list mt-5 mx-auto">
			{#each displayed.filter((project) => !project.featured) as project, index (project.slug)}
				{#if $visibleItems.has(index)}
					<div in:fade={{ duration: 300 }}>
						<ProjectCard {project} />
					</div>
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
		width: 100%;
		min-height: 282px;

		@media (max-width: 1350px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (max-width: 850px) {
			grid-template-columns: repeat(1, 1fr);
			gap: 70px;
		}
	}
</style>

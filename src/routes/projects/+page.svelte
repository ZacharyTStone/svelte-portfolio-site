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
	import { thumbsUpStore } from '$lib/stores/thumbsUpStore';

	interface SkillFilter extends Skill {
		isSelected?: boolean;
	}

	const { items, title } = PROJECTS;

	// Update projects with thumbs up counts from store
	let projectsWithCounts = $state(
		items.map((project) => ({
			...project,
			thumbsUpCount: project.thumbsUpCount || 0
		}))
	);

	// Function to load all project likes
	async function loadAllProjectLikes() {
		if (typeof window !== 'undefined') {
			await Promise.all(
				items.map(async (project) => {
					await thumbsUpStore.loadProjectLikes(project.slug);
				})
			);

			updateProjectsWithCounts();
		}
	}

	// Update projects with latest like counts from the store
	function updateProjectsWithCounts() {
		projectsWithCounts = items.map((project) => {
			const storedCount = thumbsUpStore.getLikesCount(project.slug);
			return {
				...project,
				thumbsUpCount: storedCount
			};
		});
	}

	let filters: Array<SkillFilter> = $state(
		MY_SKILLS.filter((it) =>
			projectsWithCounts.some((project) => project.skills.some((skill) => skill.slug === it.slug))
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

	// Function to sort projects by thumbs up count
	const sortByThumbsUp = (projects: Project[]) => {
		return [...projects].sort((a, b) => {
			const aCount = a.thumbsUpCount || 0;
			const bCount = b.thumbsUpCount || 0;

			// First sort by likes count in descending order
			if (bCount !== aCount) {
				return bCount - aCount;
			}

			// If like counts are equal, use project name as secondary sort
			return $_(a.name).localeCompare($_(b.name));
		});
	};

	const updateDisplayedProjects = () => {
		const selectedFilters = filters.filter((tech) => tech.isSelected);
		const filteredProjects = projectsWithCounts.filter((project) => {
			const isFiltered =
				selectedFilters.length === 0 ||
				selectedFilters.every(
					(tech) => tech.isSelected && project.skills.some((skill) => skill.slug === tech.slug)
				);
			const isSearched =
				search.trim().length === 0 ||
				$_(project.name).trim().toLowerCase().includes(search.trim().toLowerCase());
			return isFiltered && isSearched && !project.dont_show;
		});

		// Sort projects by thumbsUp count within each category
		displayed = filteredProjects;
	};

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		search = e.detail.search;
	};

	const initializeProjects = () => {
		isInitialized = true;

		let index = 0;
		const interval = setInterval(() => {
			if (index < displayed.length) {
				visibleItems.update((set) => {
					set.add(index);
					return set;
				});
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

	onMount(async () => {
		const query = location.search;
		if (query) {
			const queryParams = new URLSearchParams(location.search);
			const item = queryParams.get('item');
			if (item) {
				search = item;
			}
		}

		// Load all project likes
		await loadAllProjectLikes();

		initializeProjects();
	});

	run(updateDisplayedProjects);
</script>

<SearchPage {title} on:search={onSearch}>
	<div class="projects-filters">
		<div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3 overflow-y-auto">
			<Chip
				classes={'text-0.9em md:text-0.8em'}
				on:click={() => {
					filters = filters.map((tech) => {
						tech.isSelected = false;
						return tech;
					});
				}}
				active={filters.every((tech) => !tech.isSelected)}
			>
				{$_(PROJECTS.no_filter_option ?? 'N/A')}
			</Chip>
			{#each filters as tech}
				<Chip
					active={tech.isSelected}
					classes={'text-0.9em md:text-0.8em min-w-max-content'}
					on:click={() => onSelected(tech.slug)}
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
		<h4
			class="text-[var(--accent-text)] text-1.5em font-300 m-y-12 mx-auto"
			in:fade={{ duration: 300 }}
		>
			{$_('PROJECTS.projects_by_popularity')}
		</h4>

		<div class="projects-list mt-5 mx-auto">
			{#each sortByThumbsUp(displayed) as project, index (project.slug)}
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

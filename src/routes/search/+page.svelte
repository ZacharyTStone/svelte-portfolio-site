<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { SEARCH } from '$lib/params';
	import SearchPage from '$lib/components/Page/SearchPage.svelte';
	import MY_EXPERIENCES from '$lib/experiences.params';
	import MY_PROJECTS from '$lib/projects.params';
	import MY_SKILLS from '$lib/skills.params';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { _ } from 'svelte-i18n';

	const { title } = SEARCH;

	interface Item<T = any> {
		icon: string;
		name: string;
		data: T;
		to: string;
	}

	let query = $state('');
	let result: Array<Item> = $state([]);

	/**
	 * Filters items based on the current search query
	 */
	function filterItems<T extends { name: string; label?: string; skills?: any }>(
		items: T[],
		searchQuery: string
	): T[] {
		const containsQuery = (value: any, depth: number): boolean => {
			if (depth > 8) return false;

			if (typeof value === 'string') {
				const includesValue = $_(value.toLowerCase()).includes(searchQuery.toLowerCase());
				return includesValue;
			} else if (Array.isArray(value)) {
				return value.some((item) => containsQuery(item, depth + 1));
			} else if (typeof value === 'object' && value !== null) {
				return (
					Object.values(value).some((nestedValue) => containsQuery(nestedValue, depth + 1)) ||
					Object.keys(value).some((key) => containsQuery(value[key], depth + 1))
				);
			}
			return false;
		};

		return items.filter((item: T) => !searchQuery || containsQuery(item, 1));
	}

	/**
	 * Generates Item objects from data arrays
	 */
	function generateItems<T>(items: T[], icon: string, toFn: (data: T) => string): Item<T>[] {
		return items.map<Item<T>>((data) => ({
			data,
			icon,
			name: (data as any).name,
			to: toFn(data)
		}));
	}

	/**
	 * Handle search event
	 */
	function handleSearch(e: CustomEvent<{ search: string }>) {
		query = e.detail.search;
	}

	/**
	 * Check if item label contains the search query
	 */
	function labelMatchesQuery(label: string, searchQuery: string): boolean {
		return label.toLowerCase().includes(searchQuery.toLowerCase());
	}

	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);
		query = searchParams.get('q') ?? '';
	});

	run(() => {
		result = [];
		// Store query in a closure variable to avoid referencing it directly in the reactive context
		const currentQuery = query;

		// Generate items for projects
		result.push(
			...generateItems(
				filterItems(MY_PROJECTS, currentQuery),
				'i-carbon-cube',
				(data) => `projects/${(data as any).slug}`
			)
		);

		// Generate items for skills
		result.push(
			...generateItems(
				filterItems(MY_SKILLS, currentQuery),
				'i-carbon-software-resource-cluster',
				(data) => `skills/${(data as any).slug}`
			)
		);

		// Generate items for experiences
		result.push(
			...generateItems(
				filterItems(MY_EXPERIENCES, currentQuery),
				'i-carbon-development',
				(data) => `experience/${(data as any).slug}`
			)
		);
	});
</script>

<svelte:head>
	<title>{title} | Portfolio</title>
	<meta name="description" content="Search through projects, skills, and experiences" />
</svelte:head>

<SearchPage {title} onsearch={handleSearch}>
	{#if !query}
		<!-- Display prompt when no query -->
		<div
			class="flex-1 self-center col-center m-t-10 gap-5 font-300 text-[var(--accent-text)]"
			role="status"
			aria-live="polite"
		>
			<UIcon icon="i-carbon-search-locate-mirror" classes="text-2em" ariaHidden={true} />
			<span>{$_(SEARCH.prompt)}</span>
		</div>
	{:else if result.length === 0}
		<!-- Display message when no results -->
		<div
			class="flex-1 self-center col-center m-t-10 gap-5 font-300 text-[var(--accent-text)]"
			role="status"
			aria-live="polite"
		>
			<UIcon icon="i-carbon-cube" classes="text-2em" ariaHidden={true} />
			<span>Oops! Nothing to show for '{query}'</span>
		</div>
	{:else}
		<!-- Display search results -->
		<div class="flex flex-row flex-wrap gap-1" role="list" aria-label="Search results">
			{#each result as { data, icon, name, to }}
				<Chip href={`${base}/${to}`} classes="flex flex-row items-center gap-2" newTab={false}>
					<UIcon {icon} ariaHidden={true} />
					<span>{$_(name)}</span>
				</Chip>

				{#if data.extraInfo}
					{#each data.extraInfo as { title, content }}
						{#each content as { label, link }}
							{#if labelMatchesQuery(label, query)}
								<Chip
									href={`${base}/${to}`}
									classes="flex flex-row items-center gap-2"
									newTab={false}
								>
									<UIcon {icon} ariaHidden={true} />
									<span>{$_(label)}</span>
								</Chip>
							{/if}
						{/each}
					{/each}
				{/if}
			{/each}
		</div>
	{/if}
</SearchPage>

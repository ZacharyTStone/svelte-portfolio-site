<script lang="ts">
	import { base } from '$app/paths';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import SearchPage from '$lib/components/Page/SearchPage.svelte';
	import MY_EXPERIENCES from '$lib/experiences.params';
	import { SEARCH } from '$lib/params';
	import MY_PROJECTS from '$lib/projects.params';
	import MY_SKILLS from '$lib/skills.params';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	const { title } = SEARCH;

	interface ExtraInfoContent {
		label: string;
		link?: string;
	}

	interface ExtraInfo {
		title: string;
		content: ExtraInfoContent[];
	}

	interface ItemData {
		name: string;
		slug: string;
		extraInfo?: ExtraInfo[];
	}

	interface Item {
		icon: string;
		name: string;
		data: ItemData;
		to: string;
	}

	let query = $state('');

	/**
	 * Filters items based on the current search query
	 */
	function filterItems<T extends { name: string; label?: string; skills?: unknown }>(
		items: T[],
		searchQuery: string
	): T[] {
		const containsQuery = (value: unknown, depth: number): boolean => {
			if (depth > 8) return false;

			if (typeof value === 'string') {
				const includesValue = $_(value.toLowerCase()).includes(searchQuery.toLowerCase());
				return includesValue;
			} else if (Array.isArray(value)) {
				return value.some((item) => containsQuery(item, depth + 1));
			} else if (typeof value === 'object' && value !== null) {
				return (
					Object.values(value).some((nestedValue) => containsQuery(nestedValue, depth + 1)) ||
					Object.keys(value).some((key) =>
						containsQuery((value as Record<string, unknown>)[key], depth + 1)
					)
				);
			}
			return false;
		};

		return items.filter((item: T) => !searchQuery || containsQuery(item, 1));
	}

	/**
	 * Generates Item objects from data arrays
	 */
	function generateItems<T extends ItemData>(
		items: T[],
		icon: string,
		toFn: (data: T) => string
	): Item[] {
		return items.map((data) => ({
			data,
			icon,
			name: data.name,
			to: toFn(data)
		}));
	}

	/**
	 * Handle search callback
	 */
	function handleSearch(searchValue: string) {
		query = searchValue;
	}

	/**
	 * Check if item label contains the search query
	 */
	function labelMatchesQuery(label: string, searchQuery: string): boolean {
		return label.toLowerCase().includes(searchQuery.toLowerCase());
	}

	// Derived search results
	let result = $derived.by(() => {
		const items: Item[] = [];
		const currentQuery = query;

		// Generate items for projects
		items.push(
			...generateItems(
				filterItems(MY_PROJECTS, currentQuery),
				'i-carbon-cube',
				(data) => `projects/${data.slug}`
			)
		);

		// Generate items for skills
		items.push(
			...generateItems(
				filterItems(MY_SKILLS, currentQuery),
				'i-carbon-software-resource-cluster',
				(data) => `skills/${data.slug}`
			)
		);

		// Generate items for experiences
		items.push(
			...generateItems(
				filterItems(MY_EXPERIENCES, currentQuery),
				'i-carbon-development',
				(data) => `experience/${data.slug}`
			)
		);

		return items;
	});

	onMount(() => {
		const searchParams = new URLSearchParams(window.location.search);
		query = searchParams.get('q') ?? '';
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

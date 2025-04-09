<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher, onMount } from 'svelte';
	import CommonPage from './CommonPage.svelte';
	import Input from '../Input/Input.svelte';
	import { browser } from '$app/environment';

	/**
	 * Component props interface
	 */
	interface Props {
		/** Page title */
		title?: string;
		/** Search query string */
		search?: string;
		/** Child content */
		children?: import('svelte').Snippet;
		/** Search event handler */
		onsearch?: (event: CustomEvent<{ search: string }>) => void;
	}

	let { title = 'Title', search = $bindable(''), children, onsearch }: Props = $props();

	const dispatch = createEventDispatcher<{
		search: { search: string };
	}>();

	let mounted = $state(false);

	/**
	 * Handle search input change
	 */
	function handleSearchChange(currentSearch: string): void {
		const trimmedSearch = currentSearch.trim().toLowerCase();

		// Dispatch the search event for parent components
		dispatch('search', { search: trimmedSearch });

		// Call the event handler if provided
		if (onsearch) {
			onsearch(new CustomEvent('search', { detail: { search: trimmedSearch } }));
		}

		// Update URL if in browser
		updateURL(trimmedSearch);
	}

	/**
	 * Update URL with search parameter
	 */
	function updateURL(searchValue: string): void {
		if (browser && mounted) {
			let searchParams = new URLSearchParams(window.location.search);
			searchParams.set('q', searchValue);

			const url = `${window.location.protocol}//${window.location.host}${
				window.location.pathname
			}?${searchParams.toString()}`;

			const state = window.history.state;
			window.history.replaceState(state, '', url);
		}
	}

	run(() => {
		const currentSearch = search;
		handleSearchChange(currentSearch);
	});

	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);
		search = searchParams.get('q') ?? '';
		mounted = true;
	});
</script>

<CommonPage {title}>
	<div class="w-100% row" role="search">
		<Input
			bind:value={search}
			placeholder={'Search...'}
			aria-label="Search through projects, skills and experiences"
		/>
	</div>
	<div class="w-100% col flex-1">
		{@render children?.()}
	</div>
</CommonPage>

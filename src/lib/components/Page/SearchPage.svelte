<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher, onMount } from 'svelte';
	import CommonPage from './CommonPage.svelte';
	import Input from '../Input/Input.svelte';
	import { browser } from '$app/environment';

	interface Props {
		title?: string;
		search?: string;
		children?: import('svelte').Snippet;
	}

	let { title = 'Title', search = $bindable(''), children }: Props = $props();

	const dispatch = createEventDispatcher();

	let mounted = $state(false);

	run(() => {
		dispatch('search', { search: search.trim().toLowerCase() });
	});

	run(() => {
		if (browser && mounted) {
			let searchParams = new URLSearchParams(window.location.search);

			searchParams.set('q', search);

			const url = `${window.location.protocol}//${window.location.host}${
				window.location.pathname
			}?${searchParams.toString()}`;

			const state = window.history.state;

			window.history.replaceState(state, '', url);
		}
	});

	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);

		search = searchParams.get('q') ?? '';
		mounted = true;
	});
</script>

<CommonPage {title}>
	<div class="w-100% row">
		<Input bind:value={search} placeholder={'Search...'} />
	</div>
	<div class="w-100% col flex-1">
		{@render children?.()}
	</div>
</CommonPage>

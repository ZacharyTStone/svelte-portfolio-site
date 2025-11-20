<script lang="ts">
	import MainTitle from '../MainTitle/MainTitle.svelte';
	import TabTitle from './TabTitle.svelte';
	import Breadcrumbs from '../Breadcrumbs.svelte';
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';

	let { title = $bindable('Title'), children } = $props<{
		title?: string;
		children: () => any;
	}>();

	// Safe translation function for SSR
	function safeTranslate(key: string): string {
		if (!browser) {
			return key.split('.').pop() || key;
		}
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	let translatedTitle = $derived(safeTranslate(title));
</script>

<TabTitle title={translatedTitle} />
<div class="flex-1 col gap-5 px-2 sm:px-4 md:px-6 py-4 sm:py-8 md:py-12">
	<Breadcrumbs />
	<MainTitle>{translatedTitle}</MainTitle>
	<div class="col gap-5 flex-1">
		{@render children()}
	</div>
</div>

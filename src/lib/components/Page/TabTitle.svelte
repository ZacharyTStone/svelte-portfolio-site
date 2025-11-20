<script lang="ts">
	import { TITLE_SUFFIX } from '$lib/params';
	import { useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';

	let { title } = $props<{ title: string }>();

	// Safe translation function for SSR
	// Only translates if it looks like a translation key (contains a dot)
	function safeTranslate(key: string): string {
		// If it doesn't look like a translation key, return as-is
		if (!key.includes('.')) {
			return key;
		}
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

<svelte:head>
	<title>{translatedTitle}</title>
</svelte:head>
<!-- src/lib/components/LoadingProvider.svelte -->
<script lang="ts">
	/**
	 * LoadingProvider wraps content and handles loading transitions.
	 *
	 * Initial page load: The app.html loader handles the initial loading state
	 * with CSS-based visibility control (body:not(.locale-ready)).
	 *
	 * Internal navigation: This component can be used for page transitions
	 * by subscribing to the isLoading store.
	 */
	interface Props {
		transition?: boolean;
		children?: import('svelte').Snippet;
	}

	let { transition = false, children }: Props = $props();
</script>

<!-- Content is always rendered - visibility is controlled by app.html CSS during initial load -->
{@render children?.()}

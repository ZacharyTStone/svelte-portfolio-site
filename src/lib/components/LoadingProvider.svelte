<!-- src/lib/components/LoadingProvider.svelte -->
<script lang="ts">
	import { isLoading } from '$lib/i18n';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Prop to control whether to use transition or not
	// Default to false to avoid unnecessary transitions for minor content
	export let transition = false;

	// Set initial visibility state
	// In SSR (server-side rendering), we always show content immediately
	// In browser, we wait for i18n to initialize if transition is true
	let visible = !browser || !transition;

	onMount(() => {
		if (browser && transition) {
			// Subscribe to the loading state only if we're in browser and transition is enabled
			const unsubscribe = isLoading.subscribe((loading) => {
				if (!loading) {
					// When loading is complete, make the content visible
					visible = true;
				}
			});

			return unsubscribe;
		}
	});
</script>

{#if visible}
	<slot />
{:else}
	<!-- Hidden placeholder with no visual impact to prevent layout shifts -->
	<div aria-hidden="true" class="invisible"></div>
{/if}

<style>
	.invisible {
		visibility: hidden;
		position: absolute;
		pointer-events: none;
	}
</style>

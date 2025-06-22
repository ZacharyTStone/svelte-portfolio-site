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
	<!-- Enhanced loading skeleton -->
	<div class="loading-skeleton" aria-hidden="true">
		<div class="skeleton-header">
			<div class="skeleton-nav"></div>
		</div>
		<div class="skeleton-content">
			<div class="skeleton-hero">
				<div class="skeleton-title"></div>
				<div class="skeleton-subtitle"></div>
				<div class="skeleton-button"></div>
			</div>
		</div>
	</div>
{/if}

<style>
	.loading-skeleton {
		min-height: 100vh;
		background: var(--main);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.skeleton-header {
		height: 80px;
		border-bottom: 1px solid var(--border);
		display: flex;
		align-items: center;
		padding: 0 var(--space-xl);
	}

	.skeleton-nav {
		width: 200px;
		height: 20px;
		background: var(--secondary);
		border-radius: var(--radius-md);
		animation: shimmer 1.5s infinite;
	}

	.skeleton-content {
		padding: var(--space-3xl);
		max-width: 1200px;
		margin: 0 auto;
	}

	.skeleton-hero {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-2xl);
		align-items: center;
		min-height: 60vh;
	}

	.skeleton-title {
		width: 80%;
		height: 60px;
		background: var(--secondary);
		border-radius: var(--radius-lg);
		margin-bottom: var(--space-lg);
		animation: shimmer 1.5s infinite;
	}

	.skeleton-subtitle {
		width: 60%;
		height: 24px;
		background: var(--secondary);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-xl);
		animation: shimmer 1.5s infinite;
	}

	.skeleton-button {
		width: 120px;
		height: 40px;
		background: var(--secondary);
		border-radius: var(--radius-lg);
		animation: shimmer 1.5s infinite;
	}

	@keyframes shimmer {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 0.3;
		}
		100% {
			opacity: 0.6;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.95;
		}
	}

	@media (max-width: 768px) {
		.skeleton-hero {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.skeleton-title,
		.skeleton-subtitle {
			margin: 0 auto var(--space-lg);
		}

		.skeleton-button {
			margin: 0 auto;
		}
	}
</style>

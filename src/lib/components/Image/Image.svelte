<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src?: string;
		alt?: string;
		classes?: string;
		loadingHeight?: string;
		loadingWidth?: string;
		style?: string;
		onClick?: () => void;
	}

	let {
		src = '',
		alt = '',
		classes = '',
		loadingHeight = '200px',
		loadingWidth = '100%',
		style = '',
		onClick
	}: Props = $props();

	let loaded = $state(false);
	let failed = $state(false);
	let loading = $state(true);

	onMount(() => {
		const img = new Image();
		img.src = src;
		loading = true;

		img.onload = () => {
			loading = false;
			loaded = true;
		};
		img.onerror = () => {
			loading = false;
			failed = true;
		};
	});
</script>

{#if loaded}
	<img
		{src}
		class={classes}
		{style}
		onclick={onClick}
		onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && onClick?.()}
		{alt}
		role={onClick != null ? 'button' : undefined}
	/>
{:else if loading}
	<div
		class={classes + ' skeleton'}
		style={`min-height: ${loadingHeight}; min-width: ${loadingWidth}`}
		aria-label="Loading image"
		role="status"
	></div>
{:else if failed}
	<div
		class={classes + ' skeleton error'}
		style={`min-height: ${loadingHeight}; min-width: ${loadingWidth}`}
		aria-label="Failed to load image"
		role="alert"
	></div>
{/if}

<style>
	.skeleton {
		background: #eee;
		border: 2px solid;
		border-radius: 10px;
		border-color: #ff0000;
		animation:
			pulse 1.5s ease-in-out infinite,
			rainbow-border 3s linear infinite;
	}

	.skeleton.error {
		border-color: #ff0000;
		animation: none;
	}

	@keyframes pulse {
		0% {
			background-color: #eee;
		}
		50% {
			background-color: #ddd;
		}
		100% {
			background-color: #eee;
		}
	}

	@keyframes rainbow-border {
		0% {
			border-color: #ff8080;
		}
		12.5% {
			border-color: #ffc080;
		}
		25% {
			border-color: #ffff80;
		}
		37.5% {
			border-color: #80ff80;
		}
		50% {
			border-color: #8080ff;
		}
		62.5% {
			border-color: #c080ff;
		}
		75% {
			border-color: #ff80ff;
		}
		87.5% {
			border-color: #ff8080;
		}
		100% {
			border-color: #ffc080;
		}
	}
</style>

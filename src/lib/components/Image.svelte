<script lang="ts">
	import { onMount } from 'svelte';
	export let src: string = '';
	export let alt: string = '';
	export let classes: string = '';
	export let loadingHeight: string = '200px'; // 追加
	export let loadingWidth: string = '100%'; // 追加

	let loaded = false;
	let failed = false;
	let loading = true;

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
	<img {src} {alt} class={classes} />
{:else if failed}
	<img
		src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg"
		alt="Not Found"
		class={classes}
	/>
{:else if loading}
	<div
		class={classes + ' skeleton'}
		style={`min-height: ${loadingHeight}; min-width: ${loadingWidth}`}
	/>
{/if}

<style>
	.skeleton {
		background: #eee;
		border: 4px solid;
		border-radius: 10px;
		border-color: #ff0000;
		animation: pulse 1.5s ease-in-out infinite, rainbow-border 1.5s linear infinite;
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
			border-color: #ff0000;
		}
		12.5% {
			border-color: #ff8000;
		}
		25% {
			border-color: #ffff00;
		}
		37.5% {
			border-color: #00ff00;
		}
		50% {
			border-color: #0000ff;
		}
		62.5% {
			border-color: #4b0082;
		}
		75% {
			border-color: #9400d3;
		}
		87.5% {
			border-color: #ff0000;
		}
		100% {
			border-color: #ff8000;
		}
	}
</style>

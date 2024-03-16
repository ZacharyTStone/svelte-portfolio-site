<script lang="ts">
	import { onMount } from 'svelte';
	export let src: string = '';
	export let alt: string = '';
	export let classes: string = '';

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
	<div class={classes + ' skeleton'} style="min-height: 200px; min-width: 100%;" />
{/if}

<style>
	.skeleton {
		background: #eee;
		animation: pulse 1.5s infinite ease-in-out;
	}
	@keyframes pulse {
		0% {
			background-color: #cfcece;
		}
		50% {
			background-color: #9e9c9c;
		}
		100% {
			background-color: #cfcece;
		}
	}
</style>

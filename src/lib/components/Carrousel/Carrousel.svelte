<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Skill } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';
	import UIcon from '../Icon/UIcon.svelte';
	import { base } from '$app/paths';

	export let items: Array<Skill> = [];
	let element: HTMLElement;

	let timeout: number;
	let index = 0;

	import { _ } from 'svelte-i18n';

	onMount(() => {
		timeout = setInterval(() => {
			slide('right');
		}, 5000); // Adjust the interval as needed (e.g., every 5 seconds)
	});

	onDestroy(() => {
		clearInterval(timeout);
	});

	$: {
		if (element) {
			element.scroll({
				left: index * 150,
				behavior: 'smooth'
			});
		}
	}

	const slide = (direction: 'left' | 'right') => {
		if (direction == 'right') {
			index = index < items.length - 1 ? index + 1 : 0;
		} else {
			index = index > 0 ? index - 1 : items.length - 1;
		}
	};

	const toggleLeft = () => {
		clearInterval(timeout);
		slide('left');
	};

	const toggleRight = () => {
		clearInterval(timeout);
		slide('right');
	};
</script>

<div class="carousel row-center mb-5">
	<button
		class="control-button font-500 p-5px m-y-0px m-x-10px cursor-pointer border-1px border-solid border-[var(--border)] bg-transparent hover:border-[var(--border-hover)]"
		on:click={toggleLeft}
	>
		<UIcon icon="i-carbon-chevron-left" />
	</button>

	<div bind:this={element} class="carousel-content row overflow-hidden box-content w-150px">
		{#each items as item}
			<div class="box-content w-150px p-15px col-center">
				<a href={`${base}/skills/${item.slug}`} rel="noreferrer">
					<img
						class="w-120px h-120px aspect-square"
						src={getAssetURL(item.logo)}
						alt={$_(item.name)}
					/>
				</a>
				<span class="text-center m-t-10px sm:text-[1em] min-h-48px">{$_(item.name)}</span>
			</div>
		{/each}
	</div>

	<button
		class="control-button font-500 p-5px m-y-0px m-x-10px cursor-pointer border-1px border-solid border-[var(--border)] bg-transparent  hover:border-[var(--border-hover)]"
		on:click={toggleRight}
	>
		<UIcon icon="i-carbon-chevron-right" />
	</button>
</div>

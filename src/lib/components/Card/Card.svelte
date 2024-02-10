<script lang="ts">
	import { onMount } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	import { onHover } from '$lib/utils/helpers';
	import { changeColorOpacity } from '$lib/utils/helpers';

	let el: HTMLElement;

	export let color = '#ffffff00';
	export let margin = '0px';
	export let tiltDegree = 5;
	export let classes: Array<string> = [];
	export let href: undefined | string = undefined;
	export let bgImg: string | undefined = undefined;

	// Calculating color shades
	$: borderColor = changeColorOpacity(color, 0.5);
	$: dropColor = changeColorOpacity(color, 0.15);
	$: bgColor = changeColorOpacity(color, 0.01);

	// Applying styles on mount
	onMount(() => {
		if (el) {
			el.style.setProperty('--border-color', borderColor);
			el.style.setProperty('--drop-color', dropColor);
			el.style.setProperty('--bg-color', bgColor);
			el.style.setProperty('margin', margin);
			el.style.setProperty('--bg-img', bgImg ? `url(${bgImg})` : '');
		}
	});

	// Handling hover event
	const handleHover: any = (e: any) => {
		onHover(e, el, tiltDegree);
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	bind:this={el}
	on:mousemove={handleHover}
	class={`card text-inherit decoration-none inline-flex flex-col border-1px border-solid border-[var(--border)] rounded-15px duration relative ${classes.join(
		' '
	)}`}
	style={bgColor}
>
	<div class="card-bg-img flex-1 flex flex-col p-25px rounded-15px">
		<slot />
	</div>
</svelte:element>

<style lang="scss">
	.card {
		--border-color: transparent;
		--bg-color: transparent;
		--drop-color: transparent;
		--bg-img: url();
		--drop-x: 0;
		--drop-y: 0;
		--rot-x: 0;
		--rot-y: 0;
		background: linear-gradient(90deg, var(--main) 0%, var(--main) 60%, var(--main-60) 100%),
			no-repeat right 40% / 40% var(--bg-img);

		&-bg-img {
			&:hover {
				background-color: var(--bg-color);
				background-image: radial-gradient(
					circle at var(--drop-x) var(--drop-y),
					var(--drop-color),
					transparent
				);
			}
		}

		&:hover {
			transform: perspective(1000px) rotateX(var(--rot-x)) rotateY(var(--rot-y)) scale(1.01);
			border-color: var(--border-hover);
			animation: shimmer 2s infinite;
		}
	}

	@keyframes shimmer {
		0% {
			box-shadow: 0px 0px 5px rgba(255, 0, 0, 0.2), 5px 0px 5px rgba(255, 255, 0, 0.2),
				5px 5px 5px rgba(0, 255, 0, 0.2), 0px 5px 5px rgba(0, 0, 255, 0.2);
		}
		25% {
			box-shadow: 5px 0px 5px rgba(255, 0, 0, 0.2), 5px 5px 5px rgba(255, 255, 0, 0.2),
				0px 5px 5px rgba(0, 255, 0, 0.2), 0px 0px 5px rgba(0, 0, 255, 0.2);
		}
		50% {
			box-shadow: 5px 5px 5px rgba(255, 0, 0, 0.2), 0px 5px 5px rgba(255, 255, 0, 0.2),
				0px 0px 5px rgba(0, 255, 0, 0.2), 5px 0px 5px rgba(0, 0, 255, 0.2);
		}
		75% {
			box-shadow: 0px 5px 5px rgba(255, 0, 0, 0.2), 0px 0px 5px rgba(255, 255, 0, 0.2),
				5px 0px 5px rgba(0, 255, 0, 0.2), 5px 5px 5px rgba(0, 0, 255, 0.2);
		}
		100% {
			box-shadow: 0px 0px 5px rgba(255, 0, 0, 0.2), 5px 0px 5px rgba(255, 255, 0, 0.2),
				5px 5px 5px rgba(0, 255, 0, 0.2), 0px 5px 5px rgba(0, 0, 255, 0.2);
		}
	}
</style>

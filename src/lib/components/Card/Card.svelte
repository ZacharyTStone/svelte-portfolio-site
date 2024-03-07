<script lang="ts">
	import { onMount } from 'svelte';
	import { onHover } from '$lib/utils/helpers';
	import { changeColorOpacity } from '$lib/utils/helpers';

	let el: HTMLElement;

	export let color = '#ffffff00';
	export let margin = '8px';
	export let tiltDegree = 3;
	export let classes: Array<string> = [];
	export let href: undefined | string = undefined;
	export let bgImg: string | undefined = undefined;
	export let style: string = '';

	onMount(() => {
		if (el) {
			const borderColor = changeColorOpacity(color, 0.5);
			const dropColor = changeColorOpacity(color, 0.15);
			const bgColor = changeColorOpacity(color, 0.01);

			el.style.setProperty('--border-color', borderColor);
			el.style.setProperty('--drop-color', dropColor);
			el.style.setProperty('--bg-color', bgColor);
			el.style.setProperty('margin', margin);
			el.style.setProperty('--bg-img', bgImg ? `url(${bgImg})` : '');
		}
	});

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
	class={`card text-inherit decoration-none inline-flex flex-col border-1px border-solid border-[var(--border)] duration relative ${classes.join(
		' '
	)}`}
	style={color}
>
	<div class="card-bg-img flex-1 flex flex-col p-25px" style={`${style}`}>
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
			animation: card_shimmer 2s infinite;
		}
	}
</style>

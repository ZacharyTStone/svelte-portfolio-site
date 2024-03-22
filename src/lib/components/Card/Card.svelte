<script lang="ts">
	import { onMount } from 'svelte';
	import { onHover } from '$lib/utils/helpers';
	import { changeColorOpacity } from '$lib/utils/helpers';

	let el: HTMLElement;

	export let color = '#ffffff00';
	export let margin = '0px';
	export let tiltDegree = 3;
	export let classes: Array<string> = [];
	export let href: undefined | string = undefined;
	export let bgImg: string | undefined = undefined;

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
	class={`card text-inherit decoration-none inline-flex flex-col border-1px border-solid border-[var(--border)] rounded-15px duration relative ${classes.join(
		' '
	)}`}
	style={color}
>
	<div>
		{#if bgImg}
			<img src={bgImg} class="hover-img " alt="hover image" aria-hidden="true" />
		{/if}

		<div class="card-bg-img flex-1 flex flex-col p-15px rounded-15px relative">
			<slot />
		</div>
	</div>
</svelte:element>

<style lang="scss">
	.hover-img {
		position: absolute;
		opacity: 0;
		transition: opacity 0.5s ease-in;
		top: -40px;
		right: -5px;
		width: 150px;
		height: 150px;
		z-index: 9999 !important;
		pointer-events: none;
		border-radius: 10px;
	}
	// make all text twci as big on hover

	// only apply the below to desktop and larger
	@media (min-width: 1024px) {
		.card:hover .hover-img {
			opacity: 1;
		}
	}
	.card {
		position: relative;
		overflow: visible;
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

		height: max-content;

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

	:global(.card:hover .quote-text) {
		filter: blur(0) !important; /* ホバー時にぼかしを解除 */
	}
</style>

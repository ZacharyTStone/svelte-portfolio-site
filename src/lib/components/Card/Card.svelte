<script lang="ts">
	import { onMount } from 'svelte';
	import { onHover } from '$lib/utils/helpers';
	import { changeColorOpacity } from '$lib/utils/helpers';
	import { fade } from 'svelte/transition';

	let el: HTMLElement | undefined = $state();

	interface Props {
		color?: string;
		margin?: string;
		tiltDegree?: number;
		classes?: Array<string>;
		href?: undefined | string;
		bgImg?: string | undefined;
		fadeDelay?: number;
		children?: import('svelte').Snippet;
		newtab?: boolean;
		onClick?: (event: Event) => void;
		active?: boolean;
		nofade?: boolean;
		style?: string;
	}

	let {
		color = '#ffffff00',
		margin = '0px',
		tiltDegree = 3,
		classes = [],
		href = undefined,
		bgImg = undefined,
		fadeDelay = 0,
		children,
		newtab = false,
		onClick,
		active = false,
		nofade = false,
		style
	}: Props = $props();

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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
	this={href ? (newtab ? 'a' : 'a') : 'div'}
	target={newtab ? '_blank' : '_self'}
	{href}
	bind:this={el}
	onmousemove={handleHover}
	class={`card text-inherit decoration-none inline-flex flex-col border-1px border-solid border-[var(--border)] rounded-15px duration relative ${classes.join(
		' '
	)}`}
	{style}
	transition:fade={{ delay: fadeDelay, duration: nofade ? 0 : 300 }}
	onclick={onClick}
	class:active
>
	<div
		class={`card-bg-img flex-1 flex flex-col p-15px rounded-15px`}
		style={`${onClick ? 'cursor: url("/ring-pointer.png"), auto;' : ''}`}
	>
		{@render children?.()}
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
		background:
			linear-gradient(90deg, var(--main) 0%, var(--main) 60%, var(--main-60) 100%),
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

	.active {
		border-color: var(--border-active);
	}

	:global(.card:hover .blurb-text) {
		filter: blur(0) !important; /* ホバー時にぼかしを解除 */
	}
</style>

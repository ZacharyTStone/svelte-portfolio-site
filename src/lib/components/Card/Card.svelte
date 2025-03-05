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
		enhanced3d?: boolean;
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
		style,
		enhanced3d = false
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
	class={`card text-inherit decoration-none inline-flex flex-col border-1px border-solid border-[var(--border)] rounded-15px duration relative ${enhanced3d ? 'card-enhanced-3d' : ''} ${classes.join(
		' '
	)}`}
	{style}
	transition:fade={{ delay: fadeDelay, duration: nofade ? 0 : 300 }}
	onclick={onClick}
	class:active
>
	<div
		class={`card-bg-img flex-1 flex flex-col p-15px rounded-15px card-content ${enhanced3d ? 'card-content-3d' : ''}`}
		style={`${onClick ? 'cursor: pointer;' : ''}`}
	>
		{#if enhanced3d}
			<div class="card-shadow"></div>
			<div class="card-glow"></div>
		{/if}
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
		font-family: var(--text-f);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;

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

		&-content {
			:global(h1),
			:global(h2),
			:global(h3),
			:global(h4),
			:global(h5),
			:global(h6) {
				font-family: var(--title-f);
			}

			position: relative;
			z-index: 2;
		}

		&-shadow {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 15px;
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
			opacity: 0;
			transition:
				opacity 0.3s ease,
				transform 0.3s ease;
			z-index: 1;
		}

		&-glow {
			position: absolute;
			top: -20px;
			left: -20px;
			right: -20px;
			bottom: -20px;
			background: radial-gradient(
				circle at var(--drop-x) var(--drop-y),
				var(--drop-color),
				transparent 70%
			);
			opacity: 0;
			z-index: 0;
			transition: opacity 0.3s ease;
			pointer-events: none;
		}

		&:hover {
			transform: perspective(1000px) rotateX(var(--rot-x)) rotateY(var(--rot-y)) scale(1.01);
			border-color: var(--border-hover);
			animation: card_shimmer 2s infinite;
		}
	}

	.card-enhanced-3d {
		transform-style: preserve-3d;
		transform: perspective(1000px);
		box-shadow:
			0 5px 15px rgba(0, 0, 0, 0.05),
			0 15px 40px rgba(0, 0, 0, 0.03);

		&:hover {
			transform: perspective(1000px) rotateX(var(--rot-x)) rotateY(var(--rot-y)) translateZ(10px)
				scale(1.01);
			box-shadow:
				0 15px 30px rgba(0, 0, 0, 0.07),
				0 30px 60px rgba(0, 0, 0, 0.05);

			.card-shadow {
				opacity: 1;
				transform: translateZ(-20px);
			}

			.card-glow {
				opacity: 0.05;
			}
		}

		.card-content-3d {
			transform: translateZ(20px);
		}
	}

	.active {
		border-color: var(--border-active);
	}

	:global(.card:hover .blurb-text) {
		filter: blur(0) !important; /* ホバー時にぼかしを解除 */
	}
</style>

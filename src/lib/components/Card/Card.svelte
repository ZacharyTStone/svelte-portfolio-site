<script lang="ts">
	import { onMount } from 'svelte';
	import { handleTiltEffect, adjustColorOpacity } from '$lib/utils/animation';
	import { fade } from 'svelte/transition';

	let el: HTMLElement | null = null;

	interface Props {
		color?: string;
		margin?: string;
		tiltDegree?: number;
		href?: string | undefined;
		bgImg?: string | undefined;
		fadeDelay?: number;
		children?: import('svelte').Snippet;
		external?: boolean;
		onClick?: (event: Event) => void;
		active?: boolean;
		nofade?: boolean;
		style?: string;
		enhanced3d?: boolean;
		classes?: string;
	}

	let {
		color = '#ffffff00',
		margin = '0px',
		tiltDegree = 3,
		href = undefined,
		bgImg = undefined,
		fadeDelay = 0,
		children,
		external = false,
		onClick,
		active = false,
		nofade = false,
		style = '',
		enhanced3d = false,
		classes = ''
	}: Props = $props();

	onMount(() => {
		if (el) {
			const borderColor = adjustColorOpacity(color, 0.5);
			const dropColor = adjustColorOpacity(color, 0.15);
			const bgColor = adjustColorOpacity(color, 0.01);

			el.style.setProperty('--border-color', borderColor);
			el.style.setProperty('--drop-color', dropColor);
			el.style.setProperty('--bg-color', bgColor);
			el.style.setProperty('margin', margin);
			el.style.setProperty('--bg-img', bgImg ? `url(${bgImg})` : '');
		}
	});

	function onMouseMove(e: MouseEvent) {
		handleTiltEffect(e, el, tiltDegree, enhanced3d ? 1.02 : 1.01);
	}
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	target={external ? '_blank' : '_self'}
	rel={external ? 'noopener noreferrer' : undefined}
	{href}
	bind:this={el}
	role={onClick ? 'button' : undefined}
	aria-pressed={active ? 'true' : undefined}
	onmousemove={onMouseMove}
	class="card inline-flex flex-col border border-solid rounded-[15px] transition-all duration-300 relative
	{enhanced3d ? 'card-enhanced-3d transform-gpu' : ''} 
	{active ? 'border-[var(--border-active)]' : 'border-[var(--main-text-subtle)]'} 
	{classes}"
	{style}
	transition:fade={{ delay: fadeDelay, duration: nofade ? 0 : 300 }}
	onclick={onClick}
>
	<div
		class="card-content flex-1 flex flex-col p-[15px] rounded-[15px] relative z-2
		{enhanced3d ? 'card-content-3d' : ''}
		{onClick ? 'cursor-pointer' : ''}"
	>
		{#if enhanced3d}
			<div
				class="card-shadow absolute inset-0 rounded-[15px] shadow-lg opacity-0 transition-all duration-300 z-1"
			></div>
			<div
				class="card-glow absolute -inset-5 bg-[radial-gradient(circle_at_var(--drop-x)_var(--drop-y),var(--drop-color),transparent_70%)] opacity-0 z-0 pointer-events-none transition-opacity duration-300"
			></div>
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
		--scale: 1;
		background:
			linear-gradient(90deg, var(--main) 0%, var(--main) 60%, var(--main-60) 100%),
			no-repeat right 40% / 40% var(--bg-img);
		font-family: var(--text-f);

		&:hover {
			transform: perspective(1000px) rotateX(var(--rot-x)) rotateY(var(--rot-y)) scale(var(--scale));
			border-color: var(--border-hover);
			animation: card_shimmer 2s infinite;

			.card-content {
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
				scale(var(--scale));
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

	:global(.card:hover .blurb-text) {
		filter: blur(0) !important;
	}
</style>

<script lang="ts">
	import { adjustColorOpacity, handleTiltEffect, resetTiltEffect } from '$lib/utils/animation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	/**
	 * Component props with proper typing
	 */
	export interface CardProps {
		/** Background/border color of the card */
		color?: string;
		/** Margin around the card */
		margin?: string;
		/** Degree of tilt effect on hover */
		tiltDegree?: number;
		/** URL to navigate to when clicked (turns card into a link) */
		href?: string;
		/** Background image URL */
		bgImg?: string;
		/** Delay before fade in animation */
		fadeDelay?: number;
		/** Child content */
		children?: import('svelte').Snippet;
		/** Whether link should open in a new tab */
		external?: boolean;
		/** Click handler function */
		onClick?: (event: Event) => void;
		/** Whether the card is in active state */
		active?: boolean;
		/** Disable fade animation */
		nofade?: boolean;
		/** Additional inline styles */
		style?: string;
		/** Enable enhanced 3D effect */
		enhanced3d?: boolean;
		/** Additional CSS classes */
		classes?: string;
		/** ARIA label for better accessibility */
		ariaLabel?: string;
	}

	let el: HTMLElement | null = null;

	let {
		color = '#ffffff00',
		margin = '0px',
		tiltDegree = 2,
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
		classes = '',
		ariaLabel = ''
	}: CardProps = $props();

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

	function onMouseMove(e: MouseEvent): void {
		if (tiltDegree === 0) return;
		handleTiltEffect(e, el, {
			tiltDegree,
			scale: enhanced3d ? 1.015 : 1.005
		});
	}

	function onMouseLeave(): void {
		resetTiltEffect(el);
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (!href && onClick && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			onClick(e);
		}
		// Handle Escape key to blur focus
		if (e.key === 'Escape' && el) {
			el.blur();
		}
	}

	// Determine correct ARIA role based on props
	const role = href ? undefined : onClick ? 'button' : undefined;
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	{href}
	bind:this={el}
	{role}
	aria-pressed={active ? 'true' : undefined}
	aria-label={ariaLabel || undefined}
	onmousemove={onMouseMove}
	onmouseleave={onMouseLeave}
	class="card inline-flex flex-col border border-solid rounded-[15px] transition-all duration-300 relative
	{enhanced3d ? 'card-enhanced-3d transform-gpu' : ''} 
	{active ? 'border-[var(--border-active)]' : 'border-[var(--main-text-subtle)]'} 
	{classes}"
	{style}
	transition:fade={{ delay: fadeDelay, duration: nofade ? 0 : 300 }}
	onclick={onClick}
	onkeydown={handleKeydown}
	tabindex={onClick || href ? 0 : undefined}
>
	<div
		class="card-content flex-1 flex flex-col p-[15px] rounded-[15px] relative z-2
		{enhanced3d ? 'card-content-3d' : ''}
		{onClick || href ? 'cursor-pointer' : ''}"
	>
		{#if enhanced3d}
			<div
				class="card-shadow absolute inset-0 rounded-[15px] shadow-lg opacity-0 transition-all duration-300 z-1"
				aria-hidden="true"
			></div>
			<div
				class="card-glow absolute -inset-5 bg-[radial-gradient(circle_at_var(--drop-x)_var(--drop-y),var(--drop-color),transparent_70%)] opacity-0 z-0 pointer-events-none transition-opacity duration-300"
				aria-hidden="true"
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

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none !important;

			&:hover {
				transform: none !important;
				animation: none !important;

				.card-content {
					background-image: none !important;
				}
			}
		}

		.card-enhanced-3d {
			&:hover {
				transform: none !important;
				box-shadow: var(--shadow-md) !important;

				.card-shadow {
					opacity: 0 !important;
				}

				.card-glow {
					opacity: 0 !important;
				}
			}
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { handleTiltEffect, adjustColorOpacity, resetTiltEffect } from '$lib/utils/animation';
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

	let el = $state<HTMLElement | null>(null);

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
	}

	// Determine correct ARIA role based on props
	const role = href ? undefined : onClick ? 'button' : undefined;
</script>

{#if href}
	<a
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		class={`card ${enhanced3d ? 'card-enhanced-3d' : ''} ${classes} relative block p-6 rounded-xl border border-solid border-[var(--border-color)] transition-all duration-200 hover:border-[var(--border-hover)] hover:animate-shimmer`}
		style={`${style} --drop-x: 0; --drop-y: 0; --rot-x: 0; --rot-y: 0; --scale: 1;`}
		onmousemove={(e) => handleTiltEffect(e, el, { tiltDegree, scale: enhanced3d ? 1.015 : 1.005 })}
		onmouseleave={() => resetTiltEffect(el)}
		bind:this={el}
		aria-label={ariaLabel}
	>
		<div
			class={`card-content ${enhanced3d ? 'card-content-3d transform-gpu' : ''} relative z-10 transition-all duration-200`}
		>
			{@render children?.()}
		</div>
		{#if enhanced3d}
			<div
				class="card-shadow absolute inset-0 -z-10 opacity-0 transition-all duration-200 bg-black/5 rounded-xl"
			></div>
			<div
				class="card-glow absolute inset-0 -z-20 opacity-0 transition-all duration-200 bg-gradient-to-r from-transparent via-white to-transparent rounded-xl"
			></div>
		{/if}
	</a>
{:else}
	<button
		class={`card ${enhanced3d ? 'card-enhanced-3d' : ''} ${classes} relative block p-6 rounded-xl border border-solid border-[var(--border-color)] transition-all duration-200 hover:border-[var(--border-hover)] hover:animate-shimmer w-full text-left`}
		style={`${style} --drop-x: 0; --drop-y: 0; --rot-x: 0; --rot-y: 0; --scale: 1;`}
		onmousemove={(e) => handleTiltEffect(e, el, { tiltDegree, scale: enhanced3d ? 1.015 : 1.005 })}
		onmouseleave={() => resetTiltEffect(el)}
		onclick={onClick}
		bind:this={el}
		aria-label={ariaLabel}
	>
		<div
			class={`card-content ${enhanced3d ? 'card-content-3d transform-gpu' : ''} relative z-10 transition-all duration-200`}
		>
			{@render children?.()}
		</div>
		{#if enhanced3d}
			<div
				class="card-shadow absolute inset-0 -z-10 opacity-0 transition-all duration-200 bg-black/5 rounded-xl"
			></div>
			<div
				class="card-glow absolute inset-0 -z-20 opacity-0 transition-all duration-200 bg-gradient-to-r from-transparent via-white to-transparent rounded-xl"
			></div>
		{/if}
	</button>
{/if}

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

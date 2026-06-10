<script lang="ts">
	import { adjustColorOpacity } from '$lib/utils/animation';
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
			const bgColor = adjustColorOpacity(color, 0.01);

			el.style.setProperty('--border-color', borderColor);
			el.style.setProperty('--bg-color', bgColor);
			el.style.setProperty('margin', margin);
			el.style.setProperty('--bg-img', bgImg ? `url(${bgImg})` : '');
		}
	});

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
		{onClick || href ? 'cursor-pointer' : ''}"
	>
		{@render children?.()}
	</div>
</svelte:element>

<style lang="scss">
	.card {
		--border-color: transparent;
		--bg-color: transparent;
		--bg-img: url();
		background:
			linear-gradient(90deg, var(--main) 0%, var(--main) 60%, var(--main-60) 100%),
			no-repeat right 40% / 40% var(--bg-img);
		font-family: var(--text-f);

		&:focus-visible {
			outline: 2px solid var(--accent-text);
			outline-offset: 2px;
		}

		&:hover {
			transform: translateY(-2px);
			border-color: var(--border-hover);
			animation: card_shimmer 2s infinite;

			.card-content {
				background-color: var(--bg-color);
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
		box-shadow:
			0 5px 15px rgba(0, 0, 0, 0.05),
			0 15px 40px rgba(0, 0, 0, 0.03);

		&:hover {
			transform: translateY(-3px);
			box-shadow:
				0 15px 30px rgba(0, 0, 0, 0.07),
				0 30px 60px rgba(0, 0, 0, 0.05);
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
			}
		}
	}
</style>

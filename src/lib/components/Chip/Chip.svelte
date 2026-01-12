<script lang="ts">
	import { preloadData } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let el: HTMLElement | undefined = $state();

	/**
	 * Chip component props with improved TypeScript types
	 */
	export interface ChipProps {
		/** Whether the chip is in an active state */
		active?: boolean;
		/** Size of the chip */
		size?: string;
		/** Additional CSS classes */
		classes?: string;
		/** URL to navigate to (makes chip a link) */
		href?: string;
		/** Whether link should open in a new tab */
		newTab?: boolean;
		/** Child content */
		children?: import('svelte').Snippet;
		/** Custom border radius */
		borderRadius?: string;
		/** Hide the border */
		hideBorder?: boolean;
		/** Click handler function */
		onClick?: (e: MouseEvent) => void;
		/** ARIA label for accessibility */
		ariaLabel?: string;
		/** ARIA current state (for navigation) */
		ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
	}

	let {
		active = false,
		size = 'auto',
		classes = '',
		href = '',
		newTab = true,
		children,
		borderRadius,
		hideBorder = false,
		onClick,
		ariaLabel,
		ariaCurrent
	}: ChipProps = $props();

	let className = $derived(
		`row-center py-[5px] px-[15px] m-[2.5px] decoration-none inline-block ${
			hideBorder ? 'border-none' : `border-[1px] border-solid border-[var(--border)]`
		} tracking-wider text-[0.9em] text-[var(--tertiary-text)] duration-[150ms] font-light ${
			borderRadius ? `rounded-[${borderRadius}]` : 'rounded-[20px]'
		} rainbow-hover ${active ? 'border-[var(--border-hover)]' : 'bg-transparent hover:border-[var(--border-hover)]'}
		${onClick || href ? 'cursor-pointer' : ''}
		${classes}`
	);

	onMount(() => {
		if (el) {
			el.style.setProperty('--size', size);
		}

		// Prefetch route data on hover for internal links using SvelteKit's preloadData
		if (href && !newTab && el) {
			const handleMouseEnter = async () => {
				if (href && href.startsWith('/')) {
					try {
						// Construct the full path with base
						const path = href.startsWith(base) ? href : `${base}${href}`;
						// Use SvelteKit's preloadData to prefetch route data
						await preloadData(path);
					} catch (error) {
						// Silently fail if prefetch fails (e.g., route doesn't exist)
						// This prevents console errors for invalid routes
					}
				}
			};

			el.addEventListener('mouseenter', handleMouseEnter);
			return () => {
				el?.removeEventListener('mouseenter', handleMouseEnter);
			};
		}
	});
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={el}
	{href}
	class="chip {className}"
	onclick={onClick}
	target={newTab ? '_blank' : undefined}
	rel={newTab && href ? 'noopener noreferrer' : undefined}
	aria-label={ariaLabel}
	aria-current={ariaCurrent}
	aria-pressed={!href && active ? 'true' : undefined}
	tabindex={onClick || href ? 0 : undefined}
>
	{@render children?.()}
</svelte:element>

<style>
	.chip:focus-visible {
		outline: 2px solid var(--accent-text);
		outline-offset: 2px;
	}
</style>

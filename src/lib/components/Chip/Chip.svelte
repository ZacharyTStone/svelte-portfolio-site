<script lang="ts">
	import { onMount } from 'svelte';
	import { preloadData } from '$app/navigation';
	import { base } from '$app/paths';

	let el: HTMLElement | undefined = $state();

	import { _ } from 'svelte-i18n';
	interface Props {
		active?: boolean;
		size?: string;
		classes?: string;
		href?: string;
		newTab?: boolean;
		children?: import('svelte').Snippet;
		borderRadius?: string;
		hideBorder?: boolean;
		onClick?: (e: MouseEvent) => void;
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
		onClick
	}: Props = $props();

	let className = $derived(
		`row-center  py-[5px] px-[15px] m-[2.5px] decoration-none inline-block ${
			hideBorder ? 'border-none' : `border-[1px] border-solid border-[var(--border)]`
		} tracking-wider text-[0.9em] text-[var(--tertiary-text)] duration-[150ms] font-light ${
			borderRadius ? `rounded-[${borderRadius}]` : 'rounded-[20px]'
		} rainbow-hover  ${active ? '' : 'bg-transparent hover:border-[var(--border-hover)]'}
		${onClick ? 'cursor: pointer;' : ''}
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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={el}
	{href}
	class="chip {className}"
	onclick={onClick}
	target={newTab ? '_blank' : undefined}
>
	{@render children?.()}
</svelte:element>

<style>
	.chip:focus-visible {
		outline: 2px solid var(--accent-text);
		outline-offset: 2px;
	}
</style>

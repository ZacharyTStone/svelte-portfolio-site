<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { onMount } from 'svelte';

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

		// Prefetch route on hover for internal links
		if (href && !newTab && el) {
			const handleMouseEnter = () => {
				if (href && href.startsWith('/')) {
					// Use SvelteKit's prefetch
					const link = el as HTMLAnchorElement;
					if (link && link.href) {
						// Trigger prefetch by creating a temporary link
						const prefetchLink = document.createElement('link');
						prefetchLink.rel = 'prefetch';
						prefetchLink.href = link.href;
						document.head.appendChild(prefetchLink);
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
	class={className}
	onclick={onClick || bubble('click')}
	onkeydown={bubble('keydown')}
	onkeypress={bubble('keypress')}
	onkeyup={bubble('keyup')}
	target={newTab ? '_blank' : undefined}
>
	{@render children?.()}
</svelte:element>

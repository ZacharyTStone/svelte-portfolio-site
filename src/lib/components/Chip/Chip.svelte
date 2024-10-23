<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { onMount } from 'svelte';

	let el: HTMLElement = $state();


	import { _ } from 'svelte-i18n';
	interface Props {
		active?: boolean;
		size?: string;
		classes?: string;
		href?: string;
		newTab?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		active = false,
		size = 'auto',
		classes = '',
		href = '',
		newTab = true,
		children
	}: Props = $props();
	let className = $derived(`row-center cursor-pointer py-[5px] px-[15px] m-[2.5px] decoration-none inline-block border-[1px] border-solid border-[var(--border)] rounded-[20px] tracking-wider text-[0.9em] text-[var(--tertiary-text)] duration-[150ms] font-light rainbow-hover  ${
		active ? '' : 'bg-transparent hover:border-[var(--border-hover)]'
	} ${classes}`);

	onMount(() => {
		el.style.setProperty('--size', size);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={el}
	{href}
	class={className}
	onclick={bubble('click')}
	onkeydown={bubble('keydown')}
	onkeypress={bubble('keypress')}
	onkeyup={bubble('keyup')}
	target={newTab ? '_blank' : undefined}
>
	{@render children?.()}
</svelte:element>

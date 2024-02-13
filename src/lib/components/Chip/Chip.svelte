<script lang="ts">
	import { onMount } from 'svelte';

	let el: HTMLElement;

	export let active = false;
	export let size = 'auto';
	export let classes = '';
	export let href = '';
	export let newTab = true;

	import { _ } from 'svelte-i18n';
	$: className = `row-center cursor-pointer py-[5px] px-[15px] m-[2.5px] decoration-none inline-block border-[1px] border-solid border-[var(--border)] rounded-[20px] tracking-wider text-[0.9em] text-[var(--tertiary-text)] duration-[150ms] font-light rainbow-hover  ${
		active ? '' : 'bg-transparent hover:border-[var(--border-hover)]'
	} ${classes}`;

	onMount(() => {
		el.style.setProperty('--size', size);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={el}
	{href}
	class={className}
	on:click
	on:keydown
	on:keypress
	on:keyup
	target={newTab ? '_blank' : undefined}
>
	<slot />
</svelte:element>

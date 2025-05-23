<script lang="ts">
	interface Props {
		classes?: string;
		children?: import('svelte').Snippet;
	}

	let { classes = '', children }: Props = $props();
</script>

<h1
	class={`pb-2 font-bold text-center sm:text-5xl text-3xl overflow-visible bg-gradient-to-b from-[var(--main-text)] to-[var(--accent-text-hover)] bg-clip-text text-transparent break-words ${classes}`}
>
	{@render children?.()}
</h1>

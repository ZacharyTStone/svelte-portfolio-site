<script lang="ts">
	interface Props {
		classes?: string;
		children?: import('svelte').Snippet;
	}

	let { classes = '', children }: Props = $props();
</script>

<h1
	class={`pb-2 font-bold text-center sm:text-5xl text-3xl overflow-visible ${classes}`}
	style="background: linear-gradient(var(--main-text), var(--accent-text-hover)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; word-wrap: break-word; white-space: normal;"
>
	{@render children?.()}
</h1>

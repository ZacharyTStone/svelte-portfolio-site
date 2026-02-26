<script lang="ts">
	interface Props {
		classes?: string;
		children?: import('svelte').Snippet;
	}

	let { classes = '', children }: Props = $props();
</script>

<h2
	class={`section-title pb-2 font-bold text-center sm:text-5xl text-3xl overflow-visible ${classes}`}
>
	{@render children?.()}
</h2>

<style>
	.section-title {
		background: linear-gradient(var(--main-text), var(--accent-text-hover));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		word-wrap: break-word;
		white-space: normal;
		font-family: var(--title-f);
	}
</style>

<script lang="ts">
	interface Props {
		img?: string;
		useDefaultDimensions?: boolean;
		classes?: string;
		children?: import('svelte').Snippet;
	}

	let { img = '', useDefaultDimensions = true, classes = '', children }: Props = $props();
</script>

<div
	style={`background: linear-gradient(90deg, var(--main) 0%, var(--main) 40%, var(--main-60) 110%), no-repeat 110% 45% / 90% url(${img}); border-block-end: 1px solid var(--border);`}
	class={`flex flex-row w-full items-center ${
		useDefaultDimensions
			? 'min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] px-4 md:px-10'
			: ''
	} ${classes}`}
>
	<div class="px-2 flex flex-col flex-1">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.skill-cover {
		background:
			linear-gradient(90deg, var(--main) 0%, var(--main) 40%, var(--main-60) 110%),
			no-repeat 110% 45% / 90% var(--bg-img);
		border-block-end: 1px solid var(--border);
	}
</style>

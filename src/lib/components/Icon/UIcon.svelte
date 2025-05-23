<!-- Icon.svelte -->
<script lang="ts">
	interface Props {
		icon?: string;
		alt?: string;
		classes?: string;
		tooltip?: string;
		ariaHidden?: boolean;
	}

	let { icon = '', alt = '', classes = '', tooltip = '', ariaHidden = false }: Props = $props();
</script>

{#if tooltip}
	<div class="relative inline-block group">
		<i class={`${icon} ${classes}`} aria-label={alt} aria-hidden={ariaHidden}></i>
		<span
			class="invisible absolute z-10 px-2 py-1 -ml-[60px] mt-[30px] left-1/2 bg-black text-white text-center rounded-md opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300"
		>
			{tooltip}
		</span>
	</div>
{:else}
	<i class={`${icon} ${classes}`} aria-label={alt}></i>
{/if}

<style>
	/* Removed unused CSS selectors */
</style>

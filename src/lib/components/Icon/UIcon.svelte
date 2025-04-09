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
	<div class="tooltip">
		<i class={`${icon} ${classes}`} aria-label={alt} aria-hidden={ariaHidden}></i>
		<span class="tooltiptext">{tooltip}</span>
	</div>
{:else}
	<i class={`${icon} ${classes}`} aria-label={alt}></i>
{/if}

<style>
	.tooltip {
		position: relative;
		display: inline-block;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		background-color: black;
		color: white;
		text-align: center;
		border-radius: 6px;
		padding: 5px;
		position: absolute;
		z-index: 1;
		top: 30px;
		left: 50%;
		margin-left: -60px;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
	}
</style>

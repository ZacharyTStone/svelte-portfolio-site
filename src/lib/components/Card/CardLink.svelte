<script lang="ts">
	import UIcon from '../Icon/UIcon.svelte';

	export let label: string;
	export let to: string;
	export let icon_path: string;

	console.log(icon_path);
</script>

<a
	class="card-link row-center relative m-x-2.5px border-1px border-solid border-[var(--border)] p-5px rounded-10px text-inherit"
	href={to}
	title={label}
	target="_blank"
	rel="noreferrer"
	data-help={label}
>
	{#if icon_path}
		<img src={icon_path} class="w-10 h-10 flex" alt={label} />
	{:else}
		<UIcon icon="i-carbon-link" classes="text-[var(--secondary-text)]" />
	{/if}
</a>

<style lang="scss">
	.card-link {
		&:hover {
			border-color: var(--border-hover);

			&:after {
				content: attr(data-help);
				display: inline-block;
				position: absolute;
				width: max-content;
				background-color: var(--secondary);
				padding: 5px 10px;
				right: 40%;
				top: calc(100% + 5px);
				border: 1px solid var(--border);
				border-radius: 15px;
				z-index: 10;
			}
		}
	}
</style>

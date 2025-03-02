<script lang="ts">
	import { theme } from '$lib/stores/theme';

	import { _ } from 'svelte-i18n';

	interface Props {
		name?: string;
		logo?: string;
		newtab?: boolean;
		inverted?: boolean;
		grayscale?: boolean;
		href?: string | undefined;
		children?: import('svelte').Snippet;
		onClick?: (event: Event) => void;
		tooltipLocation?: 'top' | 'bottom';
	}

	let {
		name = '',
		logo = '',
		newtab = false,
		inverted = false,
		grayscale = true,
		href = undefined,
		children,
		onClick,
		tooltipLocation = 'bottom'
	}: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	class={`
					chip-icon row-center relative text-inherit decoration-none p-10px m-r-5px m-b-5px border-1px border-solid border-[var(--border)] hover:border-[var(--border-hover)] rounded-10px
					${href ? 'cursor: pointer;' : 'cursor-help'}
					${grayscale ? 'grayscale-65 hover:grayscale-0' : ''}
					tooltip-${tooltipLocation}
			`}
	data-help={$_(name)}
	target={href && newtab ? '_blank' : undefined}
	onclick={onClick}
	aria-hidden="true"
>
	{#if children}
		{@render children?.()}
	{:else}
		<img
			class={`
													w-15px h-15px
													${inverted ? 'invert-100' : ''}
													${$theme === 'dark' && inverted ? 'chip-icon-logo-inverted' : ''}
									`}
			src={logo}
			alt={name}
			aria-hidden="true"
		/>
	{/if}
</svelte:element>

<style lang="scss">
	.chip-icon {
		&:hover {
			border-color: var(--border-hover);
			position: relative;

			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: -1;
				border-radius: inherit;
				border: 1px solid transparent;
				animation: shimmer 2s infinite;
			}

			&::before {
				content: attr(data-help);
				display: inline-block;
				position: absolute;
				width: max-content;
				background-color: var(--secondary);
				padding: 5px 10px;
				left: 10px;
				border: 1px solid var(--border);
				border-radius: 15px;
			}
		}

		&.tooltip-bottom:hover::before {
			top: calc(100% + 5px);
			bottom: auto;
		}

		&.tooltip-top:hover::before {
			bottom: calc(100% + 5px);
			top: auto;
		}

		&-logo {
			height: 15px;
			width: 15px;

			&-inverted {
				filter: invert(100);
			}
		}
	}
</style>

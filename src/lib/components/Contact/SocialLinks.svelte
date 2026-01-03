<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { getPlatfromIcon, HOME } from '$lib/params';
	import { _ } from 'svelte-i18n';
	import ChipIcon from '../Chip/ChipIcon.svelte';
	import UIcon from '../Icon/UIcon.svelte';


	interface Props {
		showOnMobile?: boolean;
		showText?: boolean;
	}

	let { showOnMobile = true, showText = true }: Props = $props();

	let onHome = $state($page.url.pathname === '/');

	const { links } = HOME;

	$effect(() => {
		onHome = $page.url.pathname === '/';
	});

	let hoveredIndex = $state(-1);
</script>

<nav
	aria-label="Social links"
	class="fadeInSlow flex justify-center gap-5 2xl:fixed bottom-0 left-0 2xl:right-auto 2xl:left-0 {showOnMobile
		? ''
		: 'hidden sm:flex'}"
>
	<ul class="contact-links">
		{#each links as { platform, link }, index}
			<li
				class="link-item"
				class:hovered={hoveredIndex === index}
				onmouseenter={() => (hoveredIndex = index)}
				onmouseleave={() => (hoveredIndex = -1)}
			>
				<ChipIcon name={platform} href={link} newtab tooltipLocation="top">
					<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
				</ChipIcon>
			</li>
		{/each}
	</ul>
	{#if onHome}
		<div class="fadeSlow">
			<div class="flex flex-row items-center gap-2 cursor: pointer; h-100%">
				<UIcon icon="i-carbon-arrow-left" />
				<span class="text-gradient">{$_('HOME.connect_cta')}</span>
			</div>
		</div>
	{/if}
</nav>

<style>
	.fadeSlow {
		animation: fadeIn 12s ease-in-out forwards;
	}

	.contact-links {
		--arc: 5deg;
		display: flex;
		gap: 1rem;
		list-style: none;
		padding: 0;
		margin: 0;

		@media (hover) and (prefers-reduced-motion: no-preference) {
			&:has(li:nth-child(1):hover) {
				--target: 1;
			}
			&:has(li:nth-child(2):hover) {
				--target: 2;
			}
			&:has(li:nth-child(3):hover) {
				--target: 3;
			}
			&:has(li:nth-child(4):hover) {
				--target: 4;
			}
			&:has(li:nth-child(5):hover) {
				--target: 5;
			}
			&:has(li:nth-child(6):hover) {
				--target: 6;
			}
			&:has(li:nth-child(7):hover) {
				--target: 7;
			}
			&:has(li:nth-child(8):hover) {
				--target: 8;
			}
			&:has(li:nth-child(9):hover) {
				--target: 9;
			}

			& li {
				transform-origin: -200% 50%;
				transition:
					transform 1s cubic-bezier(0.2, 1, 0.8, 1),
					opacity 0.3s ease-out;
			}

			&:hover li:not(:hover) {
				--distance-from-target: abs(var(--sibling-index) - var(--target));
				--distance-multiplier: calc(var(--distance-from-target) * 15%);
				--gradual-fadeout: calc(100% - var(--distance-multiplier));
				opacity: var(--gradual-fadeout);

				--angle: calc((var(--sibling-index) - var(--target)) * var(--arc));
				transform: rotateZ(var(--angle)) translateX(calc(var(--distance-from-target) * -5%));
			}
		}
	}

	.link-item {
		position: relative;
		transition:
			transform 0.5s cubic-bezier(0.2, 1, 0.8, 1),
			opacity 0.3s ease-out;
	}

	.link-item:not(.hovered) {
		opacity: 0.6;
		transform: translateY(0);
	}

	.link-item:hover {
		transform: translateY(-10px);
		opacity: 1;
	}

	.link-item:hover ~ .link-item {
		transform: translateY(10px);
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src?: string;
		alt?: string;
		classes?: string;
		loadingHeight?: string;
		loadingWidth?: string;
		style?: string;
		onClick?: () => void;
		lazy?: boolean;
	}

	let {
		src = '',
		alt = '',
		classes = '',
		loadingHeight = '200px',
		loadingWidth = '100%',
		style = '',
		onClick,
		lazy = true
	}: Props = $props();

	let loaded = $state(false);
	let failed = $state(false);
	let loading = $state(true);
	let element: HTMLElement | null = null;
	let isIntersecting = $state(false);

	onMount(() => {
		if (!lazy) {
			loadImage();
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isIntersecting = true;
						loadImage();
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px'
			}
		);

		if (element) {
			observer.observe(element);
		}

		return () => {
			if (element) {
				observer.unobserve(element);
			}
		};
	});

	function loadImage() {
		const img = new Image();
		img.src = src;
		loading = true;

		img.onload = () => {
			loading = false;
			loaded = true;
		};
		img.onerror = () => {
			loading = false;
			failed = true;
		};
	}
</script>

<div bind:this={element}>
	{#if loaded}
		<img
			{src}
			class={classes}
			{style}
			onclick={onClick}
			onkeydown={(e: KeyboardEvent) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick?.();
				}
			}}
			{alt}
			role={onClick != null ? 'button' : undefined}
			loading={lazy ? 'lazy' : 'eager'}
			decoding="async"
			fetchpriority={lazy ? 'low' : 'high'}
		/>
	{:else if loading}
		<div
			class={classes + ' skeleton'}
			style={`min-height: ${loadingHeight}; min-width: ${loadingWidth}`}
			aria-label="Loading image"
			role="status"
		></div>
	{:else if failed}
		<div
			class={classes + ' skeleton error'}
			style={`min-height: ${loadingHeight}; min-width: ${loadingWidth}`}
			aria-label="Failed to load image"
			role="alert"
		></div>
	{/if}
</div>

<style>
	.skeleton {
		background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
		background-size: 200% 100%;
		border-radius: var(--radius-md);
		animation: shimmer 1.5s infinite;
	}

	.skeleton.error {
		background: linear-gradient(90deg, #fee2e2 25%, #fecaca 50%, #fee2e2 75%);
		border: 2px solid #ef4444;
		animation: none;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	:global([data-theme='dark']) .skeleton {
		background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
		background-size: 200% 100%;
	}

	:global([data-theme='dark']) .skeleton.error {
		background: linear-gradient(90deg, #7f1d1d 25%, #991b1b 50%, #7f1d1d 75%);
		border: 2px solid #dc2626;
	}
</style>

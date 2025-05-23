<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src: string;
		alt: string;
		classes?: string;
		loadingHeight?: string;
		loadingWidth?: string;
		style?: string;
		onClick?: () => void;
		loading?: 'eager' | 'lazy';
	}

	let {
		src,
		alt,
		classes = '',
		loadingHeight = '100%',
		loadingWidth = '100%',
		style = '',
		onClick,
		loading = 'lazy'
	}: Props = $props();

	let isLoaded = $state(false);
	let hasError = $state(false);

	onMount(() => {
		const img = new Image();
		img.src = src;
		isLoaded = true;

		img.onload = () => {
			isLoaded = true;
		};
		img.onerror = () => {
			hasError = true;
			isLoaded = true;
		};
	});
</script>

<img
	{src}
	{alt}
	{loading}
	{style}
	onclick={onClick}
	onkeydown={(e) => e.key === 'Enter' && onClick?.()}
	role={onClick ? 'button' : undefined}
	class={`${classes} ${!isLoaded ? 'bg-gray-200 border-2 border-solid rounded-lg animate-pulse' : ''} ${
		hasError ? 'border-red-500' : 'border-current animate-rainbow'
	}`}
	onload={() => (isLoaded = true)}
	onerror={() => {
		hasError = true;
		isLoaded = true;
	}}
/>

<style>
	.skeleton {
		background: #eee;
		border: 2px solid;
		border-radius: 10px;
		border-color: #ff0000;
		animation:
			pulse 1.5s ease-in-out infinite,
			rainbow-border 3s linear infinite;
	}

	.skeleton.error {
		border-color: #ff0000;
		animation: none;
	}

	@keyframes pulse {
		0% {
			background-color: #eee;
		}
		50% {
			background-color: #ddd;
		}
		100% {
			background-color: #eee;
		}
	}

	@keyframes rainbow-border {
		0% {
			border-color: #ff8080;
		}
		12.5% {
			border-color: #ffc080;
		}
		25% {
			border-color: #ffff80;
		}
		37.5% {
			border-color: #80ff80;
		}
		50% {
			border-color: #8080ff;
		}
		62.5% {
			border-color: #c080ff;
		}
		75% {
			border-color: #ff80ff;
		}
		87.5% {
			border-color: #ff8080;
		}
		100% {
			border-color: #ffc080;
		}
	}
</style>

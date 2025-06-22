<script lang="ts">
	import { onMount } from 'svelte';
	import UIcon from './Icon/UIcon.svelte';

	let showButton = $state(false);

	onMount(() => {
		const handleScroll = () => {
			showButton = window.scrollY > 300;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

{#if showButton}
	<button
		onclick={scrollToTop}
		class="scroll-to-top"
		aria-label="Scroll to top"
		title="Scroll to top"
	>
		<UIcon icon="i-carbon-arrow-up" />
	</button>
{/if}

<style>
	.scroll-to-top {
		position: fixed;
		bottom: var(--space-xl);
		right: var(--space-xl);
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: var(--accent);
		color: var(--accent-text);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow-lg);
		transition: all 0.3s ease;
		z-index: 1000;
		opacity: 0;
		animation: slideIn 0.3s ease forwards;
	}

	.scroll-to-top:hover {
		background: var(--accent-hover);
		transform: translateY(-2px);
		box-shadow: var(--shadow-xl);
	}

	.scroll-to-top:focus {
		outline: 2px solid var(--accent-text);
		outline-offset: 2px;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.scroll-to-top {
			bottom: var(--space-lg);
			right: var(--space-lg);
			width: 45px;
			height: 45px;
		}
	}
</style>

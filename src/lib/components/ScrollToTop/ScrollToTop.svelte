<script lang="ts">
	import { onMount } from 'svelte';
	import UIcon from '../Icon/UIcon.svelte';
	import { theme, ThemeType } from '$lib/stores/theme';

	let isVisible = $state(false);
	let scrollY = $state(0);

	function scrollToTop(): void {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
		// Focus management for accessibility
		const mainContent = document.getElementById('main-content');
		if (mainContent) {
			mainContent.focus();
		}
	}

	function handleScroll(): void {
		scrollY = window.scrollY;
		// Show button after scrolling 300px
		isVisible = scrollY > 300;
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			scrollToTop();
		}
	}

	onMount(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if isVisible}
	<button
		class="scroll-to-top"
		onclick={scrollToTop}
		onkeydown={handleKeydown}
		aria-label="Scroll to top"
		title="Scroll to top (or press Home key)"
	>
		<UIcon icon="i-carbon-arrow-up" classes="text-1.5em" alt="Scroll to top" />
	</button>
{/if}

<style lang="scss">
	.scroll-to-top {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background-color: var(--accent);
		color: var(--accent-text);
		border: 2px solid var(--border);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		box-shadow: var(--shadow-lg);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		transform: translateY(20px) scale(0.8);
		animation: fadeInUp 0.3s ease-out forwards;

		&:hover {
			background-color: var(--accent-hover);
			transform: translateY(-4px) scale(1.05);
			box-shadow: var(--shadow-xl);
			border-color: var(--border-hover);
		}

		&:active {
			transform: translateY(-2px) scale(1);
		}

		&:focus-visible {
			outline: 2px solid var(--accent-text);
			outline-offset: 3px;
		}
	}

	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (max-width: 768px) {
		.scroll-to-top {
			bottom: 1.5rem;
			right: 1.5rem;
			width: 2.5rem;
			height: 2.5rem;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.scroll-to-top {
			transition: none;
			animation: none;
			opacity: 1;
			transform: none;

			&:hover {
				transform: none;
			}
		}
	}
</style>

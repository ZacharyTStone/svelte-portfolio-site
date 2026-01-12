<script lang="ts">
	import { onMount } from 'svelte';

	let progress = $state(0);
	let el: HTMLElement | null = null;

	function updateProgress(): void {
		if (!el) return;

		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrollableHeight = documentHeight - windowHeight;

		if (scrollableHeight <= 0) {
			progress = 0;
			return;
		}

		progress = Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100));
	}

	onMount(() => {
		updateProgress();
		window.addEventListener('scroll', updateProgress, { passive: true });
		window.addEventListener('resize', updateProgress, { passive: true });
		return () => {
			window.removeEventListener('scroll', updateProgress);
			window.removeEventListener('resize', updateProgress);
		};
	});
</script>

<div
	class="reading-progress"
	role="progressbar"
	aria-valuenow={progress}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-label="Reading progress"
>
	<div class="reading-progress-bar" style="width: {progress}%"></div>
</div>

<style lang="scss">
	.reading-progress {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background-color: transparent;
		z-index: 9999;
		pointer-events: none;
	}

	.reading-progress-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--accent-text) 0%, var(--accent) 100%);
		transition: width 0.1s ease-out;
		box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.5);
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.reading-progress-bar {
			transition: none;
		}
	}
</style>

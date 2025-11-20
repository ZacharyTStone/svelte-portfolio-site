<script lang="ts">
	import { prefersReducedMotion } from '$lib/utils/reducedMotion';
	import { toastStore, type Toast } from '$lib/utils/toast';
	import { fly } from 'svelte/transition';
	import UIcon from './Icon/UIcon.svelte';

	let toasts: Toast[] = $state([]);

	$effect(() => {
		const unsubscribe = toastStore.subscribe((value) => {
			toasts = value;
		});
		return unsubscribe;
	});

	function getIcon(type: Toast['type']): string {
		switch (type) {
			case 'success':
				return 'i-carbon-checkmark-filled';
			case 'error':
				return 'i-carbon-error-filled';
			case 'warning':
				return 'i-carbon-warning-filled';
			case 'info':
			default:
				return 'i-carbon-information-filled';
		}
	}

	function getTypeClass(type: Toast['type']): string {
		return `toast-${type}`;
	}
</script>

<div class="toast-container" role="region" aria-live="polite" aria-label="Notifications">
	{#each toasts as toast (toast.id)}
		<div
			class="toast {getTypeClass(toast.type)}"
			role="alert"
			in:fly={{
				x: prefersReducedMotion() ? 0 : 300,
				duration: prefersReducedMotion() ? 0 : 300,
				opacity: 1
			}}
			out:fly={{
				x: prefersReducedMotion() ? 0 : 300,
				duration: prefersReducedMotion() ? 0 : 200,
				opacity: 0
			}}
		>
			<div class="toast-content">
				<UIcon icon={getIcon(toast.type)} classes="toast-icon" />
				<span class="toast-message">{toast.message}</span>
			</div>
			<button
				class="toast-close"
				onclick={() => toastStore.remove(toast.id)}
				aria-label="Close notification"
			>
				<UIcon icon="i-carbon-close" />
			</button>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: var(--space-2xl);
		right: var(--space-xl);
		z-index: 10000;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		max-width: 400px;
		width: 100%;
		pointer-events: none;
	}

	.toast {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-md) var(--space-lg);
		background: var(--main);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		pointer-events: all;
		min-width: 300px;
	}

	.toast-content {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		flex: 1;
	}

	.toast-icon {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
	}

	.toast-message {
		color: var(--main-text);
		font-size: var(--fs-sm);
		line-height: var(--lh-normal);
	}

	.toast-close {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--secondary-text);
		border-radius: var(--radius-sm);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
		flex-shrink: 0;
	}

	.toast-close:hover {
		background: var(--secondary);
		color: var(--main-text);
	}

	.toast-success {
		border-left: 4px solid #10b981;
	}

	.toast-success :global(.toast-icon) {
		color: #10b981;
	}

	.toast-error {
		border-left: 4px solid #ef4444;
	}

	.toast-error :global(.toast-icon) {
		color: #ef4444;
	}

	.toast-warning {
		border-left: 4px solid #f59e0b;
	}

	.toast-warning :global(.toast-icon) {
		color: #f59e0b;
	}

	.toast-info {
		border-left: 4px solid #3b82f6;
	}

	.toast-info :global(.toast-icon) {
		color: #3b82f6;
	}

	@media (max-width: 768px) {
		.toast-container {
			top: var(--space-md);
			right: var(--space-md);
			left: var(--space-md);
			max-width: none;
		}

		.toast {
			min-width: auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.toast-close {
			transition: none;
		}
	}
</style>

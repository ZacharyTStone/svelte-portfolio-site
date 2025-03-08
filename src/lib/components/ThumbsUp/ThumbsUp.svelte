<script lang="ts">
	import { thumbsUpStore } from '$lib/stores/thumbsUpStore';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	// Props
	interface Props {
		projectSlug: string;
		count?: number;
		compact?: boolean;
		classes?: string;
	}

	let { projectSlug, count = 0, compact = false, classes = '' } = $props();

	// State
	let hasLiked = $state(false);
	let likesCount = $state(count);
	let isAnimating = $state(false);
	let isLoading = $state(true);

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		likeToggled: { projectSlug: string; count: number; hasLiked: boolean };
	}>();

	// Load like status and count on mount
	onMount(async () => {
		isLoading = true;
		const serverCount = await thumbsUpStore.loadProjectLikes(projectSlug);
		likesCount = serverCount;
		hasLiked = thumbsUpStore.hasLiked(projectSlug);
		isLoading = false;
	});

	// Handle click on the thumbs up button
	async function handleLikeToggle() {
		if (isAnimating || isLoading) return;

		isAnimating = true;

		// Optimistically update UI
		hasLiked = !hasLiked;
		likesCount = hasLiked ? likesCount + 1 : Math.max(0, likesCount - 1);

		// Update the store
		await thumbsUpStore.toggleLike(projectSlug);

		// Get the actual values after the server update
		likesCount = thumbsUpStore.getLikesCount(projectSlug);
		hasLiked = thumbsUpStore.hasLiked(projectSlug);

		// Dispatch event for parent components
		dispatch('likeToggled', {
			projectSlug,
			count: likesCount,
			hasLiked
		});

		// Reset animation state
		setTimeout(() => {
			isAnimating = false;
		}, 300);
	}
</script>

<button
	class="thumbs-up-btn {classes} {compact ? 'compact' : 'full'} {hasLiked
		? 'active'
		: ''} {isAnimating ? 'animate' : ''} {isLoading ? 'loading' : ''}"
	on:click={handleLikeToggle}
	aria-label={$_('PROJECTS.thumbs_up')}
	disabled={isLoading}
>
	{#if isLoading}
		<div class="loading-spinner"></div>
	{:else}
		<UIcon
			icon="i-carbon-thumbs-up"
			classes="thumbs-icon {hasLiked ? 'text-active' : 'text-default'}"
		/>
		{#if !compact}
			<span class="count">{likesCount}</span>
		{/if}
	{/if}
</button>

<style lang="scss">
	.thumbs-up-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		background: transparent;
		border: 1px solid var(--accent-text);
		color: var(--accent-text);
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 5px 10px;

		&.compact {
			padding: 5px;
			border-radius: 50%;
			width: 32px;
			height: 32px;
			justify-content: center;
		}

		&:hover {
			background: rgba(var(--accent-text-rgb), 0.1);
			transform: scale(1.05);
		}

		&.active {
			background: rgba(var(--accent-text-rgb), 0.15);
		}

		&.animate {
			.thumbs-icon {
				animation: pulse 0.3s ease;
			}
		}

		&.loading {
			cursor: wait;
			opacity: 0.6;
		}

		.thumbs-icon {
			font-size: 1.2em;

			&.text-active {
				color: var(--accent-text);
			}

			&.text-default {
				color: var(--tertiary-text);
			}
		}

		.count {
			font-size: 0.9em;
			font-weight: 500;
		}

		.loading-spinner {
			width: 1em;
			height: 1em;
			border-radius: 50%;
			border: 2px solid var(--tertiary-text);
			border-top-color: var(--accent-text);
			animation: spin 1s linear infinite;
		}
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.3);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

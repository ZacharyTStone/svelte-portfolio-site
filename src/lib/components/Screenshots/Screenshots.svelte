<script lang="ts">
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';
	import Image from '../Image/Image.svelte';

	let { screenshots = [] as { src: string; label?: string }[] } = $props();

	let isModalOpen = $state(false);
	let selectedImage = $state('');
	let selectedLabel = $state('');

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	function openModal(imageSrc: string, label?: string) {
		selectedImage = imageSrc;
		selectedLabel = label || safeT('PROJECTS.screenshot_alt');
		isModalOpen = true;
		// Set focus trap when modal opens
		setTimeout(() => {
			const closeButton = document.querySelector('[data-screenshot-close]');
			if (closeButton instanceof HTMLElement) {
				closeButton.focus();
			}
		}, 50);
	}

	function closeModal() {
		isModalOpen = false;
	}

	// Close modal when clicking outside the image
	function handleModalClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	// Close modal on Escape key press
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
			closeModal();
		}
	}
</script>

<div class="px-10px grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-t-10">
	{#each screenshots as item}
		<div
			class="col-center gap-3 w-99% h-99% rounded-10px cursor-pointer rainbow-hover"
			onclick={() => openModal(item.src, item.label)}
			onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && openModal(item.src, item.label)}
			role="button"
			tabindex="0"
			aria-label={item.label || safeT('PROJECTS.view_larger_screenshot')}
		>
			<Image
				src={item.src}
				alt={item.label || safeT('PROJECTS.screenshot_alt')}
				classes="w-100% h-100% rounded-md"
				loadingHeight="150px"
			/>
			{#if item.label}
				<p class="text-[var(--tertiary-text)] font-300">{item.label}</p>
			{/if}
		</div>
	{/each}
</div>
{#if isModalOpen}
	<!-- Modal backdrop with a11y attributes -->
	<div
		class="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center backdrop-blur-md"
		onclick={handleModalClick}
		onkeydown={handleKeyDown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
	>
		<!-- Hidden title for screen readers -->
		<h2 id="modal-title" class="sr-only">{selectedLabel}</h2>

		<img
			src={selectedImage}
			alt={selectedLabel}
			class="max-w-full max-h-full w-auto h-auto object-cover border border-solid border-gray-300"
			style="max-width: 90vw; max-height: 90vh;"
		/>
		<button
			onclick={closeModal}
			aria-label={safeT('COMMON.close_modal')}
			data-screenshot-close
			tabIndex={0}
			class="absolute top-0 right-0 m-4 text-black text-3xl bg-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			style="width: 50px; height: 50px;">×</button
		>
	</div>
{/if}

<style>
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>

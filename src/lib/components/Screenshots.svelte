<script lang="ts">
	import { onMount } from 'svelte';
	import Image from './Image.svelte';

	export let screenshots = [] as { src: string; label?: string }[];

	let isModalOpen = false;
	let selectedImage = '';

	function openModal(imageSrc: string) {
		selectedImage = imageSrc;
		isModalOpen = true;
		document.body.classList.add('modal-open'); // Lock scroll
	}

	function closeModal() {
		isModalOpen = false;
		document.body.classList.remove('modal-open'); // Unlock scroll
	}

	// モーダルの外側をクリックしたときにモーダルを閉じる
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

	// Lock scroll on modal open
	onMount(() => {
		const body = document.body;
		const originalStyle = body.style.overflow;

		return () => {
			body.style.overflow = originalStyle;
		};
	});
</script>

<div class="px-10px grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-t-10">
	{#each screenshots as item}
		<div
			class="col-center gap-3 w-99% h-99% rounded-10px cursor-pointer rainbow-hover"
			on:click={() => openModal(item.src)}
			on:keydown={() => {}}
			role="button"
			tabindex="0"
		>
			<Image
				src={item.src}
				alt={item.label}
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
	<div
		class="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center backdrop-blur-md"
		on:click={handleModalClick}
		on:keydown={handleKeyDown}
		role="button"
		aria-label="Selected Image"
		tabindex={0}
	>
		<img
			src={selectedImage}
			alt="Selected Image"
			class="max-w-full max-h-full w-auto h-auto object-cover border border-solid border-gray-300"
			style="max-width: 90vw; max-height: 90vh;"
			aria-hidden="true"
		/>
		<button
			on:click={closeModal}
			aria-label="Close Modal"
			tabIndex={0}
			class="absolute top-0 right-0 m-4 text-black text-3xl bg-white p-2 rounded-full"
			style="width: 50px; height: 50px;">X</button
		>
	</div>
{/if}

<style>
	.modal-open {
		overflow: hidden;
	}
</style>

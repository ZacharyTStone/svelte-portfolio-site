<script lang="ts">
	import { getAssetURL } from '$lib/data/assets';
	import type { Project } from '$lib/types';
	import { handleNavigation } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';
	import Card from '../Card/Card.svelte';
	import Image from '../Image/Image.svelte';
	import ThumbsUp from '../ThumbsUp/ThumbsUp.svelte';
	import { thumbsUpStore } from '$lib/stores/thumbsUpStore';
	import { onMount } from 'svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	const imageSrc = getAssetURL(project.logo);

	// Get thumbs up count from store or use default from project
	let likesCount = $state(project.thumbsUpCount || 0);

	onMount(async () => {
		// Load likes from the server via the store
		await thumbsUpStore.loadProjectLikes(project.slug);
		likesCount = thumbsUpStore.getLikesCount(project.slug);
	});

	function handleLikeToggled(event: CustomEvent) {
		// Prevent the click from navigating to the project page
		event.stopPropagation();

		// Update the count from the event
		likesCount = event.detail.count;
	}
</script>

<div
	class="project-container flex flex-col items-center transition duration-300 ease-in-out hover:scale-102 relative"
>
	<Card color={project.color} onClick={(e) => handleNavigation(e, `/projects/${project.slug}`)}>
		<div class="relative">
			<h2
				class="project-title text-main-text m-0 rounded-lg opacity-100 transition duration-300 text-2xl max-w-full min-h-[50px] text-center w-full"
			>
				{$_(project.name)}
			</h2>

			<!-- Thumbs Up Button (Top Right) -->
			<div class="thumbs-up-container absolute top-0 right-0 m-2 z-10" on:click|stopPropagation>
				<ThumbsUp
					projectSlug={project.slug}
					count={likesCount}
					compact={false}
					classes="project-card-thumbs-up"
					on:likeToggled={handleLikeToggled}
				/>
			</div>
		</div>

		<Image
			src={imageSrc}
			alt={$_(project.name)}
			classes="w-full object-cover rounded-xl h-[200px] mt-2"
			loadingHeight="200px"
			loadingWidth="320px"
		/>
	</Card>
</div>

<style lang="scss">
	.thumbs-up-container {
		transform: translateY(-50%);
	}

	.project-card-thumbs-up {
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
		border-width: 2px;
		padding: 6px 12px;
		font-weight: bold;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

		&:hover {
			transform: scale(1.1);
			background-color: rgba(0, 0, 0, 0.7);
		}
	}
</style>

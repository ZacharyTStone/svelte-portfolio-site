<script lang="ts">
	import { getAssetURL } from '$lib/data/assets';
	import type { Project } from '$lib/types';
       import { handleNavigation } from '$lib/utils/navigation';
	import { _ } from 'svelte-i18n';
	import Card from '../Card/Card.svelte';
	import Image from '../Image/Image.svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	const imageSrc = getAssetURL(project.logo);
</script>

<div
	class="project-container group flex flex-col items-center transition-all duration-500 ease-out hover:scale-105"
>
    <Card
    onClick={(e) => handleNavigation(e, `/projects/${project.slug}`)}
		classes="w-full h-full flex flex-col overflow-hidden"
		enhanced3d={true}
	>
		<div class="relative overflow-hidden">
			<Image
				src={imageSrc}
				alt={$_(project.name)}
				classes="w-full object-cover rounded-t-xl h-[220px] transition-transform duration-700 group-hover:scale-110"
				loadingHeight="220px"
				loadingWidth="320px"
			/>
			{#if project.featured}
				<div
					class="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg"
				>
					⭐ Featured
				</div>
			{/if}
		</div>

		<div class="p-4 flex-1 flex flex-col">
			<h2
				class="project-title text-main-text m-0 font-semibold text-xl mb-2 line-clamp-2 group-hover:text-accent-text transition-colors duration-300"
			>
				{$_(project.name)}
			</h2>

			<p class="text-secondary-text text-sm mb-3 line-clamp-2 flex-1">
				{$_(project.shortDescription)}
			</p>

			<div class="flex flex-wrap gap-1 mt-auto items-center">
				{#each (project.project_skills || []).slice(0, 3) as skill}
					<span class="text-xs bg-tertiary text-tertiary-text px-2 py-1 rounded-md">
						{skill.label}
					</span>
				{/each}
				{#if (project.project_skills || []).length > 3}
					<span class="text-xs text-accent-text flex items-center"
						>+{(project.project_skills || []).length - 3} more</span
					>
				{/if}
			</div>
		</div>
	</Card>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.project-container {
		height: 100%;
	}

	.project-container:hover {
		transform: translateY(-4px);
	}
</style>

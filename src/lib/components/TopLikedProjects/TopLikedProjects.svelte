<script lang="ts">
	import { PROJECTS } from '$lib/params';
	import type { Project } from '$lib/types';
	import { thumbsUpStore } from '$lib/stores/thumbsUpStore';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import CardLogo from '$lib/components/Card/CardLogo.svelte';
	import { getAssetURL } from '$lib/data/assets';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';
	import { handleNavigation } from '$lib/utils/helpers';

	interface Props {
		limit?: number;
	}

	let { limit = 3 } = $props<Props>();

	let topProjects: Project[] = $state([]);
	let isLoading = $state(true);

	// Load all project likes and sort by count
	onMount(async () => {
		if (!browser) return;

		isLoading = true;

		// Load all project likes
		await Promise.all(
			PROJECTS.items.map(async (project) => {
				await thumbsUpStore.loadProjectLikes(project.slug);
			})
		);

		// Get all projects with their like counts
		const projectsWithLikes = PROJECTS.items.map((project) => {
			const likesCount = thumbsUpStore.getLikesCount(project.slug);
			return {
				...project,
				thumbsUpCount: likesCount
			};
		});

		// Sort by like count (highest first) and take the top N
		topProjects = projectsWithLikes
			.sort((a, b) => (b.thumbsUpCount || 0) - (a.thumbsUpCount || 0))
			.slice(0, limit);

		isLoading = false;
	});
</script>

<div class="top-liked-projects">
	<h3 class="title">{$_('PROJECTS.top_liked_projects')}</h3>

	{#if isLoading}
		<div class="loading-indicator">
			<div class="spinner"></div>
		</div>
	{:else if topProjects.length === 0}
		<p class="no-projects">{$_('PROJECTS.no_likes_yet')}</p>
	{:else}
		<div class="projects-list" in:fade={{ duration: 300 }}>
			{#each topProjects as project (project.slug)}
				<div
					class="project-item"
					on:click={(e) => handleNavigation(e, `/projects/${project.slug}`)}
					on:keydown={(e) => e.key === 'Enter' && handleNavigation(e, `/projects/${project.slug}`)}
					tabindex="0"
					role="button"
				>
					<div class="project-logo">
						<CardLogo src={getAssetURL(project.logo)} alt={$_(project.name)} size={40} />
					</div>
					<div class="project-info">
						<h4 class="project-name">{$_(project.name)}</h4>
						<div class="likes-count">
							<span class="count">{project.thumbsUpCount || 0}</span>
							<span class="icon">👍</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.top-liked-projects {
		margin: 2rem 0;

		.title {
			font-size: 1.25rem;
			font-weight: 500;
			margin-bottom: 1rem;
			color: var(--accent-text);
		}

		.loading-indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 100px;

			.spinner {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				border: 3px solid rgba(var(--accent-text-rgb), 0.2);
				border-top-color: var(--accent-text);
				animation: spin 1s linear infinite;
			}
		}

		.no-projects {
			text-align: center;
			color: var(--tertiary-text);
			padding: 1rem;
		}

		.projects-list {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;

			.project-item {
				display: flex;
				align-items: center;
				padding: 0.75rem;
				border-radius: 0.5rem;
				background-color: rgba(var(--accent-text-rgb), 0.05);
				transition: all 0.2s ease;
				cursor: pointer;

				&:hover {
					transform: translateX(5px);
					background-color: rgba(var(--accent-text-rgb), 0.1);
				}

				.project-logo {
					margin-right: 1rem;
				}

				.project-info {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.project-name {
						font-size: 1rem;
						font-weight: 500;
						margin: 0;
					}

					.likes-count {
						display: flex;
						align-items: center;
						color: var(--accent-text);

						.count {
							font-weight: 600;
							margin-right: 0.25rem;
						}

						.icon {
							font-size: 1.1rem;
						}
					}
				}
			}
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

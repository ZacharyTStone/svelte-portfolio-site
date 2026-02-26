<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard/ExperienceCard.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import SectionTitle from './SectionTitle.svelte';
	import { EXPERIENCES } from '$lib/params';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';

	const { items, title } = EXPERIENCES;

	let visibleItems = $state(new Set<number>());

	onMount(() => {
		let index = 0;
		const interval = setInterval(() => {
			if (index < items.length) {
				visibleItems = new Set([...visibleItems, index]);
				index++;
			} else {
				clearInterval(interval);
			}
		}, 300);

		return () => clearInterval(interval);
	});
</script>

<section id="experience" class="spa-section">
	<SectionTitle>{$_(title)}</SectionTitle>
	<div class="experience-content">
		<div class="timeline">
			<div class="timeline-line"></div>
			{#each items as job, index (job.slug)}
				{#if visibleItems.has(index)}
					<div
						class="timeline-item {index % 2 === 0 ? 'left' : 'right'}"
						in:fly={{ x: index % 2 === 0 ? -80 : 80, duration: 600 }}
					>
						<div class="timeline-dot">
							<UIcon icon="i-carbon-condition-point" classes="" />
						</div>
						<div class="timeline-card">
							<ExperienceCard experience={job} />
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	.experience-content {
		max-width: 1000px;
		margin: 1.5rem auto 0;
		width: 100%;
	}

	.timeline {
		position: relative;
		padding: 1rem 0;
	}

	.timeline-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--border);
		transform: translateX(-50%);
	}

	.timeline-item {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 1rem;
		position: relative;
	}

	.timeline-item.left {
		flex-direction: row;
	}

	.timeline-item.right {
		flex-direction: row-reverse;
	}

	.timeline-dot {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		background: var(--main);
		padding: 0.5rem;
		border-radius: 50%;
	}

	.timeline-card {
		width: calc(50% - 2rem);
	}

	@media (max-width: 850px) {
		.timeline-line {
			left: 1rem;
		}

		.timeline-item,
		.timeline-item.left,
		.timeline-item.right {
			flex-direction: row;
			padding-left: 2.5rem;
		}

		.timeline-dot {
			left: 1rem;
		}

		.timeline-card {
			width: 100%;
		}
	}
</style>

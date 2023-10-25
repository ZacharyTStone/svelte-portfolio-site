<script lang="ts">
	import { countMonths, getMonthName } from '$lib/utils/helpers';
	import Chip from '../Chip/Chip.svelte';
	import Card from '../Card/Card.svelte';
	import CardTitle from '../Card/CardTitle.svelte';
	import CardLink from '../Card/CardLink.svelte';
	import CardDivider from '../Card/CardDivider.svelte';
	import ChipIcon from '../Chip/ChipIcon.svelte';
	import CardLogo from '../Card/CardLogo.svelte';
	import type { Project } from '$lib/types';
	import Assets, { getAssetURL } from '$lib/data/assets';
	import { base } from '$app/paths';

	export let project: Project;
	import { Icons } from '$lib/utils/index';
</script>

<Card color={project.color} href={`${base}/projects/${project.slug}`}>
	<!-- <CardLogo alt={project.name} src={getAssetURL(project.logo)} size={40} radius={'0'} /> -->
	<div class="m-t-20px row justify-between items-center">
		<CardTitle title={project.name} />
		<div class="row">
			{#each project.links as link}
				<CardLink
					label={link.label ?? ''}
					to={link.to}
					icon_path={link.label == 'Live Demo'
						? Icons.Projects
						: link.label == 'YouTube'
						? Icons.Youtube
						: link.label == 'GitHub'
						? Icons.GitHub
						: ''}
					icon_color={'var(--accent-text)'}
				/>
			{/each}
		</div>
	</div>
	<CardDivider />
	<div
		class="row m-b-15px justify-between text-[var(--secondary-text)] text-0.9em font-italic font-300"
	>
		<p>{project.type}</p>
	</div>
	<p class="text-[0.95em] text-[var(--secondary-text)] font-300 m-t-20px m-b-40px flex-1">
		{project.shortDescription}
	</p>
	<CardDivider />
	<div class="row justify-between items-center">
		<div class="row">
			{#each project.skills as tech}
				<ChipIcon
					logo={getAssetURL(tech.logo)}
					name={tech.name}
					href={`${base}/skills/${tech.slug}`}
				/>
			{/each}
		</div>
		{#if project.featured_reason}
			<span class="text-[0.95em] text-[var(--secondary-text)] font-300">
				{project.featured_reason}
			</span>
		{/if}
	</div>
</Card>

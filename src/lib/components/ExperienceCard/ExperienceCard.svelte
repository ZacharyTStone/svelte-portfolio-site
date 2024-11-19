<script lang="ts">
	import { getAssetURL } from '$lib/data/assets';
	import type { Experience } from '$lib/types';
	import { calculateExperiencePeriod, handleNavigation } from '$lib/utils/helpers';
	import { _, locale } from 'svelte-i18n';
	import Card from '../Card/Card.svelte';
	import CardLogo from '../Card/CardLogo.svelte';
	import CardTitle from '../Card/CardTitle.svelte';
	import ChipIcon from '../Chip/ChipIcon.svelte';
	import UIcon from '../Icon/UIcon.svelte';

	interface Props {
		experience: Experience;
	}

	let { experience }: Props = $props();

	let { period, startYear, endYear } = $derived(
		calculateExperiencePeriod(
			experience?.period?.from,
			experience?.period?.to ?? new Date(),
			$locale ?? 'en'
		)
	);
</script>

<Card
	margin="0px 0px 20px 0px"
	tiltDegree={2}
	onClick={(e) => handleNavigation(e, `/experience/${experience.slug}`)}
>
	<div class="col md:flex-row items-start gap-5 md:gap-1">
		<CardLogo src={getAssetURL(experience.logo)} alt={experience.company} size={75} />
		<div class="col ml-0 md:ml-[20px] gap-3 w-full">
			<h3
				class="flex text-[0.9em] flex-col items-start sm:flex-row sm:items-center justify-between sm:gap-5 md:flex-col md:items-start md:gap-0 lg:flex-row lg:items-center"
			>
				<CardTitle title={experience.name} />
			</h3>
			<div class="row flex-wrap m-b-2 gap-1 text-0.9em font-300">
				<ChipIcon name="Company: {$_(experience.company)}">
					<UIcon icon="i-carbon-building" />
				</ChipIcon>
				<ChipIcon name="Location: {$_(experience.location)}">
					<UIcon icon="i-carbon-location" />
				</ChipIcon>
				<ChipIcon name="Contract: {$_(experience.contract)}">
					<UIcon icon="i-carbon-hourglass" />
				</ChipIcon>
			</div>
			<div class="text-[var(--accent-text)] text-[1em] font-400">{period}</div>
			<div class="text-[var(--accent-text)] text-[0.8em] font-200">
				({startYear} - {endYear})
			</div>
			<div class="flex flex-row flex-wrap mt-5">
				{#each experience.skills as skill}
					<ChipIcon
						logo={getAssetURL(skill.logo)}
						name={$_(skill.name)}
						onClick={(e) => handleNavigation(e, `/skills/${skill.slug}`)}
					/>
				{/each}
			</div>
		</div>
	</div>
</Card>

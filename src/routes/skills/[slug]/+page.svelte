<script lang="ts">
	import CardDivider from '$lib/components/Card/CardDivider.svelte';
	import CardLogo from '$lib/components/Card/CardLogo.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import MY_EXPERIENCES from '$lib/experiences.params';
	import MY_PROJECTS from '$lib/projects.params';

	import { base } from '$app/paths';
	import type { Skill } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';
	import { SKILLS } from '$lib/params';

	import TabTitle from '$lib/components/TabTitle.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import Banner from '$lib/components/Banner/Banner.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import { _ } from 'svelte-i18n';
	import Image from '$lib/components/Image.svelte';

	type Related = {
		display: string;
		name: string;
		img: string;
		type: 'projects' | 'experience';
		url: string;
	};

	export let data: { skill?: Skill };

	const { title } = SKILLS;

	const screenshots = data.skill?.screenshots ?? [];

	let isModalOpen = false; // モーダルの状態を管理する変数
	let selectedImage = ''; // 選択された画像のURLを保持する変数

	function openModal(imageSrc: string) {
		selectedImage = imageSrc;
		isModalOpen = true;
		document.body.classList.add('modal-open'); // スクロールをロックする
	}

	function closeModal() {
		isModalOpen = false;
		document.body.classList.remove('modal-open'); // スクロールロックを解除する
	}

	// モーダルの外側をクリックしたときにモーダルを閉じる
	function handleModalClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}
	const getRelatedProjects = (): Array<Related> => {
		const out: Array<Related> = [];

		const skill = data.skill;

		if (!skill) {
			return [];
		}

		MY_PROJECTS.forEach((item) => {
			if (item.skills.some((tech) => tech.slug === skill.slug)) {
				out.push({
					img: getAssetURL(item.logo),
					display: item.name,
					name: item.name,
					type: 'projects',
					url: `/projects/${item.slug}`
				});
			}
		});
		MY_EXPERIENCES.forEach((item) => {
			if (item.skills.some((tech) => tech.slug === skill.slug)) {
				out.push({
					img: getAssetURL(item.logo),
					display: item.name,
					name: item.name,
					type: 'experience',
					url: `/experience/${item.slug}`
				});
			}
		});

		return out;
	};

	$: computedTitle = data.skill ? `${$_(data.skill.name)} - ${$_(title)}` : `${$_(title)}`;

	$: related = data.skill ? getRelatedProjects() : [];
</script>

<TabTitle title={computedTitle} />

<div class="pb-10 overflow-x-hidden col flex-1">
	{#if data.skill === undefined}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)]">
			<UIcon icon="i-carbon-software-resource-cluster" classes="text-3.5em" />
			<p class="font-300">Could not load skill data.</p>
		</div>
	{:else}
		<div class="flex flex-col items-center overflow-x-hidden">
			<Banner img={getAssetURL(data.skill.logo)}>
				<MainTitle>{$_(data.skill.name)}</MainTitle>
			</Banner>
			<div class="p-5 md:p-0 flex flex-col items-center overflow-x-hidden">
				<div class="pt-3 pb-1 overflow-x-hidden w-full">
					<div class="px-10px m-y-5">
						{#if data.skill.description}
							{$_(data.skill.description)}
						{:else}
							<div class="p-5 col-center gap-3 m-y-auto text-[var(--border)]">
								<UIcon icon="i-carbon-text-font" classes="text-3.5em" />
								<p class="font-300">No description</p>
							</div>
						{/if}
					</div>
					<div class="px-10px m-y-5">
						{#if data?.skill?.extraInfo?.length}
							{#each data.skill.extraInfo as any}
								<div
									class="flex flex-row gap-1 flex-wrap mb-5 items-center
							"
								>
									<span class="text-[var(--accent-text)] text-[1.1em] font-500">
										{$_(any.title)}
									</span>
									<div
										class="px-10px
								 flex flex-row gap-3 flex-wrap align-center
								"
									>
										{#each any.content as info}
											{#if any.title === 'Frameworks'}
												<ChipIcon
													logo={getAssetURL(info.icon)}
													name={info.label}
													href={info.link}
												/>
											{:else}
												<a class="font-300" href={info.link}>
													<span class="text-[var(--accent-text)]">{info.label},{' '}</span>
												</a>
											{/if}
										{/each}
									</div>
								</div>
							{/each}
						{/if}
						{#if data?.skill?.certifications?.length}
							<div class="flex flex-row gap-1 self-s flex-wrap mb-5 items-center">
								<span class="text-[var(--accent-text)] text-[1.1em] font-500">
									{$_('EXTRA_INFO_LABELS.certifications')}
								</span>
								<div class="px-10px flex flex-row gap-3 flex-wrap align-center">
									<ul class="list-disc list-inside">
										{#each data.skill.certifications as info}
											<div class="font-300">
												<li class="text-[var(--accent-text)]">
													{@html info.link
														? `<a href="${info.link}" class="text-blue-500 hover:underline" target="_blank">${info.label}</a>`
														: info.label}
												</li>
											</div>
										{/each}
									</ul>
								</div>
							</div>
						{/if}
						{#if data?.skill?.courses?.length}
							<div class="flex flex-row gap-1 flex-wrap mb-5 items-center">
								<span class="text-[var(--accent-text)] text-[1.1em] font-500">
									{$_('EXTRA_INFO_LABELS.courses')}
								</span>
								<div class="px-10px flex flex-row gap-3 flex-wrap align-center">
									<ul class="list-disc list-inside">
										{#each data.skill.courses as info}
											<div class="font-300">
												<li class="text-[var(--accent-text)]">
													{@html info.link
														? `<a href="${info.link}" class="text-blue-500 hover:underline" target="_blank">${info.label}</a>`
														: info.label}
												</li>
											</div>
										{/each}
									</ul>
								</div>
							</div>
						{/if}
					</div>
				</div>
				<div class=" mb-2">
					<CardDivider />
				</div>

				<div class="flex flex-row gap-1 flex-wrap">
					<div class="px-10px">
						{#each related as item}
							<Chip
								classes="inline-flex flex-row items-center justify-center"
								href={`${base}${item.url}`}
								newTab={false}
							>
								<CardLogo
									src={item.img}
									alt={$_(item.name)}
									radius={'0px'}
									size={15}
									classes="mr-2"
								/>
								<span class="text-[0.9em]">{$_(item.display)}</span>
							</Chip>
						{/each}
					</div>
				</div>
				{#if screenshots.length > 0}
					<div
						class="px-10px grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-t-10"
					>
						{#each screenshots as item}
							<div
								class="col-center gap-3 w-99% h-99% rounded-10px cursor-pointer rainbow-hover"
								on:click={() => openModal(item.src)}
								on:keydown={() => {}}
								role="button"
								tabindex="0"
							>
								<Image src={item.src} alt={item.label} classes=" w-100% h-100%" />
								{#if item.label}
									<p class="text-[var(--tertiary-text)] font-300">{item.label}</p>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

{#if isModalOpen}
	<div
		class="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center backdrop-blur-md"
		on:click={handleModalClick}
		on:keydown={() => {}}
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

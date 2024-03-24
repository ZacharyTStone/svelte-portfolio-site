<script lang="ts">
	import { onMount } from 'svelte';
	import { loadFull } from 'tsparticles';
	import { writable } from 'svelte/store';
	import Carrousel from '$lib/components/Carrousel/Carrousel.svelte';
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import { HOME, TITLE_SUFFIX, getPlatfromIcon } from '$lib/params';
	import MY_SKILLS from '$lib/skills.params';
	import { useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { getAssetURL } from '$lib/data/assets';
	import Computer from '$lib/assets/images/computer.svg';
	import { quintInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	// Particles

	let particlesInit = async (main: any) => {
		await loadFull(main);
	};

	let particlesLoaded = (container: any) => {
		console.log(container);
	};

	let Particles: any = null;

	let particlesConfig: any = {
		detectRetina: false,
		fpsLimit: 60,
		interactivity: {
			detectsOn: 'canvas',
			events: {
				onClick: {
					enable: false,
					mode: 'push'
				},
				onDiv: {
					elementId: 'repulse-div',
					enable: false,
					mode: 'repulse'
				},
				onHover: {
					enable: true,
					mode: 'bubble',
					parallax: {
						enable: false,
						force: 2,
						smooth: 10
					}
				},
				resize: true
			},
			modes: {
				bubble: {
					distance: 40,
					duration: 2,
					opacity: 8,
					size: 6,
					speed: 3
				},
				connect: {
					distance: 80,
					lineLinked: { opacity: 0.5 },
					radius: 60
				},
				grab: {
					distance: 400,
					lineLinked: { opacity: 1 }
				},
				push: { quantity: 4 },
				remove: { quantity: 2 },
				repulse: {
					distance: 200,
					duration: 0.4
				},
				slow: {
					active: false,
					radius: 0,
					factor: 1
				}
			}
		},
		particles: {
			color: { value: '#ffffff' },
			lineLinked: {
				blink: false,
				color: '#ffffff',
				consent: false,
				distance: 30,
				enable: true,
				opacity: 0.4,
				width: 1
			},
			move: {
				attract: {
					enable: false,
					rotate: {
						x: 600,
						y: 1200
					}
				},
				bounce: false,
				direction: 'none',
				enable: true,
				outMode: 'bounce',
				random: false,
				speed: 0.5,
				straight: false
			},
			number: {
				density: {
					enable: false,
					area: 2000
				},
				limit: 0,
				value: 200
			},
			opacity: {
				animation: {
					enable: true,
					minimumValue: 0.05,
					speed: 2,
					sync: false
				},
				random: false,
				value: 0.4
			},
			shape: {
				character: {
					fill: false,
					font: 'Verdana',
					style: '',
					value: '*',
					weight: '400'
				},

				polygon: { sides: 5 },
				stroke: {
					color: '#000000',
					width: 0
				},
				type: 'circle'
			},
			size: {
				animation: {
					enable: false,
					minimumValue: 0.1,
					speed: 40,
					sync: false
				},
				random: true,
				value: 3
			}
		},
		polygon: {
			draw: {
				enable: true,
				stroke: {
					color: '#ffffff',
					width: 0.5,
					opacity: 0.35
				}
			},
			enable: true,
			move: {
				radius: 10
			},
			inlineArrangement: 'equidistant',
			scale: 1,
			type: 'inline',

			polygons: {
				enable: true,
				scale: 0.5,
				type: 'inline',
				move: {
					radius: 10
				},
				url: Computer,
				inlineArrangement: 'equidistant',
				draw: {
					enable: true,
					stroke: {
						color: 'red',
						width: 0.5,
						opacity: 0.35
					}
				}
			},
			data: {
				size: {
					width: 515.9,
					height: 728.5
				}
			}
		},
		retina_detect: false
	};

	let { description, lastName, links, name, title, skills } = HOME;

	// Set page title
	onMount(() => {
		document.title = useTitle(title, TITLE_SUFFIX);
		const interval = setInterval(cycleSkills, 10000); // Cycle every 10 seconds
		return () => clearInterval(interval);
	});

	onMount(async () => {
		// @ts-ignore
		const module = await import('svelte-particles');
		Particles = module.default;
	});

	// Store to hold the index of the currently displayed skill
	const currentIndex = writable(0);

	// Function to cycle through skills
	function cycleSkills() {
		currentIndex.update((value) => (value + 1) % MY_SKILLS.length);
	}
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<div
	class="col self-center flex-1 md:flex-row md:self-stretch justify-center lg:justify-between items-center p-0 gap-10"
>
	<div class="md:flex-1 flex flex-col items-center md:items-start gap-5 fadeIn">
		<MainTitle classes="text-center md:text-left mb-5 md:mb-3">{$_(name)} {$_(lastName)},</MainTitle
		>
		<p
			class="text-[var(--tertiary-text)] text-center md:text-left text-lg md:text-xl font-extralight leading-relaxed max-w-prose mb-5 md:mb-3"
		>
			{$_(description)}
		</p>
		<div
			class="hidden md:fixed bottom-0 left-0 lg:right-auto lg:left-0 flex justify-center gap-5 pb-15 px-15"
		>
			{#each links as { platform, link }}
				<ChipIcon name={platform} href={link} newtab>
					<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
				</ChipIcon>
			{/each}
		</div>
	</div>
	<div class="fadeIn block md:hidden">
		<Carrousel items={skills ?? MY_SKILLS} />
	</div>
	<div class="fixed bottom--10 right--20 z-10 fade-in hidden md:block">
		{#if MY_SKILLS.length > 0}
			{#key currentIndex}
				<a href={`${base}/skills/${MY_SKILLS[$currentIndex].slug}`} rel="noreferrer">
					<img
						src={getAssetURL(MY_SKILLS[$currentIndex].logo)}
						alt="Skill Logo"
						class="opacity-20 w-100 h-100 aspect-square md:w-200 md:h-200 skill-logo"
						style="object-fit: contain;"
						transition:fade={{ duration: 5000, delay: 0, easing: quintInOut }}
					/>
				</a>
			{/key}
		{/if}
	</div>
	{#if Particles}
		<div id="tsparticles" class="tsparticles-container">
			<Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={particlesConfig}
			/>
		</div>
	{/if}
</div>

<style>
	.skill-logo {
		opacity: 0.2; /* Start with 0.2 opacity */
	}
	:global(body) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	:global(#tsparticles) {
		margin: 0;
		padding: 0;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 0;
	}
</style>

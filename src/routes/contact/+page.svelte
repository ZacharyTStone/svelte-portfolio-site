<script lang="ts">
	import ContactForm from '$lib/components/Contact/ContactForm.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import { HOME } from '$lib/params';
	import { getPlatfromIcon } from '$lib/params';
	import Icon from '$lib/components/Icon/Icon.svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const { links } = HOME;
</script>

<svelte:head>
	<title>{$_('NAVBAR.contact')}</title>
	<meta name="description" content={$_('CONTACT.meta_description')} />
</svelte:head>

<CommonPage title={$_('NAVBAR.contact')}>
	<div class="max-w-full mx-auto relative">
		<main class="text-left flex flex-col gap-6 md:gap-8 lg:gap-12 md:flex-row items-stretch">
			{#if mounted}
				<div class="flex-1 flex flex-col gap-6">
					<div in:fade={{ duration: 300 }}>
						<ContactForm />
					</div>
				</div>

				<div class="hidden md:block w-px my-12 bg-border"></div>

				<div class="flex-1 flex flex-col gap-6">
					<div class="contact-info" in:fade={{ duration: 300, delay: 200 }}>
						<Card classes="w-full">
							<h2 class="text-xl font-semibold mb-4 md:text-2xl">
								{$_('CONTACT.connect_title')}
							</h2>
							<p class="text-base mb-5">
								{$_('CONTACT.connect_description')}
							</p>

							<div class="social-links">
								{#each links as { platform, link }}
									<a href={link} target="_blank" rel="noopener noreferrer" class="social-link">
										<Icon
											icon={getPlatfromIcon(platform)}
											color={'var(--accent-text)'}
											size={'24px'}
										/>
										<span>{platform}</span>
									</a>
								{/each}
							</div>
						</Card>
					</div>
				</div>
			{/if}
		</main>
	</div>
</CommonPage>

<style lang="scss">
	.social-links {
		display: flex;
		flex-direction: column;
		gap: 15px;
		margin-top: 10px;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 10px 15px;
		border-radius: 10px;
		text-decoration: none;
		color: var(--tertiary-text);
		background-color: var(--main);
		border: 1px solid var(--border);
		transition: all 0.2s ease;

		&:hover {
			background-color: var(--main-hover);
			border-color: var(--border-hover);
			transform: translateX(5px);
		}
	}

	@media (max-width: 768px) {
		.social-links {
			flex-direction: column;
		}
	}
</style>

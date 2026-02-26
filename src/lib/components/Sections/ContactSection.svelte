<script lang="ts">
	import ContactForm from '$lib/components/Contact/ContactForm.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import SectionTitle from './SectionTitle.svelte';
	import { HOME, getPlatfromIcon } from '$lib/params';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const { links } = HOME;
</script>

<section id="contact" class="spa-section">
	<SectionTitle>{$_('NAVBAR.contact')}</SectionTitle>
	{#if mounted}
		<div class="contact-content">
			<div class="contact-grid">
				<div class="contact-form-col" in:fade={{ duration: 300 }}>
					<ContactForm />
				</div>
				<div class="contact-info-col" in:fade={{ duration: 300, delay: 200 }}>
					<Card classes="w-full">
						<h3 class="text-xl font-semibold mb-4 md:text-2xl">
							{$_('CONTACT.connect_title')}
						</h3>
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
		</div>
	{/if}
</section>

<style lang="scss">
	.contact-content {
		max-width: 1000px;
		margin: 0 auto;
		width: 100%;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 1.5rem;
		align-items: start;
	}

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
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

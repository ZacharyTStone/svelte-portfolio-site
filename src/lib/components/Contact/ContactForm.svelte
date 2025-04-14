<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import Input from '$lib/components/Input/Input.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Helper function to get translation with type safety
	function getTranslation(key: string): string {
		const translation = $_(key);
		// Ensure we always return a string
		return typeof translation === 'string' ? translation : JSON.stringify(translation);
	}

	// EmailJS configuration
	const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'fXa9IjIQ6OlkvNdYd';
	const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_u3xqm96';
	const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_7msqeur';
	const RECAPTCHA_SITE_KEY =
		import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6Lc2xworAAAAAIzw1FWeX8s0ek0Na4RegAyExzug';

	// Form state
	let name = '';
	let email = '';
	let message = '';
	let isSubmitting = false;
	let isSuccess = false;
	let error = '';
	let honeypot = ''; // Anti-spam honeypot field
	let recaptchaToken = '';
	let recaptchaReady = false;
	let mounted = false;

	// Set up success message timer handling
	let successTimer: ReturnType<typeof setTimeout> | null = null;

	function resetSuccessMessageAfterDelay() {
		// Clear any existing timer
		if (successTimer) {
			clearTimeout(successTimer);
		}

		// Set a new timer
		successTimer = setTimeout(() => {
			isSuccess = false;
			successTimer = null;
		}, 5000);
	}

	// Watch for success state changes
	$: if (isSuccess) resetSuccessMessageAfterDelay();

	// Clean up on component destruction
	onMount(() => {
		mounted = true;

		// Load EmailJS SDK
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
		script.async = true;
		script.onload = () => {
			window.emailjs.init(EMAILJS_PUBLIC_KEY);
		};
		document.head.appendChild(script);

		// Load reCAPTCHA
		const recaptchaScript = document.createElement('script');
		recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
		recaptchaScript.async = true;
		recaptchaScript.defer = true;
		recaptchaScript.onload = () => {
			recaptchaReady = true;
			window.grecaptcha.ready(() => {
				console.log('reCAPTCHA is ready');
			});
		};

		document.head.appendChild(recaptchaScript);

		return () => {
			if (successTimer) clearTimeout(successTimer);
		};
	});

	// Email validation regex
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// Form validation
	function validateForm() {
		if (!name.trim()) {
			error = getTranslation('CONTACT.name_required');
			return false;
		}

		if (!email.trim()) {
			error = getTranslation('CONTACT.email_required');
			return false;
		}

		if (!emailRegex.test(email)) {
			error = getTranslation('CONTACT.email_invalid');
			return false;
		}

		if (!message.trim()) {
			error = getTranslation('CONTACT.message_required');
			return false;
		}

		error = '';
		return true;
	}

	// Execute reCAPTCHA verification
	async function executeRecaptcha(): Promise<string> {
		if (!window.grecaptcha || !recaptchaReady) {
			console.error('reCAPTCHA not loaded yet');
			return '';
		}

		try {
			const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
			console.log('reCAPTCHA token obtained:', token ? 'yes' : 'no');
			return token;
		} catch (err) {
			console.error('reCAPTCHA error:', err);
			return '';
		}
	}

	// Handle form submission
	async function handleSubmit() {
		// Reset states
		error = '';
		isSubmitting = true;

		// Check honeypot (if filled, it's likely a bot)
		if (honeypot) {
			// Simulate success but don't actually submit
			setTimeout(() => {
				isSubmitting = false;
				isSuccess = true;
			}, 1000);
			return;
		}

		// Validate form
		if (!validateForm()) {
			isSubmitting = false;
			return;
		}

		try {
			// Get reCAPTCHA token
			recaptchaToken = await executeRecaptcha();

			if (!recaptchaToken) {
				error = getTranslation('CONTACT.recaptcha_error');
				isSubmitting = false;
				return;
			}

			// Verify reCAPTCHA token with server
			const verifyResponse = await fetch('/api/verify-recaptcha', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token: recaptchaToken })
			});

			const verifyResult = await verifyResponse.json();

			if (!verifyResult.success) {
				console.error('reCAPTCHA verification failed:', verifyResult);
				error = getTranslation('CONTACT.recaptcha_verification_failed');
				isSubmitting = false;
				return;
			}

			// Use EmailJS to send email
			const templateParams = {
				name,
				email,
				message,
				to_name: 'Zach Stone',
				from_name: name,
				reply_to: email,
				'g-recaptcha-response': recaptchaToken,
				time: new Date().toLocaleString(),
				year: new Date().getFullYear().toString()
			};

			const response = await window.emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				templateParams
			);

			console.log('Email sent successfully:', response.status);

			// Reset form on success
			name = '';
			email = '';
			message = '';
			isSuccess = true;
		} catch (err) {
			console.error('Form submission error:', err);
			error = getTranslation('CONTACT.submission_error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

{#if mounted}
	<div class="contact-form" in:fade={{ duration: 300 }}>
		<Card classes={'w-full'} tiltDegree={0}>
			<h2 class="text-xl font-semibold mb-4 md:text-2xl">
				{getTranslation('CONTACT.title')}
			</h2>

			{#if isSuccess}
				<div class="success-message" in:fade={{ duration: 300 }}>
					<UIcon icon="i-carbon-checkmark-filled" classes="text-2em" />
					<p>{getTranslation('CONTACT.success_message')}</p>
				</div>
			{:else}
				<form on:submit|preventDefault={handleSubmit} class="contact-form-fields">
					{#if error}
						<div class="error-message" in:fade={{ duration: 200 }}>
							<UIcon icon="i-carbon-warning-filled" classes="text-1.5em" />
							<p>{error}</p>
						</div>
					{/if}

					<div class="form-group">
						<label for="name">{getTranslation('CONTACT.name')}</label>
						<input
							id="name"
							bind:value={name}
							placeholder={getTranslation('CONTACT.name_placeholder')}
							class="text-[inherit] bg-transparent border-[1px] border-solid border-[var(--border)] px-[20px] py-[10px] rounded-[15px] flex-1 text-[1.15em] w-full"
						/>
					</div>

					<div class="form-group">
						<label for="email">{getTranslation('CONTACT.email')}</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder={getTranslation('CONTACT.email_placeholder')}
							class="text-[inherit] bg-transparent border-[1px] border-solid border-[var(--border)] px-[20px] py-[10px] rounded-[15px] flex-1 text-[1.15em] w-full"
						/>
					</div>

					<div class="form-group">
						<label for="message">{getTranslation('CONTACT.message')}</label>
						<textarea
							id="message"
							bind:value={message}
							placeholder={getTranslation('CONTACT.message_placeholder')}
							rows="5"
							aria-label={getTranslation('CONTACT.message')}
							class="text-[inherit] bg-transparent border-[1px] border-solid border-[var(--border)] px-[20px] py-[10px] rounded-[15px] flex-1 text-[1.15em] w-full max-w-[100%] resize-vertical"
						></textarea>
					</div>

					<!-- Honeypot field (hidden from users, catches bots) -->
					<div class="honeypot">
						<input type="text" bind:value={honeypot} tabindex="-1" autocomplete="off" />
					</div>

					<div class="recaptcha-notice">
						This site is protected by reCAPTCHA and the Google
						<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
							>Privacy Policy</a
						>
						and
						<a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer"
							>Terms of Service</a
						> apply.
					</div>

					<button type="submit" class="submit-button" disabled={isSubmitting}>
						{#if isSubmitting}
							<span class="loading-spinner"></span>
							{getTranslation('CONTACT.submitting')}
						{:else}
							{getTranslation('CONTACT.submit')}
						{/if}
					</button>
				</form>
			{/if}
		</Card>
	</div>
{/if}

<style lang="scss">
	.contact-form {
		width: 100%;
	}

	.contact-form-fields {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;

		label {
			font-weight: var(--fw-medium);
			color: var(--tertiary-text);
			font-size: 0.95em;
		}

		:global(input) {
			box-sizing: border-box;
			max-width: 100%;
			width: 100%;

			&:focus {
				box-shadow: none;
			}
		}
	}

	textarea {
		font-family: var(--text-f);
		box-sizing: border-box;
		max-width: 100%;
		width: 100%;

		&:focus {
			outline: 1px solid var(--border-hover);
			background-color: var(--main-hover);
			box-shadow: none;
		}
	}

	.submit-button {
		background-color: var(--tertiary);
		color: var(--main-text);
		border: 1px solid var(--border);
		border-radius: 15px;
		padding: 12px 20px;
		font-size: 1em;
		font-weight: var(--fw-medium);
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-top: 10px;

		&:hover {
			background-color: var(--tertiary-hover);
			border-color: var(--border-hover);
			transform: translateY(-2px);
		}

		&:active {
			transform: translateY(0);
		}

		&:disabled {
			opacity: 0.7;
			cursor: not-allowed;
		}
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 15px;
		background-color: rgba(220, 38, 38, 0.1);
		border: 1px solid rgba(220, 38, 38, 0.3);
		border-radius: 10px;
		color: rgb(185, 28, 28);
		font-size: 0.9em;
	}

	.success-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 15px;
		padding: 30px;
		color: var(--tertiary-text);
		font-size: 1.1em;

		:global(i) {
			color: var(--tertiary-text);
		}
	}

	.recaptcha-notice {
		font-size: 0.8em;
		color: var(--tertiary-text);
		text-align: center;
		margin-top: -10px;

		a {
			color: var(--accent-text);
			text-decoration: underline;
		}
	}

	.loading-spinner {
		width: 20px;
		height: 20px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: var(--main-text);
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Hide honeypot field visually but keep it accessible to screen readers */
	.honeypot {
		position: absolute;
		left: -9999px;
		opacity: 0;
		pointer-events: none;
	}
</style>

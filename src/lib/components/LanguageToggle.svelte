<!-- src/lib/components/LanguageToggle.svelte -->
<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { browser } from '$app/environment';

	const supportedLocales = [
		{ code: 'en', name: 'English' },
		{ code: 'ja', name: '日本語' }
	];

	function changeLocale(newLocale: string) {
		locale.set(newLocale);

		// Save preference to localStorage for persistence
		if (browser) {
			try {
				localStorage.setItem('userLanguage', newLocale);
			} catch (e) {
				// localStorage save failed, continue without saving
			}
		}
	}
</script>

<div class="language-toggle">
	{#each supportedLocales as { code, name }}
		<button
			class="language-button"
			class:active={$locale === code}
			on:click={() => changeLocale(code)}
			aria-label={`Switch to ${name}`}
		>
			{name}
		</button>
	{/each}
</div>

<style>
	.language-toggle {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.language-button {
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		font-size: 0.9rem;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.language-button:hover {
		color: var(--accent);
		background-color: var(--accent-alpha);
	}

	.language-button.active {
		color: var(--accent);
		font-weight: bold;
	}
</style>

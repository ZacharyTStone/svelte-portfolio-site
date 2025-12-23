import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';
import { isLoading } from '$lib/i18n';
import type { LayoutLoad } from './$types';

// Load analytics synchronously to ensure accurate tracking
// Vercel Analytics is lightweight and non-blocking, so performance impact is minimal
inject({ mode: dev ? 'development' : 'production' });

export const load: LayoutLoad = async () => {
	if (browser) {
		// Check if there's a stored language preference in localStorage
		try {
			const storedLanguage = localStorage.getItem('userLanguage');
			if (storedLanguage) {
				locale.set(storedLanguage);
			}
		} catch (e) {
			console.warn('Unable to access localStorage');
		}
	}

	// Wait for locale to be loaded to prevent stuttering
	await waitLocale();

	// Mark loading as complete
	isLoading.set(false);

	return {};
};

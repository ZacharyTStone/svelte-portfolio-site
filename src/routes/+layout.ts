import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { isLoading } from '$lib/i18n';
import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	if (browser) {
		// Check if there's a stored language preference in localStorage
		try {
			const storedLanguage = localStorage.getItem('userLanguage');
			if (storedLanguage) {
				locale.set(storedLanguage);
			}
		} catch (e) {
			// localStorage access failed, continue with default
		}
	}

	// Wait for locale to be loaded to prevent stuttering
	await waitLocale();

	// Mark loading as complete
	isLoading.set(false);

	return {};
};

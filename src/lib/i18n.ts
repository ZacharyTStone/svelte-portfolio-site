// src/lib/i18n/index.ts
import { browser } from '$app/environment';
import { init, register, locale } from 'svelte-i18n';
import { derived, writable } from 'svelte/store';

const defaultLocale = 'en';
const supportedLocales = ['en', 'ja'];

// Register all locales
register('ja', () => import('./locales/ja.json'));
register('en', () => import('./locales/en.json'));

// Create a loading state store to prevent stuttering
export const isLoading = writable(true);

// Function to detect the user's preferred language
function detectUserLanguage() {
	if (!browser) return defaultLocale;

	// Try to get stored preference first
	try {
		const storedLanguage = localStorage.getItem('userLanguage');
		if (storedLanguage && supportedLocales.includes(storedLanguage)) {
			return storedLanguage;
		}
	} catch (e) {
		console.warn('Unable to access localStorage');
	}

	// Get browser language (e.g., 'en-US' or 'ja')
	const browserLanguage = window.navigator.language.split('-')[0];

	// Check if the language is supported, otherwise use default
	return supportedLocales.includes(browserLanguage) ? browserLanguage : defaultLocale;
}

// Initialize i18n with proper configuration
init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? detectUserLanguage() : defaultLocale
});

// If in the browser, update localStorage when locale changes
if (browser) {
	// Set the initial detected locale
	const detectedLocale = detectUserLanguage();
	locale.set(detectedLocale);

	// Subscribe to locale changes to update localStorage
	locale.subscribe((currentLocale) => {
		if (currentLocale) {
			try {
				localStorage.setItem('userLanguage', currentLocale);
			} catch (e) {
				console.warn('Unable to save language preference to localStorage');
			}
		}

		// Mark loading as complete after locale is set
		isLoading.set(false);
	});
}

// Create a derived store for easy access to translated content
export const t = derived(locale, () => (key: string) => {
	// Implementation would depend on how svelte-i18n handles translations
	// This is a simple placeholder
	return key;
});

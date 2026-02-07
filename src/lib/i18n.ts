// src/lib/i18n/index.ts
import { browser } from '$app/environment';
import { init, register, locale } from 'svelte-i18n';
import { derived, writable, type Readable } from 'svelte/store';

/**
 * Configuration for internationalization
 */
const CONFIG = {
	defaultLocale: 'en',
	supportedLocales: ['en', 'ja'] as const,
	storageKey: 'userLanguage'
} as const;

// Define a type for supported locales
export type SupportedLocale = (typeof CONFIG.supportedLocales)[number];

// Register all locales
register('ja', () => import('./locales/ja.json'));
register('en', () => import('./locales/en.json'));

// Create a loading state store to prevent stuttering
export const isLoading = writable(true);

// Track if locale has been fully initialized
export const localeReady = writable(false);

/**
 * Hides the initial loader overlay and reveals the page content
 * This is called after locale detection and translations are loaded
 */
export function hideInitialLoader(): void {
	if (!browser) return;

	// Call the global function defined in app.html
	if (typeof window !== 'undefined' && typeof (window as Window & { __hideInitialLoader?: () => void }).__hideInitialLoader === 'function') {
		(window as Window & { __hideInitialLoader?: () => void }).__hideInitialLoader?.();
	}

	localeReady.set(true);
}

/**
 * Detects the user's preferred language based on stored preferences and browser settings
 * @returns The detected locale or default locale if no supported locale is found
 */
function detectUserLanguage(): SupportedLocale {
	if (!browser) return CONFIG.defaultLocale;

	// Try to get stored preference first
	try {
		const storedLanguage = localStorage.getItem(CONFIG.storageKey);
		if (storedLanguage && CONFIG.supportedLocales.includes(storedLanguage as SupportedLocale)) {
			return storedLanguage as SupportedLocale;
		}
	} catch (e) {
		console.warn('Unable to access localStorage:', e instanceof Error ? e.message : String(e));
	}

	// Get browser language (e.g., 'en-US' or 'ja')
	const browserLanguage = window.navigator.language.split('-')[0];

	// Check if the language is supported, otherwise use default
	return CONFIG.supportedLocales.includes(browserLanguage as SupportedLocale)
		? (browserLanguage as SupportedLocale)
		: CONFIG.defaultLocale;
}

/**
 * Safely updates the user's language preference in localStorage
 * @param language The language to save
 */
function saveLanguagePreference(language: string): void {
	if (!browser) return;

	try {
		localStorage.setItem(CONFIG.storageKey, language);
	} catch (e) {
		console.warn(
			'Unable to save language preference to localStorage:',
			e instanceof Error ? e.message : String(e)
		);
	}
}

// Initialize i18n with proper configuration
init({
	fallbackLocale: CONFIG.defaultLocale,
	initialLocale: browser ? detectUserLanguage() : CONFIG.defaultLocale
});

// If in the browser, update localStorage when locale changes
if (browser) {
	// Set the initial detected locale
	const detectedLocale = detectUserLanguage();
	locale.set(detectedLocale);

	// Subscribe to locale changes to update localStorage
	locale.subscribe((currentLocale) => {
		if (currentLocale) {
			saveLanguagePreference(currentLocale);
		}

		// Mark loading as complete after locale is set
		isLoading.set(false);
	});
}

/**
 * Helper function for translations
 * Creates a derived store for easy access to translated content
 */
export const t: Readable<(key: string) => string> = derived(locale, () => (key: string) => key);

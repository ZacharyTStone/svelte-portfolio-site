import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { locale } from 'svelte-i18n';

interface ThemeStore extends Writable<string> {}

const STORAGE_KEY = 'zach-stone-portfolio-theme';

const updateLocalStorage = (value: string): void => {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, value);
	}
};

// Check system preference for dark mode
const prefersDarkMode: boolean =
	browser && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const theme: ThemeStore = writable('light');

export const toggleTheme = (newThemeChoice: 'light' | 'dark'): void => {
	theme.update((newValue) => {
		console.log('newThemeChoice', newThemeChoice);
		newValue = newThemeChoice;

		updateLocalStorage(newThemeChoice);

		if (browser) {
			const rootElement = document.querySelector(':root');
			rootElement?.setAttribute('data-theme', newValue);
		}

		return newValue;
	});
};

export const onHydrated = (): void => {
	let preferredTheme = localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null;

	if (preferredTheme === null) {
		// If nothing is in local storage, use system preference
		preferredTheme = prefersDarkMode.toString() ? 'dark' : 'light';
	}

	toggleTheme(preferredTheme);
};

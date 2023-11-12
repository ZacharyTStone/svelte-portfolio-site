import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { locale } from 'svelte-i18n';

interface ThemeStore extends Writable<boolean> {}

const STORAGE_KEY = 'zach-stone-portfolio-theme';

const updateLocalStorage = (value: boolean | string): void => {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	}
};

// Check system preference for dark mode
const prefersDarkMode: boolean =
	browser && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const theme: ThemeStore = writable(false);

export const toggleTheme = (): void => {
	theme.update((currentValue) => {
		const newValue = !currentValue;
		updateLocalStorage(newValue);

		if (browser) {
			const rootElement = document.querySelector(':root');
			rootElement?.setAttribute('data-theme', newValue ? 'dark' : 'light');
		}

		return newValue;
	});
};

export const onHydrated = (): void => {
	let preferredTheme = localStorage.getItem(STORAGE_KEY);

	if (preferredTheme === null) {
		// If nothing is in local storage, use system preference
		preferredTheme = prefersDarkMode.toString();
	}

	toggleTheme();
};

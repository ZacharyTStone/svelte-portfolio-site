import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

// Define theme type for better type safety
export enum ThemeType {
	LIGHT = 'light',
	DARK = 'dark'
}

// Define constants and utility functions
const STORAGE_KEY = 'zach-stone-portfolio-theme';
const prefersDarkMode = (): boolean =>
	browser && window.matchMedia('(prefers-color-scheme: dark)').matches;
const updateLocalStorage = (value: ThemeType): void => {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, value);
	}
};

// Define the theme store with proper typing
export const theme: Writable<ThemeType> = writable<ThemeType>(ThemeType.LIGHT);

// Define functions to manage theme
export const toggleTheme = (newTheme: ThemeType): void => {
	theme.set(newTheme);
	updateLocalStorage(newTheme);
	if (browser) {
		const rootElement = document.querySelector(':root');
		rootElement?.setAttribute('data-theme', newTheme);
	}
};

export const onHydrated = (): void => {
	const storedTheme = localStorage.getItem(STORAGE_KEY) as ThemeType | null;
	const preferredTheme = storedTheme ?? (prefersDarkMode() ? ThemeType.DARK : ThemeType.LIGHT);
	toggleTheme(preferredTheme);
};

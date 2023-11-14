import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

// Define constants and utility functions
const STORAGE_KEY = 'zach-stone-portfolio-theme';
const prefersDarkMode = () => browser && window.matchMedia('(prefers-color-scheme: dark)').matches;
const updateLocalStorage = (value: string) => browser && localStorage.setItem(STORAGE_KEY, value);

// Define the theme store
interface ThemeStore extends Writable<string> {}
export const theme: ThemeStore = writable('light');

// Define functions to manage theme
export const toggleTheme = (newTheme: 'light' | 'dark') => {
	theme.set(newTheme);
	updateLocalStorage(newTheme);
	if (browser) {
		const rootElement = document.querySelector(':root');
		rootElement?.setAttribute('data-theme', newTheme);
	}
};

export const onHydrated = () => {
	const storedTheme = localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null;
	const preferredTheme = storedTheme ?? (prefersDarkMode() ? 'dark' : 'light');
	toggleTheme(preferredTheme);
};

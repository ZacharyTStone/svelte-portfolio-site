import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Define theme type for better type safety
export enum ThemeType {
	DARK = 'dark',
	LIGHT = 'light'
}

// Define constants and utility functions
const STORAGE_KEY = 'zach-stone-portfolio-theme';
const prefersDarkMode = (): boolean =>
	browser && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Initialize theme store
const getInitialTheme = (): ThemeType => {
	if (!browser) return ThemeType.LIGHT;

	const storedTheme = localStorage.getItem(STORAGE_KEY);
	if (storedTheme === ThemeType.DARK || storedTheme === ThemeType.LIGHT) {
		return storedTheme;
	}

	return prefersDarkMode() ? ThemeType.DARK : ThemeType.LIGHT;
};

export const theme = writable<ThemeType>(getInitialTheme());

// Toggle theme function
export const toggleTheme = (newTheme: ThemeType) => {
	theme.set(newTheme);
};

// Update theme in DOM and localStorage
theme.subscribe((value) => {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, value);
		document.documentElement.setAttribute('data-theme', value);
		if (value === ThemeType.DARK) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
});

// Function to call after hydration
export const onHydrated = () => {
	if (browser) {
		const currentTheme = getInitialTheme();
		theme.set(currentTheme);
	}
};

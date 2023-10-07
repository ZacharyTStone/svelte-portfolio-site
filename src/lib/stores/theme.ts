import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const STORAGE_KEY = 'zach-stone-portfolio-theme';

const updateLocalStorage = (value: boolean | string) => {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	}
};

export const theme = writable(false);

export const toggleTheme = (value: any) => {
	theme.update((currentValue) => {
		const newValue = typeof value === 'boolean' ? value : !currentValue;
		updateLocalStorage(newValue);

		const rootElement = document.querySelector(':root');
		rootElement?.setAttribute('data-theme', newValue ? 'dark' : 'light');

		return newValue;
	});
};

export const onHydrated = () => {
	let perferedTheme = localStorage.getItem(STORAGE_KEY);

	if (!perferedTheme) {
		// default to light theme
		perferedTheme = 'false';
	}

	toggleTheme(JSON.parse(perferedTheme));
};

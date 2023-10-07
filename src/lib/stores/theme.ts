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
	const storedValue = localStorage.getItem(STORAGE_KEY);

	if (!storedValue) {
		const prefersDarkMode =
			window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		toggleTheme(prefersDarkMode);
	} else {
		toggleTheme(JSON.parse(storedValue));
	}
};

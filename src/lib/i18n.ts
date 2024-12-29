// src/lib/i18n/index.ts
import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'en';

register('ja', () => import('./locales/ja.json'));
register('en', () => import('./locales/en.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: defaultLocale
});

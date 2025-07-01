import { goto } from '$app/navigation';
import { base } from '$app/paths';

export const countMonths = (from: Date, to: Date = new Date()): number => {
	const fromYear = from.getFullYear();
	const toYear = to.getFullYear();
	const fromMonth = from.getMonth();
	const toMonth = to.getMonth();

	if (toYear === fromYear) {
		return toMonth - fromMonth + 1;
	}

	const yearDiff = toYear - fromYear;
	const monthsInFirstYear = 12 - fromMonth;
	const monthsInLastYear = toMonth + 1;
	const monthsInBetween = (yearDiff - 1) * 12;

	return monthsInFirstYear + monthsInBetween + monthsInLastYear;
};

export const onHover = (ev: MouseEvent, el: HTMLElement, tiltDegree: number = 10): void => {
	if (!el || !ev) return;

	const target = ev.currentTarget as HTMLElement;
	if (!target) return;

	const rect = target.getBoundingClientRect();
	const { clientX, clientY } = ev;
	const { left, top, width, height } = rect;

	// Set drop shadow position
	el.style.setProperty('--drop-x', `${clientX - left}px`);
	el.style.setProperty('--drop-y', `${clientY - top}px`);

	// Calculate center points
	const centerX = rect.x + width / 2;
	const centerY = rect.y + height / 2;

	// Calculate rotation
	const rotateX = ((-1 * tiltDegree * (clientY - centerY)) / (height / 2)).toFixed(2);
	const rotateY = ((tiltDegree * (clientX - centerX)) / (width / 2)).toFixed(2);

	// Apply rotation
	el.style.setProperty('--rot-x', `${rotateX}deg`);
	el.style.setProperty('--rot-y', `${rotateY}deg`);
};

/**
 * Changes the opacity of a hex color
 * @param color The hex color to change opacity of
 * @param opacity The opacity to set (0-1 or 0-100)
 * @returns rgba color string
 */
export const changeColorOpacity = (color: string, opacity: number): string => {
	if (typeof color !== 'string' || !color.startsWith('#')) {
		throw new Error('Invalid color format: must be a hex color string starting with #');
	}

	if (![4, 7, 9].includes(color.length)) {
		throw new Error('Invalid hex color format: must be #RGB, #RRGGBB, or #RRGGBBAA');
	}

	let r: number, g: number, b: number;

	try {
		if (color.length === 4) {
			// #RGB format
			r = parseInt(color[1] + color[1], 16);
			g = parseInt(color[2] + color[2], 16);
			b = parseInt(color[3] + color[3], 16);
		} else {
			// #RRGGBB or #RRGGBBAA format
			r = parseInt(color.substring(1, 3), 16);
			g = parseInt(color.substring(3, 5), 16);
			b = parseInt(color.substring(5, 7), 16);
		}
	} catch {
		throw new Error('Failed to parse hex color values');
	}

	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		throw new Error('Invalid hex color: contains non-hex characters');
	}

	// Normalize opacity to 0-1 range
	const normalizedOpacity = Math.max(0, Math.min(1, opacity > 1 ? opacity / 100 : opacity));

	return `rgba(${r}, ${g}, ${b}, ${normalizedOpacity})`;
};

const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
] as const;

export const getMonthName = (index: number): string => {
	if (index < 0 || index >= MONTH_NAMES.length) {
		throw new Error(`Invalid month index: ${index}`);
	}
	return MONTH_NAMES[index];
};

export const useImage = (url: string, base: string): string => `${base}${url}`;

export const useTitle = (title: string, suffix: string): string => `${title} | ${suffix}`;

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isEmail = (email: string): boolean => EMAIL_REGEX.test(email ?? '');

// Aliases and extended helpers for backward compatibility
export const countMonthsBetween = countMonths;

export const getMonthNameLocalized = (index: number, locale: string = 'en-US'): string => {
	const date = new Date();
	date.setMonth(index);
	return date.toLocaleString(locale, { month: 'long' });
};

export const formatPageTitle = useTitle;
export const isValidEmail = isEmail;

export interface FormattedExperiencePeriod extends ExperiencePeriod {
	formattedPeriod: string;
}

export function formatExperiencePeriod(
	fromDate: Date,
	toDate: Date | null = null,
	language: string = 'en'
): FormattedExperiencePeriod {
	const periodData = calculateExperiencePeriod(fromDate, toDate ?? new Date(), language);
	return { ...periodData, formattedPeriod: periodData.period };
}

// Define the colors as a readonly array for type safety
export const RANDOM_COLORS = [
	'#FFC0CB',
	'#FFB6C1',
	'#FF69B4',
	'#FF1493',
	'#DB7093',
	'#C71585',
	'#FFA07A',
	'#FA8072',
	'#E9967A',
	'#F08080',
	'#CD5C5C',
	'#DC143C',
	'#B22222',
	'#8B0000',
	'#FF0000',
	'#FF4500',
	'#FF8C00',
	'#FFA500',
	'#FFD700',
	'#FFFF00',
	'#ADFF2F',
	'#7FFF00',
	'#7CFC00',
	'#00FF00',
	'#32CD32',
	'#00FA9A',
	'#00FF7F',
	'#90EE90',
	'#98FB98',
	'#00FF00'
] as const;

/**
 * Generates a random hex color from the predefined RANDOM_COLORS array
 * @returns A randomly selected hex color string
 */
export const generateRandomHexColor = (): string => {
	return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
};

/**
 * Calculate experience period between two dates
 * @param fromDate Start date of the experience
 * @param toDate End date of the experience (defaults to current date)
 * @param language Language code for localization
 * @returns Object containing period information
 */
export interface ExperiencePeriod {
	startYear: number;
	endYear: number;
	months: number;
	years: number;
	remainingMonths: number;
	period: string;
}

export function calculateExperiencePeriod(
	fromDate: Date,
	toDate: Date = new Date(),
	language: string = 'en'
): ExperiencePeriod {
	const startYear = fromDate.getFullYear();
	const endYear = toDate.getFullYear();
	const months = countMonths(fromDate, toDate);
	const years = Math.floor(months / 12);
	const remainingMonths = months % 12 === 0 && years === 0 ? 1 : months % 12;

	const isJapanese = language.slice(0, 2) === 'ja';
	const period = isJapanese
		? `${years > 0 ? `${years}年間` : ''}${remainingMonths > 0 ? `${remainingMonths}ヶ月` : ''}`
		: `${years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''} ${
				years > 0 && remainingMonths > 0 ? 'and ' : ''
			}${remainingMonths > 0 ? `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;

	return {
		startYear,
		endYear,
		months,
		years,
		remainingMonths,
		period: period.trim()
	};
}

export async function handleNavigation(
	event: Event,
	to: string,
	offPlatform = false
): Promise<void> {
	event.preventDefault();

	if (offPlatform) {
		window.open(to, '_blank', 'noopener,noreferrer');
		return;
	}

	try {
		await goto(`${base}${to}`);
	} catch (error) {
		console.error('Navigation error:', error);
		window.location.href = `${base}${to}`;
	}
}

/**
 * Creates a debounced function that delays invoking the provided function until after wait milliseconds have elapsed since the last time it was invoked.
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the provided function
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: number;
	return function (...args: Parameters<T>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

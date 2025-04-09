import { goto } from '$app/navigation';
import { base } from '$app/paths';

export const countMonths = (from: Date, to: Date = new Date()): number => {
	let firstYear = 0;
	let wholeYears = 0;
	let newYear = 0;

	if (to.getFullYear() !== from.getFullYear()) {
		newYear = to.getMonth();
		wholeYears = (to.getFullYear() - from.getFullYear() - 1) * 12;
		firstYear = 12 - from.getMonth();
	} else {
		firstYear = to.getMonth() - from.getMonth();
	}

	return firstYear + wholeYears + newYear + 1;
};

export const onHover = (ev: MouseEvent, el: HTMLElement, tiltDegree: number = 10): void => {
	if (!el || !ev) {
		return;
	}

	const target = ev.currentTarget as HTMLElement;
	if (!target) {
		return;
	}

	const rect = target.getBoundingClientRect();

	const x = ev.clientX - rect.left;
	const y = ev.clientY - rect.top;

	el.style.setProperty('--drop-x', `${x}px`);
	el.style.setProperty('--drop-y', `${y}px`);

	const width = el.offsetWidth;
	const height = el.offsetHeight;

	const cX = rect.x + width / 2;
	const cY = rect.y + height / 2;

	const mX = ev.clientX - cX;
	const mY = ev.clientY - cY;

	const rY = ((tiltDegree * mX) / (width / 2)).toFixed(2);
	const rX = ((-1 * (tiltDegree * mY)) / (height / 2)).toFixed(2);

	el.style.setProperty('--rot-x', `${rX}deg`);
	el.style.setProperty('--rot-y', `${rY}deg`);
};

/**
 * Changes the opacity of a hex color
 * @param color The hex color to change opacity of
 * @param opacity The opacity to set (0-1 or 0-100)
 * @returns rgba color string
 */
export const changeColorOpacity = (color: string, opacity: number): string => {
	let r: number, g: number, b: number;

	// Validate input
	if (typeof color !== 'string' || !color.startsWith('#')) {
		throw new Error('Invalid color format: must be a hex color string starting with #');
	}

	if (color.length !== 4 && color.length !== 7 && color.length !== 9) {
		throw new Error('Invalid hex color format: must be #RGB, #RRGGBB, or #RRGGBBAA');
	}

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
	} catch (error) {
		throw new Error('Failed to parse hex color values');
	}

	// Validate parsed RGB values
	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		throw new Error('Invalid hex color: contains non-hex characters');
	}

	// Convert opacity to 0-1 range if it is not already
	if (opacity > 1) opacity = opacity / 100;

	// Clamp opacity between 0 and 1
	opacity = Math.max(0, Math.min(1, opacity));

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getMonthName = (index: number): string => {
	const monthNames = [
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
	];

	return monthNames[index];
};

export const useImage = (url: string, base: string): string => `${base}${url}`;

export const useTitle = (title: string, suffix: string) => `${title} | ${suffix}`;

export const isEmail = (email: string): boolean => {
	const reg =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return reg.test(email ?? '');
};

// Define the colors as a readonly array for type safety
export const RANDOM_COLORS: readonly string[] = [
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
	if (RANDOM_COLORS.length === 0) {
		return '#000000'; // Fallback color if array is empty
	}

	const randomIndex = Math.floor(Math.random() * RANDOM_COLORS.length);
	return RANDOM_COLORS[randomIndex];
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
	const endYear = toDate ? toDate.getFullYear() : new Date().getFullYear();
	const months = countMonths(fromDate, toDate);
	const years = Math.floor(months / 12);
	// show 1 month if the period is less than 1 year and less than 1 month
	const remainingMonths = months % 12 || (years === 0 ? 1 : 0);

	let period: string;

	if (language.slice(0, 2) === 'ja') {
		period = `${years > 0 ? `${years}年間` : ''}${
			remainingMonths > 0 ? `${remainingMonths}ヶ月` : ''
		}`;
	} else {
		period = `${years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''} ${
			years > 0 && remainingMonths > 0 ? 'and ' : ''
		}${remainingMonths > 0 ? `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
	}

	return {
		startYear,
		endYear,
		months,
		years,
		remainingMonths,
		period
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
		// Optional: implement fallback navigation or error display
		window.location.href = `${base}${to}`;
	}
}

/**
 * Utility functions for formatting dates, strings, and other data
 */

/**
 * Count months between two dates
 */
export const countMonthsBetween = (from: Date, to: Date = new Date()): number => {
	const yearDiff = to.getFullYear() - from.getFullYear();
	const monthDiff = to.getMonth() - from.getMonth();

	return yearDiff * 12 + monthDiff + 1; // +1 to include current month
};

/**
 * Get formatted month name
 */
export const getMonthName = (index: number, locale: string = 'en-US'): string => {
	const date = new Date();
	date.setMonth(index);

	return date.toLocaleString(locale, { month: 'long' });
};

/**
 * Create a page title with suffix
 */
export const formatPageTitle = (title: string, suffix: string): string => `${title} | ${suffix}`;

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
	const emailPattern =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailPattern.test(email || '');
};

/**
 * Calculate and format experience period
 */
export const formatExperiencePeriod = (
	fromDate: Date,
	toDate: Date | null = null,
	language: string = 'en'
): {
	startYear: number;
	endYear: number;
	months: number;
	years: number;
	remainingMonths: number;
	formattedPeriod: string;
} => {
	const endDate = toDate || new Date();
	const startYear = fromDate.getFullYear();
	const endYear = endDate.getFullYear();
	const months = countMonthsBetween(fromDate, endDate);
	const years = Math.floor(months / 12);
	const remainingMonths = months % 12 || (years === 0 ? 1 : 0);

	let formattedPeriod: string;

	if (language.slice(0, 2) === 'ja') {
		formattedPeriod = `${years > 0 ? `${years}年間` : ''}${
			remainingMonths > 0 ? `${remainingMonths}ヶ月` : ''
		}`;
	} else {
		formattedPeriod = `${years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''}${
			years > 0 && remainingMonths > 0 ? ' and ' : ''
		}${remainingMonths > 0 ? `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
	}

	return {
		startYear,
		endYear,
		months,
		years,
		remainingMonths,
		formattedPeriod
	};
};

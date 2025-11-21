import { dev } from '$app/environment';

/**
 * Logger utility that only logs in development mode
 */
export const logger = {
	log: (...args: unknown[]) => {
		if (dev) {
			console.log(...args);
		}
	},
	warn: (...args: unknown[]) => {
		if (dev) {
			console.warn(...args);
		}
	},
	error: (...args: unknown[]) => {
		// Always log errors, even in production
		console.error(...args);
	}
};


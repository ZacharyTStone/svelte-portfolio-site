/**
 * Utility functions for handling navigation
 */
import { goto } from '$app/navigation';
import { base } from '$app/paths';

/**
 * Handle internal or external navigation
 * @param event - The click event
 * @param to - The target path
 * @param external - Whether the link is external
 */
export async function navigate(event: Event, to: string, external: boolean = false): Promise<void> {
	event.preventDefault();

	if (external) {
		window.open(to, '_blank', 'noopener,noreferrer');
	} else {
		try {
			// Prefix with base path if not already included
			const path = to.startsWith(base) ? to : `${base}${to}`;
			await goto(path);
		} catch (error) {
			console.error('Navigation error:', error);
		}
	}
}

/**
 * Create a relative URL with the base path
 */
export const getRelativeUrl = (path: string): string => {
	return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Create a full URL for assets
 */
export const getAssetUrl = (path: string): string => {
	return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Validates project slugs to ensure they match expected format
 * Only allows alphanumeric characters, hyphens, and underscores with a reasonable length limit
 */
export function validateProjectSlug(slug: string | null | undefined): boolean {
	if (!slug) return false;
	// Only alphanumeric, hyphens, and underscores
	return /^[a-zA-Z0-9-_]+$/.test(slug) && slug.length > 0 && slug.length < 50;
}

/**
 * Validates Redis keys to ensure they're within the allowed namespace
 * This prevents arbitrary key access
 */
export function validateKeyNamespace(key: string, allowedPrefixes: string[]): boolean {
	if (!key) return false;
	return allowedPrefixes.some((prefix) => key.startsWith(prefix));
}

/**
 * Sanitizes strings for use in Redis keys or other sensitive contexts
 * Removes any characters that aren't alphanumeric, hyphens, underscores, or colons
 */
export function sanitizeKeyPart(value: string): string {
	return value.replace(/[^a-zA-Z0-9-_:]/g, '');
}

/**
 * Set of allowed Redis key prefixes for the application
 * Any Redis operation should be restricted to these namespaces
 */
export const ALLOWED_KEY_PREFIXES = ['project:likes:', 'user:likes:', 'ratelimit:', 'test:'];

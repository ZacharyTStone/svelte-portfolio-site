import { getKVClient } from './kv';

/**
 * Simple rate limiter using Redis
 * @param identifier - The unique identifier for the client (IP, user ID, etc.)
 * @param action - The action being rate limited (e.g., 'likes', 'comments')
 * @param maxAttempts - Maximum attempts allowed in the time window
 * @param durationSeconds - Time window in seconds
 * @returns Object containing success status and remaining attempts
 */
export async function checkRateLimit(
	identifier: string,
	action: string,
	maxAttempts: number = 10,
	durationSeconds: number = 3600 // 1 hour
): Promise<{ allowed: boolean; remaining: number; resetAt: Date | null }> {
	const kv = getKVClient();
	const key = `ratelimit:${action}:${identifier}`;

	try {
		// Get current count
		const currentCount = Number((await kv.get(key)) || 0);

		if (currentCount >= maxAttempts) {
			// Get TTL to determine when the rate limit resets
			const ttl = await kv.ttl(key);
			let resetAt = null;

			if (ttl > 0) {
				resetAt = new Date(Date.now() + ttl * 1000);
			}

			return {
				allowed: false,
				remaining: 0,
				resetAt
			};
		}

		// Increment the counter
		await kv.incr(key);

		// Set expiration if it's a new key
		if (currentCount === 0) {
			await kv.expire(key, durationSeconds);
		}

		return {
			allowed: true,
			remaining: maxAttempts - currentCount - 1,
			resetAt: new Date(Date.now() + durationSeconds * 1000)
		};
	} catch (error) {
		console.error('Rate limiting error:', error);
		// Fail open - better to allow requests than block legitimate ones if the rate limiter fails
		return { allowed: true, remaining: maxAttempts, resetAt: null };
	}
}

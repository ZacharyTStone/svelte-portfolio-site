import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getKVClient } from '$lib/server/kv';
import { checkRateLimit } from '$lib/server/rate-limit';
import { validateProjectSlug, sanitizeKeyPart, ALLOWED_KEY_PREFIXES } from '$lib/server/validators';

// Constants for our KV store
const TOTAL_LIKES_PREFIX = 'project:likes:';
const USER_LIKES_PREFIX = 'user:likes:';

// GET handler to retrieve like counts and user like status
export const GET: RequestHandler = async ({ url, request }) => {
	const projectSlug = url.searchParams.get('slug');
	const userId = url.searchParams.get('userId');

	// Validate project slug
	if (!projectSlug || !validateProjectSlug(projectSlug)) {
		return json({ error: 'Invalid project slug format' }, { status: 400 });
	}

	// Sanitize keys for Redis safety
	const sanitizedSlug = sanitizeKeyPart(projectSlug);

	const kv = getKVClient();

	// Get project total likes
	const totalLikesKey = `${TOTAL_LIKES_PREFIX}${sanitizedSlug}`;

	// Validate key is within allowed namespace
	if (!ALLOWED_KEY_PREFIXES.some((prefix) => totalLikesKey.startsWith(prefix))) {
		console.error(
			'Security warning: Attempted access to unauthorized key namespace:',
			totalLikesKey
		);
		return json({ error: 'Invalid request' }, { status: 403 });
	}

	const totalLikes = (await kv.get(totalLikesKey)) || 0;

	// If userId is provided, check if user has liked this project
	let hasLiked = false;
	if (userId) {
		const sanitizedUserId = sanitizeKeyPart(userId);
		const userLikesKey = `${USER_LIKES_PREFIX}${sanitizedUserId}`;

		// Validate key is within allowed namespace
		if (!ALLOWED_KEY_PREFIXES.some((prefix) => userLikesKey.startsWith(prefix))) {
			console.error(
				'Security warning: Attempted access to unauthorized key namespace:',
				userLikesKey
			);
			return json({ error: 'Invalid request' }, { status: 403 });
		}

		const userLikes = (await kv.get(userLikesKey)) || {};
		hasLiked = Boolean((userLikes as Record<string, boolean>)[sanitizedSlug]);
	}

	return json({
		totalLikes,
		hasLiked
	});
};

// POST handler to toggle a like
export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const { projectSlug, userId, action } = await request.json();

	// Input validation
	if (!validateProjectSlug(projectSlug)) {
		return json({ error: 'Invalid project slug format' }, { status: 400 });
	}

	if (!userId || typeof userId !== 'string' || userId.length > 100) {
		return json({ error: 'Valid user ID is required' }, { status: 400 });
	}

	if (action !== 'like' && action !== 'unlike') {
		return json({ error: 'Invalid action' }, { status: 400 });
	}

	// Rate limiting
	// Use client IP address as rate limit identifier
	const clientIP = getClientAddress() || 'unknown';
	const rateLimit = await checkRateLimit(
		clientIP,
		'likes',
		30, // 30 likes per hour per IP
		3600 // 1 hour window
	);

	if (!rateLimit.allowed) {
		const resetTime = rateLimit.resetAt ? rateLimit.resetAt.toISOString() : null;
		return json(
			{
				error: 'Rate limit exceeded. Try again later.',
				resetAt: resetTime
			},
			{
				status: 429,
				headers: {
					'X-RateLimit-Limit': '30',
					'X-RateLimit-Remaining': '0',
					'X-RateLimit-Reset': resetTime || ''
				}
			}
		);
	}

	// Sanitize keys for Redis safety
	const sanitizedSlug = sanitizeKeyPart(projectSlug);
	const sanitizedUserId = sanitizeKeyPart(userId);

	const kv = getKVClient();
	const totalLikesKey = `${TOTAL_LIKES_PREFIX}${sanitizedSlug}`;
	const userLikesKey = `${USER_LIKES_PREFIX}${sanitizedUserId}`;

	// Validate keys are within allowed namespace
	if (
		!ALLOWED_KEY_PREFIXES.some((prefix) => totalLikesKey.startsWith(prefix)) ||
		!ALLOWED_KEY_PREFIXES.some((prefix) => userLikesKey.startsWith(prefix))
	) {
		console.error('Security warning: Attempted access to unauthorized key namespace');
		return json({ error: 'Invalid request' }, { status: 403 });
	}

	// Get current user likes
	const userLikes = (await kv.get(userLikesKey)) || {};

	// Get current like status for this project
	const hasLiked = Boolean((userLikes as Record<string, boolean>)[sanitizedSlug]);

	// If already in desired state, return current count
	if ((hasLiked && action === 'like') || (!hasLiked && action === 'unlike')) {
		const totalLikes = (await kv.get(totalLikesKey)) || 0;
		return json({
			totalLikes,
			hasLiked,
			rateLimitRemaining: rateLimit.remaining
		});
	}

	// Update like count
	let totalLikes;
	try {
		if (action === 'like') {
			totalLikes = await kv.incr(totalLikesKey);
			(userLikes as Record<string, boolean>)[sanitizedSlug] = true;
		} else {
			// Decrement count but ensure it doesn't go below 0
			const currentLikes = (await kv.get(totalLikesKey)) || 0;
			totalLikes = Math.max(0, Number(currentLikes) - 1);
			await kv.set(totalLikesKey, totalLikes);

			// Remove from user likes
			delete (userLikes as Record<string, boolean>)[sanitizedSlug];
		}

		// Update user likes storage
		await kv.set(userLikesKey, userLikes);

		return json({
			totalLikes,
			hasLiked: action === 'like',
			rateLimitRemaining: rateLimit.remaining
		});
	} catch (error) {
		console.error('Error updating likes:', error);
		return json({ error: 'Failed to update likes' }, { status: 500 });
	}
};

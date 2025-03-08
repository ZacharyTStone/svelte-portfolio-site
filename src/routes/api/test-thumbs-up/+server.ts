import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getKVClient } from '$lib/server/kv';

// Test constants
const TEST_PROJECT_SLUG = 'test-project-123';
const TOTAL_LIKES_PREFIX = 'project:likes:';
const USER_LIKES_PREFIX = 'user:likes:';

// GET handler to test thumbs up functionality
export const GET: RequestHandler = async () => {
	try {
		const kv = getKVClient();

		// Test keys
		const testLikesKey = `${TOTAL_LIKES_PREFIX}${TEST_PROJECT_SLUG}`;
		const testUserKey = `${USER_LIKES_PREFIX}test-user-${Date.now()}`;

		// Get initial likes count
		const initialCount = (await kv.get(testLikesKey)) || 0;
		console.log(`📊 Initial likes count for test project: ${initialCount}`);

		// Increment likes count
		console.log('👍 Testing like operation...');
		const newCount = await kv.incr(testLikesKey);

		// Update user likes
		const userLikes: Record<string, boolean> = {};
		userLikes[TEST_PROJECT_SLUG] = true;
		await kv.set(testUserKey, userLikes);

		// Verify user likes was set correctly
		const savedUserLikes = (await kv.get(testUserKey)) as Record<string, boolean> | null;
		const hasLiked = savedUserLikes && savedUserLikes[TEST_PROJECT_SLUG] === true;

		// Clean up if this is just a test
		// For a real test, leave these values to check in the UI
		// await kv.set(testLikesKey, initialCount);
		// await kv.del(testUserKey);

		return json({
			success: true,
			message: 'Thumbs up test successful!',
			initialCount,
			newCount,
			hasLiked,
			projectSlug: TEST_PROJECT_SLUG
		});
	} catch (error) {
		console.error('❌ Thumbs up test FAILED with error:', error);
		return json(
			{
				success: false,
				message: `Test failed with error: ${error instanceof Error ? error.message : String(error)}`
			},
			{ status: 500 }
		);
	}
};

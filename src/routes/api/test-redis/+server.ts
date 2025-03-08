import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { testRedisConnection } from '$lib/utils/test-redis';

// GET handler to test Redis connection
export const GET: RequestHandler = async () => {
	const result = await testRedisConnection();

	return json(result, {
		status: result.success ? 200 : 500
	});
};

import { getKVClient } from '$lib/server/kv';

/**
 * Test Redis connection and basic operations
 * Run this from a server route or server component
 */
export async function testRedisConnection() {
	console.log('🔍 Testing Redis connection...');

	try {
		const kv = getKVClient();

		// Test key to avoid conflicts with actual data
		const testKey = `test:connection:${Date.now()}`;

		// Test write operation
		console.log('📝 Testing write operation...');
		await kv.set(testKey, 'Connection test successful');

		// Test read operation
		console.log('📖 Testing read operation...');
		const result = await kv.get(testKey);

		// Clean up test key
		await kv.del(testKey);

		if (result === 'Connection test successful') {
			console.log('✅ Redis connection test PASSED!');
			return { success: true, message: 'Redis connection working properly!' };
		} else {
			console.error('⚠️ Redis connection test FAILED: Unexpected value returned');
			return { success: false, message: 'Test failed: Unexpected value returned' };
		}
	} catch (error) {
		console.error('❌ Redis connection test FAILED with error:', error);
		return {
			success: false,
			message: `Test failed with error: ${error instanceof Error ? error.message : String(error)}`
		};
	}
}

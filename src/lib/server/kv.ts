import { createClient } from '@vercel/kv';

// Create a KV client instance
let kv: ReturnType<typeof createClient>;

// Initialize KV client based on environment
function getKVClient() {
	if (!kv) {
		// Check for the Redis integration configuration first (new approach)
		const redisUrl = typeof process !== 'undefined' ? process.env.REDIS_URL : undefined;
		const redisToken = typeof process !== 'undefined' ? process.env.REDIS_TOKEN : undefined;

		// Check for legacy Vercel KV configuration
		const legacyKvUrl =
			typeof process !== 'undefined'
				? process.env.VERCEL_KV_REST_API_URL || process.env.KV_URL
				: undefined;

		const legacyKvToken =
			typeof process !== 'undefined'
				? process.env.VERCEL_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN
				: undefined;

		// Use the first available configuration
		const url = redisUrl || legacyKvUrl;
		const token = redisToken || legacyKvToken;

		if (url && token) {
			kv = createClient({
				url,
				token
			});
			console.log('✅ Redis/KV client initialized successfully');
		} else {
			// If not in a Vercel environment with KV set up, use a mock implementation
			// This is helpful for development and tests
			console.warn('⚠️ Redis/KV credentials not found, using mock implementation');

			// Simulated in-memory store for development
			const mockStore: Record<string, unknown> = {};

			kv = {
				get: async (key: string) => mockStore[key] || null,
				set: async (key: string, value: unknown) => {
					mockStore[key] = value;
					return 'OK';
				},
				incr: async (key: string) => {
					const currentValue = (mockStore[key] as number) || 0;
					mockStore[key] = currentValue + 1;
					return currentValue + 1;
				},
				decr: async (key: string) => {
					const currentValue = (mockStore[key] as number) || 0;
					mockStore[key] = Math.max(0, currentValue - 1); // Don't go below 0
					return Math.max(0, currentValue - 1);
				}
				// Add minimal implementations for other methods as needed
			} as unknown as ReturnType<typeof createClient>;
		}
	}

	return kv;
}

export { getKVClient };

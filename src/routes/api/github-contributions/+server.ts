import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * GitHub Contributions API Endpoint
 * 
 * Note: GitHub doesn't provide a public API for contribution graph data.
 * This endpoint serves as a placeholder. You can:
 * 
 * 1. Use GitHub's GraphQL API with authentication to fetch commit data
 * 2. Use a third-party service that scrapes GitHub contribution graphs
 * 3. Implement server-side scraping (be mindful of rate limits)
 * 4. Use GitHub's contribution graph SVG (requires CORS handling)
 * 
 * For now, this returns a 501 to indicate the endpoint needs implementation.
 */
export const GET: RequestHandler = async ({ url }) => {
	const username = url.searchParams.get('username');
	const weeks = parseInt(url.searchParams.get('weeks') || '53', 10);

	if (!username) {
		return json({ error: 'Username is required' }, { status: 400 });
	}

	// TODO: Implement actual GitHub API integration
	// Options:
	// 1. Use GitHub GraphQL API to fetch commit history
	// 2. Use GitHub REST API to fetch events
	// 3. Use a service like github-readme-stats
	// 4. Scrape the contribution graph (not recommended, violates ToS)

	// Example structure for what the response should look like:
	const exampleResponse = {
		contributions: [] as Array<{ date: string; count: number }>,
		total: 0,
		currentStreak: 0,
		longestStreak: 0
	};

	// For now, return 501 to indicate not implemented
	// The component will fall back to sample data
	return json(
		{ 
			error: 'GitHub contributions API not implemented. Using sample data.',
			...exampleResponse
		},
		{ status: 501 }
	);

	/* 
	 * Example implementation using GitHub GraphQL API:
	 * 
	 * const query = `
	 *   query($username: String!, $from: DateTime!, $to: DateTime!) {
	 *     user(login: $username) {
	 *       contributionsCollection(from: $from, to: $to) {
	 *         contributionCalendar {
	 *           weeks {
	 *             contributionDays {
	 *               date
	 *               contributionCount
	 *             }
	 *           }
	 *         }
	 *       }
	 *     }
	 *   }
	 * `;
	 * 
	 * const variables = {
	 *   username,
	 *   from: new Date(Date.now() - weeks * 7 * 24 * 60 * 60 * 1000).toISOString(),
	 *   to: new Date().toISOString()
	 * };
	 * 
	 * const response = await fetch('https://api.github.com/graphql', {
	 *   method: 'POST',
	 *   headers: {
	 *     'Authorization': `Bearer ${GITHUB_TOKEN}`,
	 *     'Content-Type': 'application/json'
	 *   },
	 *   body: JSON.stringify({ query, variables })
	 * });
	 */
};

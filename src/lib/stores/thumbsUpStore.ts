import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { v4 as uuidv4 } from 'uuid';

// Define the type for our store
interface ThumbsUpStore {
	projectLikes: Record<string, number>;
	userLikes: Record<string, boolean>;
	userId: string;
	initialized: boolean;
}

// Initialize the store with default values
const createThumbsUpStore = () => {
	// Initialize store with default values
	const initialData: ThumbsUpStore = {
		projectLikes: {},
		userLikes: {},
		userId: '',
		initialized: false
	};

	// Create the store
	const { subscribe, update, set } = writable<ThumbsUpStore>(initialData);

	// Function to get or create a user ID
	const getUserId = (): string => {
		if (!browser) return '';

		// Look for existing user ID in localStorage
		const userId = localStorage.getItem('projectLikesUserId');

		// If no user ID exists, create one
		if (!userId) {
			const newUserId = uuidv4();
			localStorage.setItem('projectLikesUserId', newUserId);
			return newUserId;
		}

		return userId;
	};

	// Initialize the store with data from the API
	const initialize = async () => {
		if (!browser) return;

		// Get or create user ID
		const userId = getUserId();

		update((store) => ({
			...store,
			userId,
			initialized: true
		}));
	};

	// Load project likes for a specific project
	const loadProjectLikes = async (projectSlug: string) => {
		if (!browser) return 0;

		try {
			const userId = getUserId();
			const response = await fetch(`/api/projects/thumbsUp?slug=${projectSlug}&userId=${userId}`);

			if (!response.ok) {
				throw new Error('Failed to fetch project likes');
			}

			const data = await response.json();

			update((store) => ({
				...store,
				projectLikes: {
					...store.projectLikes,
					[projectSlug]: data.totalLikes
				},
				userLikes: {
					...store.userLikes,
					[projectSlug]: data.hasLiked
				}
			}));

			return data.totalLikes;
		} catch (error) {
			console.error('Error loading project likes:', error);
			return 0;
		}
	};

	// Toggle like status for a project
	const toggleLike = async (projectSlug: string) => {
		if (!browser) return;

		const userId = getUserId();

		// Optimistically update UI
		let currentLikeStatus = false;
		let action: 'like' | 'unlike' = 'like';

		update((store) => {
			currentLikeStatus = store.userLikes[projectSlug] || false;
			action = currentLikeStatus ? 'unlike' : 'like';

			// Update user likes status
			const newUserLikes = { ...store.userLikes, [projectSlug]: !currentLikeStatus };

			// Update project likes count
			const currentCount = store.projectLikes[projectSlug] || 0;
			const newCount = currentLikeStatus ? Math.max(0, currentCount - 1) : currentCount + 1;
			const newProjectLikes = { ...store.projectLikes, [projectSlug]: newCount };

			return {
				...store,
				userLikes: newUserLikes,
				projectLikes: newProjectLikes
			};
		});

		// Make API call to update server
		try {
			const response = await fetch('/api/projects/thumbsUp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectSlug,
					userId,
					action
				})
			});

			if (!response.ok) {
				throw new Error('Failed to update like status');
			}

			const data = await response.json();

			// Update store with actual server data
			update((store) => ({
				...store,
				projectLikes: {
					...store.projectLikes,
					[projectSlug]: data.totalLikes
				},
				userLikes: {
					...store.userLikes,
					[projectSlug]: data.hasLiked
				}
			}));
		} catch (error) {
			console.error('Error updating like status:', error);

			// Revert optimistic update on error
			update((store) => ({
				...store,
				userLikes: {
					...store.userLikes,
					[projectSlug]: currentLikeStatus
				}
			}));

			// Reload accurate data
			loadProjectLikes(projectSlug);
		}
	};

	// Check if user has liked a project
	const hasLiked = (projectSlug: string): boolean => {
		let result = false;

		update((store) => {
			result = store.userLikes[projectSlug] || false;
			return store;
		});

		return result;
	};

	// Get likes count for a project
	const getLikesCount = (projectSlug: string): number => {
		let count = 0;

		update((store) => {
			count = store.projectLikes[projectSlug] || 0;
			return store;
		});

		return count;
	};

	// Initialize the store
	if (browser) {
		initialize();
	}

	return {
		subscribe,
		initialize,
		loadProjectLikes,
		toggleLike,
		hasLiked,
		getLikesCount
	};
};

// Export the store
export const thumbsUpStore = createThumbsUpStore();

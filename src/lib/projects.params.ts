import Assets, { getAssetURL } from './data/assets';
import { getSkills } from './skills.params';
import type { Project } from './types';
import { generateRandomHexColor } from './utils';

const MY_PROJECTS: Array<Project> = [
	{
		slug: 'my-anime-collection',
		color: generateRandomHexColor(),
		description: 'PROJECTS.MY_ANIME_COLLECTION.description',
		shortDescription: 'PROJECTS.MY_ANIME_COLLECTION.shortDescription',
		links: [
			{
				to: 'https://www.my-anime-collection.com/landing',
				label: 'PROJECTS.live_site',
				newTab: true
			},
			{ to: 'https://github.com/zachinjapan/my-anime-collection', label: 'GitHub', newTab: true },
			{
				to: 'https://www.youtube.com/embed/D_lXDfCJf6k',
				label: 'YouTube',
				newTab: true
			}
		],
		logo: Assets.Anime,
		name: 'PROJECTS.MY_ANIME_COLLECTION.name',
		skills: getSkills('fe', 'be', 'dev-tools', 'japanese'),
		project_skills: [
			{ label: 'React', to: 'https://reactjs.org/', newTab: true },
			{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS', newTab: true },
			{ label: 'Node', to: 'https://nodejs.org/', newTab: true },
			{
				label: 'API',
				to: 'https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/',
				newTab: true
			},
			{ label: 'Authentication', to: 'https://auth0.com/', newTab: true },
			{ label: 'MongoDB', to: 'https://www.mongodb.com/', newTab: true },
			{ label: 'Heroku', to: 'https://www.heroku.com/', newTab: true }
		],
		type: 'PROJECTS.MY_ANIME_COLLECTION.type',
		english: true,
		japanese: true,
		featured: true,
		featured_reason: 'PROJECTS.MY_ANIME_COLLECTION.featured_reason',
		screenshots: [
			{ src: getAssetURL(Assets.Mac1), label: '' },
			{ src: getAssetURL(Assets.Mac2), label: '' },
			{ src: getAssetURL(Assets.Mac3), label: '' },
			{ src: getAssetURL(Assets.Mac4), label: '' },
			{ src: getAssetURL(Assets.Mac5), label: '' },
			{ src: getAssetURL(Assets.Mac6), label: '' },
			{ src: getAssetURL(Assets.Mac7), label: '' },
			{ src: getAssetURL(Assets.Mac8), label: '' }
		]
	},

	{
		slug: 'haku',
		color: generateRandomHexColor(),
		description: 'PROJECTS.HAKU.description',
		shortDescription: 'PROJECTS.HAKU.shortDescription',
		links: [
			{ to: 'https://haku.onrender.com', label: 'PROJECTS.live_site', newTab: true },
			{ to: 'https://github.com/zachinjapan/haku', label: 'GitHub', newTab: true },
			{ to: 'https://www.youtube.com/embed/q1rVbqMw0ug', label: 'YouTube', newTab: true }
		],
		logo: Assets.Haku,
		name: 'PROJECTS.HAKU.name',
		skills: getSkills('fe', 'be', 'dev-tools'),
		project_skills: [
			{ label: 'React', to: 'https://reactjs.org/', newTab: true },
			{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS', newTab: true },
			{ label: 'Node', to: 'https://nodejs.org/', newTab: true },
			{
				label: 'API',
				to: 'https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/',
				newTab: true
			},
			{ label: 'Authentication', to: 'https://auth0.com/', newTab: true },
			{ label: 'MongoDB', to: 'https://www.mongodb.com/', newTab: true },
			{ label: 'Heroku', to: 'https://www.heroku.com/', newTab: true }
		],
		type: 'PROJECTS.HAKU.type',
		english: true,
		japanese: false,
		featured: false,
		featured_reason: 'PROJECTS.HAKU.featured_reason',
		screenshots: [
			{ src: getAssetURL(Assets.Haku1), label: '' },
			{ src: getAssetURL(Assets.Haku2), label: '' },
			{ src: getAssetURL(Assets.Haku3), label: '' },
			{ src: getAssetURL(Assets.Haku4), label: '' },
			{ src: getAssetURL(Assets.Haku5), label: '' }
		]
	},
	{
		slug: 'zach-in-japan',
		color: generateRandomHexColor(),
		description: 'PROJECTS.ZACH_IN_JAPAN.description',
		shortDescription: 'PROJECTS.ZACH_IN_JAPAN.shortDescription',
		links: [
			{ to: 'https://zachinjapan.com', label: 'PROJECTS.live_site', newTab: true },
			{ to: 'https://github.com/zachinjapan/my-gatsby-blog', label: 'GitHub', newTab: true },
			{ to: 'https://www.youtube.com/embed/lt48zTXl6j0', label: 'YouTube', newTab: true }
		],
		logo: Assets.Blog,
		name: 'PROJECTS.ZACH_IN_JAPAN.name',
		skills: getSkills('fe', 'dev-tools', 'japanese'),
		project_skills: [
			{ label: 'Gatsby', to: 'https://gatsby.dev/', newTab: true },
			{ label: 'React', to: 'https://reactjs.org/', newTab: true },
			{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS', newTab: true },
			{ label: 'Markdown', to: 'https://www.markdownguide.org/', newTab: true },
			{ label: 'GraphQL', to: 'https://graphql.org/', newTab: true },
			{ label: 'Gatsby Cloud', to: 'https://www.gatsbyjs.com/cloud/', newTab: true }
		],
		type: 'PROJECTS.ZACH_IN_JAPAN.type',
		english: true,
		japanese: false,
		// featured: true,
		featured_reason: 'PROJECTS.ZACH_IN_JAPAN.featured_reason',
		// dont_show: true
		screenshots: [
			{ src: getAssetURL(Assets.Blog1), label: '' },
			{ src: getAssetURL(Assets.Blog2), label: '' },
			{ src: getAssetURL(Assets.Blog3), label: '' },
			{ src: getAssetURL(Assets.Blog4), label: '' }
		]
	},
	// {
	// 	slug: 'zacharyTStone',
	// 	color: generateRandomHexColor(),
	// 	description: 'PROJECTS.ZACHARYTSTONE.description',
	// 	shortDescription: 'PROJECTS.ZACHARYTSTONE.shortDescription',
	// 	links: [
	// 		{
	// 			to: 'https://github.com/ZacharyTStone/ZacharyTStone',
	// 			label: 'GitHub',
	// 			newTab: true
	// 		}
	// 	],
	// 	logo: Assets.Readme,
	// 	name: 'PROJECTS.ZACHARYTSTONE.name',
	// 	skills: getSkills('be', 'dev-tools'),
	// 	project_skills: [
	// 		{ label: 'cron', to: 'https://en.wikipedia.org/wiki/Cron', newTab: true },
	// 		{ label: 'GitHub Actions', to: '', newTab: true },
	// 		{
	// 			label: 'API',
	// 			to: 'https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/',
	// 			newTab: true
	// 		}
	// 	],
	// 	type: 'PROJECTS.ZACHARYTSTONE.type',
	// 	english: true,
	// 	japanese: false,
	// 	featured_reason: 'PROJECTS.ZACHARYTSTONE.featured_reason'
	// },
	{
		slug: 'ai-flashcards',
		color: generateRandomHexColor(),
		description: 'PROJECTS.AI_FLASHCARDS.description',
		shortDescription: 'PROJECTS.AI_FLASHCARDS.shortDescription',
		links: [
			{
				to: 'https://github.com/ZacharyTStone/AI-Language-Learning-Flashcards',
				label: 'GitHub',
				newTab: true
			},
			{
				to: 'https://www.youtube.com/watch?v=0x1Rrz2ddjI',
				label: 'YouTube',
				newTab: true
			}
		],
		logo: Assets.Flashcard,
		name: 'PROJECTS.AI_FLASHCARDS.name',
		skills: getSkills('dev-tools'),
		project_skills: [
			{ label: 'Python', to: 'https://www.python.org/', newTab: true },
			{ label: 'CSV', to: 'https://en.wikipedia.org/wiki/Comma-separated_values', newTab: true },
			{ label: 'OpenAI', to: 'https://openai.com/', newTab: true }
		],
		type: 'PROJECTS.AI_FLASHCARDS.type',
		english: true,
		japanese: true,
		featured_reason: 'PROJECTS.AI_FLASHCARDS.featured_reason',
		featured: true,
		screenshots: [
			{ src: getAssetURL(Assets.Anki1), label: '' },
			{ src: getAssetURL(Assets.Anki2), label: '' },
			{ src: getAssetURL(Assets.Anki3), label: '' },
			{ src: getAssetURL(Assets.Anki4), label: '' }
		]
	},

	// description: '
	// {
	// 	slug: 'riffs',
	// 	color: generateRandomHexColor(),
	// 	description: 'PROJECTS.RIFFS.description',
	// 	shortDescription: 'PROJECTS.RIFFS.shortDescription',
	// 	links: [
	// 		{ to: 'https://riffs.netlify.app/', label: 'PROJECTS.live_site', newTab: true },
	// 		{ to: 'https://github.com/zachinjapan/vue-music-app', label: 'GitHub', newTab: true },
	// 		{ to: 'https://www.youtube.com/embed/gBIhz-0Jkg8', label: 'YouTube', newTab: true }
	// 	],
	// 	logo: Assets.Riffs,
	// 	name: 'PROJECTS.RIFFS.name',
	// 	skills: getSkills('fe', 'dev-tools', 'japanese'),
	// 	project_skills: [
	// 		{ label: 'Vue', to: 'https://vuejs.org/', newTab: true },
	// 		{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS', newTab: true },
	// 		{ label: 'Firebase', to: 'https://firebase.google.com/', newTab: true },
	// 		{ label: 'Authentication', to: 'https://firebase.google.com/docs/auth', newTab: true },
	// 		{ label: 'Netlify', to: 'https://www.netlify.com/', newTab: true }
	// 	],
	// 	type: 'PROJECTS.RIFFS.type',
	// 	english: true,
	// 	japanese: true
	// },
	{
		slug: 'japanese-quiz',
		color: generateRandomHexColor(),
		description: 'PROJECTS.JAPANESE_QUIZ.description',
		shortDescription: 'PROJECTS.JAPANESE_QUIZ.shortDescription',
		links: [
			{ to: 'https://prefecture.onrender.com', label: 'PROJECTS.live_site', newTab: true },
			{
				to: 'https://github.com/zachinjapan/prefecture-match',
				label: 'GitHub',
				newTab: true
			}
		],
		logo: Assets.Prefecture,
		name: 'PROJECTS.JAPANESE_QUIZ.name',
		skills: getSkills('fe', 'dev-tools', 'japanese'),
		project_skills: [
			{ label: 'React', to: 'https://reactjs.org/', newTab: true },
			{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS', newTab: true },
			{
				label: 'JavaScript',
				to: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
				newTab: true
			},
			{ label: 'Heroku', to: 'https://www.heroku.com/', newTab: true }
		],
		type: 'PROJECTS.JAPANESE_QUIZ.type',
		english: false,
		japanese: true,
		featured_reason: 'PROJECTS.JAPANESE_QUIZ.featured_reason',
		screenshots: [
			{ src: getAssetURL(Assets.Prefecture1), label: '' },
			{ src: getAssetURL(Assets.Prefecture2), label: '' }
		]
	}
];

export default MY_PROJECTS;

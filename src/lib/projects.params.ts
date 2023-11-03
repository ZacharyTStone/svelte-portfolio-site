import Assets from './data/assets';
import { getSkills } from './skills.params';
import type { Project } from './types';
import { generateRandomHexColor } from './utils';

const MY_PROJECTS: Array<Project> = [
	{
		slug: 'my-anime-collection',
		color: generateRandomHexColor(),
		description:
			'My Anime Collection is a free anime tracker where you can explore and create custom playlists of your favorite anime.',
		shortDescription: 'Find and keep track of your favorite anime.',
		links: [
			{ to: 'https://www.my-anime-collection.com/landing', label: 'Live Demo', newTab: true },
			{ to: 'https://github.com/zachinjapan/my-anime-collection', label: 'GitHub', newTab: true },
			{
				to: 'https://www.youtube.com/embed/D_lXDfCJf6k',
				label: 'YouTube',
				newTab: true
			}
		],
		logo: Assets.Anime,
		name: 'My Anime Collection',
		skills: getSkills('fe', 'be', 'dev-tools', 'japanese'),
		project_skills: [
			{ label: 'React', to: 'https://reactjs.org/' },
			{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
			{ label: 'Node', to: 'https://nodejs.org/' },
			{
				label: 'API',
				to: 'https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/'
			},
			{ label: 'Authentication', to: 'https://auth0.com/' },
			{ label: 'MongoDB', to: 'https://www.mongodb.com/' },
			{ label: 'Heroku', to: 'https://www.heroku.com/' }
		],
		type: 'Web Application',
		english: true,
		japanese: true,
		featured: true,
		featured_reason: 'Best Overall'
	},
	{
		slug: 'zach-in-japan',
		color: generateRandomHexColor(),
		description:
			'My blog. Read about coding concepts, Japan, and all things related to being a web developer.',
		shortDescription:
			'My blog. Read about coding concepts, Japan, and all things related to being a web developer.',
		links: [
			{ to: 'https://zachinjapan.com', label: 'Live Demo', newTab: true },
			{ to: 'https://github.com/zachinjapan/my-gatsby-blog', label: 'GitHub', newTab: true },
			{ to: 'https://www.youtube.com/embed/lt48zTXl6j0', label: 'YouTube', newTab: true }
		],
		logo: Assets.Blog,
		name: 'Zach In Japan',

		skills: getSkills('fe', 'dev-tools', 'japanese'),
		project_skills: [
			{ label: 'Gatsby', to: 'https://gatsby.dev/' },
			{ label: 'React', to: 'https://reactjs.org/' },
			{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
			{ label: 'Markdown', to: 'https://www.markdownguide.org/' },
			{ label: 'GraphQL', to: 'https://graphql.org/' },
			{ label: 'Gatsby Cloud', to: 'https://www.gatsbyjs.com/cloud/' }
		],
		type: 'Web Application',
		english: true,
		japanese: false,
		featured: true,
		featured_reason: 'Most Personal'
	},
	{
		slug: 'haku',
		color: generateRandomHexColor(),
		description: 'Track and compare jobs during the interview process.',
		shortDescription: 'Track and compare jobs during the interview process.',
		links: [
			{ to: 'https://www.hakujobs.com', label: 'Live Demo', newTab: true },
			{ to: 'https://github.com/zachinjapan/haku', label: 'GitHub', newTab: true },
			{ to: 'https://www.youtube.com/embed/q1rVbqMw0ug', label: 'YouTube', newTab: true }
		],
		logo: Assets.Haku,
		name: 'HAKU',

		skills: getSkills('fe', 'be', 'dev-tools'),
		project_skills: [
			{ label: 'React', to: 'https://reactjs.org/' },
			{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
			{ label: 'Node', to: 'https://nodejs.org/' },
			{
				label: 'API',
				to: 'https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/'
			},
			{ label: 'Authentication', to: 'https://auth0.com/' },
			{ label: 'MongoDB', to: 'https://www.mongodb.com/' },
			{ label: 'Heroku', to: 'https://www.heroku.com/' }
		],
		type: 'Web Application',
		english: true,
		japanese: false,
		featured: true,
		featured_reason: 'Highest Business Value'
	},
	{
		slug: 'riffs',
		color: generateRandomHexColor(),
		description: 'A place to share your new songs, covers, and musical ideas with the world.',
		shortDescription: 'A place to share your new songs, covers, and musical ideas with the world.',
		links: [
			{ to: 'https://riffs.netlify.app/', label: 'Live Demo', newTab: true },
			{ to: 'https://github.com/zachinjapan/vue-music-app', label: 'GitHub', newTab: true },
			{ to: 'https://www.youtube.com/embed/gBIhz-0Jkg8', label: 'YouTube', newTab: true }
		],
		logo: Assets.Riffs,
		name: 'Riffs!',
		skills: getSkills('fe', 'dev-tools', 'japanese'),
		project_skills: [
			{ label: 'Vue', to: 'https://vuejs.org/' },
			{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
			{ label: 'Firebase', to: 'https://firebase.google.com/' },
			{ label: 'Authentication', to: 'https://firebase.google.com/docs/auth' },
			{ label: 'Netlify', to: 'https://www.netlify.com/' }
		],
		type: 'Web Application',
		english: true,
		japanese: true
	},
	{
		slug: 'japanese-quiz',
		color: generateRandomHexColor(),
		description: 'Test your knowledge of Japanese prefectures with this fun quiz.',
		shortDescription: 'Test your knowledge of Japanese prefectures with this fun quiz.',
		links: [
			{ to: 'https://prefecture-match.herokuapp.com', label: 'Live Demo', newTab: true },
			{
				to: 'https://github.com/zachinjapan/prefecture-match',
				label: 'GitHub',
				newTab: true
			}
		],
		logo: Assets.Prefecture,
		skills: getSkills('fe', 'dev-tools', 'japanese'),
		project_skills: [
			{ label: 'React', to: 'https://reactjs.org/' },
			{ label: 'CSS', to: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
			{ label: 'JavaScript', to: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
			{ label: 'Heroku', to: 'https://www.heroku.com/' }
		],
		name: 'Prefecture Quiz',
		type: 'Web Application',
		english: false,
		japanese: true
	},
	{
		slug: 'zacharyTStone',
		color: generateRandomHexColor(),
		description: 'Checkout my readme that is automatically generated every hour.',
		shortDescription: 'Checkout my readme that is automatically generated every hour.',
		links: [
			{
				to: 'https://github.com/ZacharyTStone/ZacharyTStone',
				label: 'GitHub',
				newTab: true
			}
		],
		logo: Assets.Readme,
		skills: getSkills('be', 'dev-tools'),
		project_skills: [
			{ label: 'cron', to: 'https://en.wikipedia.org/wiki/Cron' },
			{ label: 'GitHub Actions', to: '' },
			{ label: 'API', to: 'https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/' }
		],
		name: 'ZacharyTStone',
		type: 'Github Readme',
		english: true,
		japanese: false
	}
];

export default MY_PROJECTS;

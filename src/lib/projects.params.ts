import Assets from './data/assets';
import { getSkills } from './skills.params';
import type { Project } from './types';

const MY_PROJECTS: Array<Project> = [
	{
		slug: 'my-anime-collection',
		color: '#ffd700',
		description: 'Find and keep track of your favorite anime.',
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
		project_skills: ['React', 'CSS', 'Node', 'API', 'Authentication', 'MongoDB', 'Heroku'],
		type: 'Web Application',
		english: true,
		japanese: true,
		featured: true
	},
	{
		slug: 'zach-in-japan',
		color: '#ffd700',
		description:
			'Read about coding concepts, Japan, and all things related to being a web developer.',
		shortDescription:
			'Read about coding concepts, Japan, and all things related to being a web developer.',
		links: [
			{ to: 'https://zachinjapan.com', label: 'Live Demo', newTab: true },
			{ to: 'https://github.com/zachinjapan/my-gatsby-blog', label: 'GitHub', newTab: true },
			{ to: 'https://www.youtube.com/embed/lt48zTXl6j0', label: 'YouTube', newTab: true }
		],
		logo: Assets.Blog,
		name: 'Zach In Japan',

		skills: getSkills('fe', 'dev-tools', 'japanese'),
		project_skills: ['Gatsby', 'React', 'CSS', 'Markdown', 'GraphQL', 'Gatsby Cloud'],
		type: 'Web Application',
		english: true,
		japanese: false,
		featured: true
	},
	{
		slug: 'haku',
		color: '#f44336',
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
		project_skills: ['React', 'CSS', 'Node', 'API', 'Authentication', 'MongoDB', 'Heroku'],
		type: 'Web Application',
		english: true,
		japanese: false
	},
	{
		slug: 'riffs',
		color: '#ff9800',
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
		project_skills: ['Vue', 'CSS', 'Firebase', 'Authentication', 'Netlify'],
		type: 'Web Application',
		english: true,
		japanese: true
	},
	{
		slug: 'japanese-quiz',
		color: '#808000',
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
		project_skills: ['React', 'CSS', 'JavaScript', 'Heroku'],
		name: 'Prefecture Quiz',
		type: 'Web Application',
		english: false,
		japanese: true
	}
];

export default MY_PROJECTS;

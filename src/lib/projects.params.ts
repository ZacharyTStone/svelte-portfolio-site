import Assets from './data/assets';
import { getSkills } from './skills.params';
import type { Project } from './types';

const MY_PROJECTS: Array<Project> = [
	{
		slug: 'my-anime-collection',
		color: '#7f39a5',
		description: 'Find and keep track of your favorite anime.',
		shortDescription: 'Find and keep track of your favorite anime.',
		links: [
			{ to: 'https://www.my-anime-collection.com/landing', label: 'Live Demo' },
			{ to: 'https://github.com/zachinjapan/my-anime-collection', label: 'GitHub' }
		],
		logo: Assets.Unknown,
		name: 'My Anime Collection',
		skills: getSkills('fe', 'be', 'dev-tools', 'japanese'),
		project_skills: ['React', 'CSS', 'Node', 'API', 'Authentication', 'MongoDB', 'Heroku'],
		type: 'Web Application',
		video: 'https://www.youtube.com/embed/D_lXDfCJf6k',
		english: true,
		japanese: true,
		featured: true
	},
	{
		slug: 'zach-in-japan',
		color: '#3d3d3d',
		description:
			'Read about coding concepts, Japan, and all things related to being a web developer.',
		shortDescription:
			'Read about coding concepts, Japan, and all things related to being a web developer.',
		links: [
			{ to: 'https://zachinjapan.com', label: 'Live Demo' },
			{ to: 'https://github.com/zachinjapan/my-gatsby-blog', label: 'GitHub' }
		],
		logo: Assets.Unknown,
		name: 'Zach In Japan',

		skills: getSkills('fe', 'dev-tools', 'japanese'),
		project_skills: ['Gatsby', 'React', 'CSS', 'Markdown', 'GraphQL', 'Gatsby Cloud'],
		type: 'Web Application',
		video: 'https://www.youtube.com/embed/lt48zTXl6j0',
		english: true,
		japanese: false,
		featured: true
	},
	{
		slug: 'haku',
		color: '#2ecc71',
		description: 'Track and compare jobs during the interview process.',
		shortDescription: 'Track and compare jobs during the interview process.',
		links: [
			{ to: 'https://www.hakujobs.com', label: 'Live Demo' },
			{ to: 'https://github.com/zachinjapan/haku', label: 'GitHub' }
		],
		logo: Assets.Unknown,
		name: 'HAKU',

		skills: getSkills('fe', 'be', 'dev-tools'),
		project_skills: ['React', 'CSS', 'Node', 'API', 'Authentication', 'MongoDB', 'Heroku'],
		type: 'Web Application',
		video: 'https://www.youtube.com/embed/q1rVbqMw0ug',
		english: true,
		japanese: false
	},
	{
		slug: 'riffs',
		color: '#ff9800',
		description: 'A place to share your new songs, covers, and musical ideas with the world.',
		shortDescription: 'A place to share your new songs, covers, and musical ideas with the world.',
		links: [
			{ to: 'https://riffs.netlify.app/', label: 'Live Demo' },
			{ to: 'https://github.com/zachinjapan/vue-music-app', label: 'GitHub' },
			{ to: 'https://www.youtube.com/embed/gBIhz-0Jkg8', label: 'YouTube' }
		],
		logo: Assets.Unknown,
		name: 'Riffs!',

		skills: getSkills('fe', 'dev-tools', 'japanese'),
		project_skills: ['Vue', 'CSS', 'Firebase', 'Authentication', 'Netlify'],
		type: 'Web Application',
		video: 'https://www.youtube.com/embed/gBIhz-0Jkg8',
		english: true,
		japanese: true
	}
];

export default MY_PROJECTS;

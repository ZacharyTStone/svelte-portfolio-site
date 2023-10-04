import Assets from './data/assets';
import type { Skill } from './types';
import svelte from './md/svelte.md?raw';

const s = (skill: Skill) => skill;

export type ArrayElementType<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const FRAMEWORKS: any[] = [
	{ label: 'React (CRA)', link: 'https://reactjs.org/' },
	{ label: 'Gatsby', link: 'https://www.gatsbyjs.org/' },
	{ label: 'Vue', link: 'https://vuejs.org/' },
	{ label: 'Next.js', link: 'https://nextjs.org/' },
	{ label: 'Svelte', link: 'https://svelte.dev/' }
];

const TOOLS: any[] = [
	{ label: 'HTML', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
	{ label: 'CSS', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
	{ label: 'JavaScript', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
	{ label: 'Typescript', link: 'https://www.typescriptlang.org/' },
	{ label: 'Styled Components', link: 'https://styled-components.com/' },
	{ label: 'Bootstrap', link: 'https://getbootstrap.com/' },
	{ label: 'Tailwind', link: 'https://tailwindcss.com/' },
	{ label: 'Material UI', link: 'https://material-ui.com/' },
	{ label: 'Context API', link: 'https://reactjs.org/docs/context.html' },
	{ label: 'Redux', link: 'https://redux.js.org/' }
];

const Backend: any[] = [
	{ label: 'Node', link: 'https://nodejs.org/en/' },
	{ label: 'REST', link: 'https://restfulapi.net/' },
	{ label: 'GraphQL', link: 'https://graphql.org/' },
	{ label: 'MongoDB', link: 'https://www.mongodb.com/' },
	{ label: 'SQL', link: 'https://www.w3schools.com/sql/' },
	{ label: 'Hasura', link: 'https://hasura.io/' }
];

const Server: any[] = [
	{ label: 'Heroku', link: 'https://www.heroku.com/' },
	{ label: 'Netlify', link: 'https://www.netlify.com/' },
	{ label: 'Vercel', link: 'https://vercel.com/' }
];

const Other: any[] = [
	{ label: 'Jira', link: 'https://www.atlassian.com/software/jira' },
	{ label: 'Github', link: 'https://github.com/' },
	{ label: 'Twilio', link: 'https://www.twilio.com/' },
	{ label: 'Ably Web Sockets', link: 'https://www.ably.io/' },
	{ label: 'Chat GPT', link: 'https://chat.openai.com/chat' }
];

const FE_EXTRA_INFO = [
	{
		title: 'Frameworks',
		content: FRAMEWORKS
	},
	{
		title: 'Tools',
		content: TOOLS
	}
];

const BE_EXTRA_INFO = [
	{
		title: 'Backend',
		content: Backend
	},
	{
		title: 'Server',
		content: Server
	}
];

const OTHER_EXTRA_INFO = [
	{
		title: 'Other',
		content: Other
	}
];

const MY_SKILLS = [
	s({
		slug: 'fe',
		color: 'yellow',
		description:
			'I have experience using a variety of frontend frameworks and tools to create responsive and accessible web applications. I am also comfortable using CSS and CSS-in-JS tools, such as Styled Components and Tailwind. Crafting strong, reusable components is an art, and I am always looking to improve my skills in this area.',
		logo: Assets.TypeScript,
		name: 'Frontend Web',
		extraInfo: FE_EXTRA_INFO
	}),
	s({
		slug: 'be',
		color: 'blue',
		description:
			'I have experience using a variety of backend technologies to create REST and GraphQL APIs. I also have experience working with databases in both SQL and NoSQL formats. At Rapptr Labs, I often work on backend tickets for a business-level application using Node.js and Express with a database in SQL, interacted with through Prisma.',
		logo: Assets.NodeJs,
		name: 'Backend Web',
		extraInfo: BE_EXTRA_INFO
	}),
	s({
		slug: 'dev-tools',
		color: 'red',
		description:
			'Whether it is fixing merge conflicts in Git, or updating tickets in Jira, I am comfortable using a variety of tools to get the job done.',
		logo: Assets.Slack,
		name: 'Dev Tools',
		extraInfo: OTHER_EXTRA_INFO
	}),
	s({
		slug: 'japanese',
		color: 'orange',
		description:
			'I have passed the JLPT N2, Kanji Kentei level 10 and have lived in Japan for over 3 years as a English teacher. Outside of coding this is my biggest passion.',
		logo: Assets.Japan,
		name: 'Japanese'
	})
];

export default MY_SKILLS;

export const getSkills = (...slugs: Array<string>): Array<Skill> =>
	MY_SKILLS.filter((it) => slugs.includes(it.slug));

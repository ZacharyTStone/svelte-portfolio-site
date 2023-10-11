import Assets from './data/assets';
import type { Skill } from './types';
import svelte from './md/svelte.md?raw';
import { COLOR_ASSETS } from './data/assets';

const s = (skill: Skill) => skill;

export type ArrayElementType<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const FRAMEWORKS: any[] = [
	{ label: 'React', link: 'https://reactjs.org/', icon: COLOR_ASSETS.React },
	{ label: 'Gatsby', link: 'https://www.gatsbyjs.org/', icon: COLOR_ASSETS.Gatsby },
	{ label: 'Vue', link: 'https://vuejs.org/', icon: COLOR_ASSETS.VueJs },
	{ label: 'Next', link: 'https://nextjs.org/', icon: COLOR_ASSETS.Next },
	{ label: 'Svelte', link: 'https://svelte.dev/', icon: COLOR_ASSETS.Svelte }
];

const FE_TOOLS: any[] = [
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
	{ label: 'Hasura', link: 'https://hasura.io/' },
	{ label: 'Ably Web Sockets', link: 'https://www.ably.io/' }
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
	{ label: 'Chat GPT', link: 'https://chat.openai.com/chat' }
];

const SECURITY_TOOLS: any[] = [{ label: 'OWASP ZAP', link: 'https://owasp.org/www-project-zap/' }];

const FE_EXTRA_INFO = [
	{
		title: 'Frameworks',
		content: FRAMEWORKS
	},
	{
		title: 'Tools',
		content: FE_TOOLS
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

const SECURITY_EXTRA_INFO = [
	{
		title: 'Tools',
		content: SECURITY_TOOLS
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
		slug: 'web-security',
		color: 'green',
		description:
			"My fascination with web security sparked when I implemented a comprehensive site overhaul according to a third-party audit at work. This experience exposed me to numerous web security concepts, and since then, I've been avidly seeking to deepen my understanding of this field. I am consistently exploring ways to increase the security of my applications.",
		logo: Assets.Security,
		name: 'Web Security',
		extraInfo: SECURITY_EXTRA_INFO,
		certifications: [
			{
				label: 'Web Application Security Testing with OWASP ZAP',
				link: 'https://coursera.org/share/6534ebedc75f9b25ca28b30aaf093435'
			}
		]
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
			'Outside of coding this is my biggest passion. I hope to one day be fluent and spend some time every day studying.',
		logo: Assets.Japan,
		name: 'Japanese',
		certifications: [
			{
				label: 'Japanese Language Proficiency Test level N2'
			},
			{
				label: 'Kanji Kentei Level 10 (Perfect Score)'
			}
		]
	})
];

export default MY_SKILLS;

export const getSkills = (...slugs: Array<string>): Array<Skill> =>
	MY_SKILLS.filter((it) => slugs.includes(it.slug));

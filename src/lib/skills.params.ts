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
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
		logo: Assets.TypeScript,
		name: 'Frontend Web',
		extraInfo: FE_EXTRA_INFO
	}),
	s({
		slug: 'be',
		color: 'blue',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
		logo: Assets.NodeJs,
		name: 'Backend Web',
		extraInfo: BE_EXTRA_INFO
	}),
	s({
		slug: 'dev-tools',
		color: 'blue',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
		logo: Assets.Unknown,
		name: 'Dev Tools',
		extraInfo: OTHER_EXTRA_INFO
	}),
	s({
		slug: 'japanese',
		color: 'orange',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
		logo: Assets.Japan,
		name: 'Japanese'
	})
];

export default MY_SKILLS;

export const getSkills = (...slugs: Array<string>): Array<Skill> =>
	MY_SKILLS.filter((it) => slugs.includes(it.slug));

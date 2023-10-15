import MY_EXPERIENCES from './experiences.params';
import MY_PROJECTS from './projects.params';
import MY_SKILLS from './skills.params';
import {
	Platform,
	type HomePageParams,
	type ProjectPageParams,
	type ExperiencePageParams,
	type SkillsPageParams,
	type ResumePageParams,
	type SearchPageParams
} from './types';
import { Icons } from './utils';

export const TITLE_SUFFIX = 'Zach Stone';

export const NavBar = {
	home: 'Home',
	personal: 'Projects',
	career: 'Experience',
	resume: 'Resume',
	skills: 'Skills'
};

export const getPlatfromIcon = (platform: Platform): Icons => {
	switch (platform) {
		case Platform.GitHub:
			return Icons.GitHub;
		case Platform.Linkedin:
			return Icons.LinkedIn;
		case Platform.StackOverflow:
			return Icons.StackOverflow;
		case Platform.Facebook:
			return Icons.Facebook;
		case Platform.Email:
			return Icons.Email;
		case Platform.Twitter:
			return Icons.Twitter;
		case Platform.Youtube:
			return Icons.Youtube;
	}
};

export const HOME: HomePageParams = {
	title: 'Home',
	name: 'Zach',
	lastName: 'Stone',
	description: 'a software engineer with professional experience in full-stack web developement.',
	links: [
		{ platform: Platform.GitHub, link: 'https://github.com/ZacharyTStone', newTab: true },
		{
			platform: Platform.Linkedin,
			link: 'https://www.linkedin.com/in/zacharystone42/',
			newTab: true
		}
	]
};

export const PROJECTS: ProjectPageParams = {
	title: 'Personal Projects',
	items: MY_PROJECTS
};

export const EXPERIENCES: ExperiencePageParams = {
	title: 'Experience',
	items: MY_EXPERIENCES
};

export const SKILLS: SkillsPageParams = {
	title: 'Skills',
	items: MY_SKILLS
};

export const RESUME: ResumePageParams = {
	title: 'Resumé',
	links: [
		{
			to: 'https://drive.google.com/file/d/1WrIeOGQ86a2U0DSC8ay4g1NtUr9Ieygs/view?usp=sharing',
			label: 'English Resume',
			newTab: true
		},
		{
			to: 'https://docs.google.com/spreadsheets/d/15MXDUEWai1SW2OZ6Nt8MbvfxRC8kAfCO/edit?usp=sharing&ouid=110021340560949770286&rtpof=true&sd=true',
			label: 'Japanese Resume',
			newTab: true
		},
		{
			to: 'https://docs.google.com/document/d/1SFRXMNP7yeWrZRcPUAJX-_R28WVdn3w3V7w7fxJnn0w/edit?usp=sharing',
			label: 'Japanese Work History Resume',
			newTab: true
		}
	]
};

export const SEARCH: SearchPageParams = {
	title: 'Search'
};

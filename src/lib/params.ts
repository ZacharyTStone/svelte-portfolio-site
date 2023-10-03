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

export const TITLE_SUFFIX = 'Slick template with Svelte';

export const NavBar = {
	home: 'Home',
	personal: 'Projects',
	career: 'Work',
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
		{ platform: Platform.GitHub, link: 'https://github.com/' },
		{
			platform: Platform.Linkedin,
			link: 'https://www.linkedin.com/'
		}
	]
};

export const PROJECTS: ProjectPageParams = {
	title: 'Personal Projects',
	items: MY_PROJECTS
};

export const EXPERIENCES: ExperiencePageParams = {
	title: 'Work Experience',
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
			to: 'https://www.linkedin.com/in/zach-stone-5b2b2b1b3/',
			label: 'English Resume',
			newTab: true
		},
		{
			to: 'https://www.linkedin.com/in/zach-stone-5b2b2b1b3/',
			label: 'Japanese Resume',
			newTab: true
		},
		{
			to: 'https://www.linkedin.com/in/zach-stone-5b2b2b1b3/',
			label: 'Japanese Work History Resume',
			newTab: true
		}
	]
};

export const SEARCH: SearchPageParams = {
	title: 'Search'
};

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
	home: 'NAVBAR.home',
	about: 'NAVBAR.about',
	personal: 'NAVBAR.personal',
	career: 'NAVBAR.career',
	resume: 'NAVBAR.resume',
	skills: 'NAVBAR.skills',
	blog: 'NAVBAR.blog',
	search: 'NAVBAR.search',
	japanese: 'NAVBAR.japanese',
	english: 'NAVBAR.english',
	lightMode: 'NAVBAR.lightMode',
	darkMode: 'NAVBAR.darkMode'
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
	title: 'HOME',
	name: 'HOME.name',

	lastName: 'HOME.lastName',
	description: 'HOME.description',
	links: [
		{ platform: Platform.GitHub, link: 'https://github.com/ZacharyTStone', newTab: true },
		{
			platform: Platform.Linkedin,
			link: 'https://www.linkedin.com/in/zacharystone42/',
			newTab: true
		},
		{
			platform: Platform.Email,
			link: 'mailto: zach.stone.developer@gmail.com',
			newTab: true
		}
	]
};

export const PROJECTS: ProjectPageParams = {
	title: 'PROJECTS.title',
	items: MY_PROJECTS,
	no_filter_option: 'PROJECTS.no_filter_option',
	featured_projects: 'PROJECTS.featured_projects',
	other_projects: 'PROJECTS.other_projects'
};

export const EXPERIENCES: ExperiencePageParams = {
	title: 'EXPERIENCES.title',
	items: MY_EXPERIENCES
};

export const SKILLS: SkillsPageParams = {
	title: 'SKILLS.title',
	items: MY_SKILLS
};

export const RESUME: ResumePageParams = {
	title: 'RESUME.title',
	links: [
		{
			to: 'https://docs.google.com/document/d/1HYvcN-oshInv0VPZSSp8-VtYEDZT1ON24ocUq-lcmVs/edit?usp=sharing',
			label: 'RESUME.english',
			newTab: true
		},
		{
			to: 'https://docs.google.com/spreadsheets/d/15MXDUEWai1SW2OZ6Nt8MbvfxRC8kAfCO/edit?usp=sharing&ouid=110021340560949770286&rtpof=true&sd=true',
			label: 'RESUME.japanese',
			newTab: true
		}
		// {
		// 	to: 'https://docs.google.com/spreadsheets/d/1PfDypNRzmBTzJRFwEfF_dDX6QDFeGyUnf3xjk_mnsFo/edit?usp=sharing',
		// 	label: 'RESUME.japanese_work',
		// 	newTab: true
		// }
	]
};

export const SEARCH: SearchPageParams = {
	title: 'SEARCH.title',
	prompt: 'SEARCH.prompt'
};

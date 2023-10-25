export enum Platform {
	GitHub = 'github',
	StackOverflow = 'stackoverflow',
	Twitter = 'twitter',
	Linkedin = 'linkedin',
	Email = 'email',
	Facebook = 'facebook',
	Youtube = 'youtube'
}

export enum ContractType {
	FullTime = 'Full-time',
	PartTime = 'Part-time',
	SelfEmployed = 'Self-employed',
	Freelance = 'Freelance',
	Contract = 'Contract',
	Internship = 'Internship'
}

export type Asset = string | { light: string; dark: string };

interface SkillInfoSection {
	title: string;
	content: {
		label: string;
		link?: string;
		// todo: update this type
		icon: any;
	}[];
}

interface certifcations {
	label: string;
	link?: string;
}

export interface Item {
	slug: string;
	name: string;
	logo: Asset;
	shortDescription: string;
	description: string;
	screenshots?: Array<{ src: string; label: string }>;
	extraInfo?: SkillInfoSection[];
	certifications?: certifcations[];
}

export interface Link {
	to: string;
	label: string;
	newTab?: boolean;
}

export interface IconLink extends Link {
	icon: Asset;
}

export interface Skill extends Omit<Item, 'shortDescription'> {
	color: string;
}

export interface Project extends Item {
	links: Array<Link>;
	color: string;
	type: string;
	skills: Array<Skill>;
	project_skills?: Array<Link>;
	video?: string;
	english?: boolean;
	japanese?: boolean;
	featured?: boolean;
	featured_reason?: string;
}

export interface Experience extends Project {
	company: string;
	location: string;
	contract: ContractType;
	period: {
		from: Date;
		to?: Date;
	};
}

export interface PageParams {
	title: string;
}

export interface PageWithSearchParams<T> extends PageParams {
	items: Array<T>;
}

export interface HomeLink {
	platform: Platform;
	link: string;
	newTab?: boolean;
}

export interface HomePageParams extends PageParams {
	name: string;
	lastName: string;
	description: string;
	links: Array<HomeLink>;
	skills?: Array<Skill>;
}

export type SearchPageParams = PageParams;

export type ProjectPageParams = PageWithSearchParams<Project>;

export type ExperiencePageParams = PageWithSearchParams<Experience>;

export type SkillsPageParams = PageWithSearchParams<Skill>;

export interface ResumePageParams extends PageParams {
	links: Array<Link>;
}

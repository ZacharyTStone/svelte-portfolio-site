export enum Platform {
	GitHub = 'Github',
	StackOverflow = 'Stackoverflow',
	Twitter = 'Twitter',
	Linkedin = 'Linkedin',
	Email = 'Email',
	Facebook = 'Facebook',
	Youtube = 'Youtube'
}

export enum ContractType {
	FullTime = 'CONTRACT.FullTime',
	PartTime = 'CONTRACT.PartTime',
	SelfEmployed = 'CONTRACT.SelfEmployed',
	Freelance = 'CONTRACT.Freelance',
	Contract = 'CONTRACT.Contract',
	Internship = 'CONTRACT.Internship'
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

export interface Certifications {
	label: string;
	link?: string;
	date?: string;
	provider?: string;
}

export interface Courses {
	label: string;
	link?: string;
	date?: string;
	provider?: string;
}

export interface Item {
	slug: string;
	name: string;
	logo: Asset;
	shortDescription: string;
	description?: string;
	screenshots?: Array<{ src: string; label: string }>;
	extraInfo?: SkillInfoSection[];
	certifications?: Certifications[];
	courses?: Courses[];
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
	color: string; // hex color
	type: string;
	skills: Array<Skill>;
	project_skills?: Array<Link>;
	video?: string;
	english?: boolean;
	japanese?: boolean;
	featured?: boolean;
	featured_reason?: string;
	description_is_markdown?: boolean;
	dont_show?: boolean;
	thumbsUpCount?: number;
}

export interface Experience extends Project {
	company: string;
	location: string;
	contract: ContractType;
	period: {
		from: Date;
		to?: Date;
	};
	quote?: {
		text: string;
		link: Link;
	};
}

export interface PageParams {
	title: string;
}

export interface PageWithSearchParams<T> extends PageParams {
	items: Array<T>;
	no_filter_option?: string;
	featured_projects?: string;
	other_projects?: string;
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

export interface SearchPageParams extends PageParams {
	prompt: string;
}

export type ProjectPageParams = PageWithSearchParams<Project>;

export type ExperiencePageParams = PageWithSearchParams<Experience>;

export type SkillsPageParams = PageWithSearchParams<Skill>;

export interface ResumePageParams extends PageParams {
	links: Array<Link>;
}

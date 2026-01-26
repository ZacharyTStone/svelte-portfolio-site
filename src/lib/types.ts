/**
 * Platform types for social media and contact links
 */
export enum Platform {
	GitHub = 'Github',
	StackOverflow = 'Stackoverflow',
	Twitter = 'Twitter',
	Linkedin = 'Linkedin',
	Email = 'Email',
	Facebook = 'Facebook',
	Youtube = 'Youtube'
}

/**
 * Types of employment contracts
 */
export enum ContractType {
	FullTime = 'CONTRACT.FullTime',
	PartTime = 'CONTRACT.PartTime',
	SelfEmployed = 'CONTRACT.SelfEmployed',
	Freelance = 'CONTRACT.Freelance',
	Contract = 'CONTRACT.Contract',
	Internship = 'CONTRACT.Internship'
}

/**
 * Asset type for theme-aware images
 */
export type Asset = string | { light: string; dark: string };

/**
 * Information section for skills
 */
export interface SkillInfoSection {
	title: string;
	content: Array<{
		label: string;
		link?: string;
		icon?: Asset;
	}>;
}

/**
 * Certification information
 */
export interface Certifications {
	label: string;
	link?: string;
	date?: string;
	provider?: string;
}

/**
 * Course information
 */
export interface Courses {
	label: string;
	link?: string;
	date?: string;
	provider?: string;
}

/**
 * Base item interface for projects, skills, and experiences
 */
export interface Item {
	slug: string;
	name: string;
	logo: Asset;
	shortDescription: string;
	description?: string;
	screenshots?: Array<{
		src: string;
		label: string;
	}>;
	extraInfo?: SkillInfoSection[];
	certifications?: Certifications[];
	courses?: Courses[];
}

/**
 * Navigation link
 */
export interface Link {
	to: string;
	label: string;
	newTab?: boolean;
}

/**
 * Navigation link with icon
 */
export interface IconLink extends Link {
	icon: Asset;
}

/**
 * Skill information
 */
export interface Skill extends Omit<Item, 'shortDescription'> {
	color: string;
}

/**
 * Project information
 */
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
	description_is_markdown?: boolean;
	dont_show?: boolean;
}

/**
 * Work experience information
 */
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

/**
 * Base page parameters
 */
export interface PageParams {
	title: string;
}

/**
 * Page parameters with search functionality
 */
export interface PageWithSearchParams<T> extends PageParams {
	items: Array<T>;
	no_filter_option?: string;
	featured_projects?: string;
	other_projects?: string;
}

/**
 * Home page link information
 */
export interface HomeLink {
	platform: Platform;
	link: string;
	newTab?: boolean;
}

/**
 * Home page parameters
 */
export interface HomePageParams extends PageParams {
	name: string;
	lastName: string;
	description: string;
	links: Array<HomeLink>;
	skills?: Array<Skill>;
}

/**
 * Search page parameters
 */
export interface SearchPageParams extends PageParams {
	prompt: string;
}

/**
 * Project page parameters
 */
export type ProjectPageParams = PageWithSearchParams<Project>;

/**
 * Experience page parameters
 */
export type ExperiencePageParams = PageWithSearchParams<Experience>;

/**
 * Skills page parameters
 */
export type SkillsPageParams = PageWithSearchParams<Skill>;

/**
 * Resume page parameters
 */

/**
 * EmailJS template parameters for contact form
 */
export interface EmailJSTemplateParams {
	name: string;
	email: string;
	message: string;
	to_name: string;
	from_name: string;
	reply_to: string;
	'g-recaptcha-response': string;
	time: string;
	year: string;
}

/**
 * Global type declarations for third-party services
 */
declare global {
	interface Window {
		emailjs: {
			init: (publicKey: string) => void;
			send: (
				serviceId: string,
				templateId: string,
				templateParams: EmailJSTemplateParams
			) => Promise<{ status: number; text: string }>;
		};
		grecaptcha: {
			ready: (callback: () => void) => void;
			execute: (siteKey: string, options: { action: string }) => Promise<string>;
			// Methods for reCAPTCHA v2
			render: (container: string | HTMLElement, parameters: object) => number;
			getResponse: (widgetId?: number) => string;
			reset: (widgetId?: number) => void;
		};
		// Callback for reCAPTCHA
		enableSubmit: () => void;
	}
}

/**
 * Theme-aware color asset
 */
export interface ColorAsset {
	light: string;
	dark: string;
}

import type { Asset } from '$lib/types';
import { theme } from '$lib/stores/theme';
import Rapptr from '$lib/assets/images/rapptr.png';
import Interac from '$lib/assets/images/interac.jpeg';
import Readme from '$lib/assets/images/projects/Readme.png';
import Github from '$lib/assets/images/github.svg';
import Computer from '$lib/assets/images/computer.svg';
import YouTube from '$lib/assets/images/youtube.svg';
import Gatsby from '$lib/assets/images/gatsby.svg';
import Next from '$lib/assets/images/next.svg';
import Slack from '$lib/assets/images/slack.svg';
import Japan from '$lib/assets/images/japan.png';
import Security from '$lib/assets/images/Security.svg';
import React from '$lib/assets/images/react.svg';
import Node from '$lib/assets/images/node.png';
import Svelte from '$lib/assets/images/svelte.png';
import Vue from '$lib/assets/images/vue.png';
import TypeScript from '$lib/assets/images/ts.png';

import anime from '$lib/assets/images/projects/anime.webp';
import blog from '$lib/assets/images/projects/blog.webp';
import haku from '$lib/assets/images/projects/haku.webp';
import niceRiff from '$lib/assets/images/projects/niceRiff.jpeg';
import prefecture from '$lib/assets/images/projects/prefecture.webp';
import quote from '$lib/assets/images/projects/quote.webp';
import flashcard from '$lib/assets/images/projects/flashcard.png';

// screenshots
import mac1 from '$lib/assets/images/projects/screenshots/mac1.png';
import mac2 from '$lib/assets/images/projects/screenshots/mac2.png';
import mac3 from '$lib/assets/images/projects/screenshots/mac3.png';
import mac4 from '$lib/assets/images/projects/screenshots/mac4.png';
import mac5 from '$lib/assets/images/projects/screenshots/mac5.png';
import mac6 from '$lib/assets/images/projects/screenshots/mac6.png';
import mac7 from '$lib/assets/images/projects/screenshots/mac7.png';
import mac8 from '$lib/assets/images/projects/screenshots/mac8.png';

import haku1 from '$lib/assets/images/projects/screenshots/haku1.png';
import haku2 from '$lib/assets/images/projects/screenshots/haku2.png';
import haku3 from '$lib/assets/images/projects/screenshots/haku3.png';
import haku4 from '$lib/assets/images/projects/screenshots/haku4.png';
import haku5 from '$lib/assets/images/projects/screenshots/haku5.png';

export const COLOR_ASSETS = {
	Next: { light: Next, dark: Next },
	Gatsby: { light: Gatsby, dark: Gatsby },
	Japan: { light: Japan, dark: Japan },
	Rapptr: { light: Rapptr, dark: Rapptr },
	Interac: { light: Interac, dark: Interac },
	GitHub: { light: Github, dark: Github },
	Computer: { light: Computer, dark: Computer },
	Youtube: { light: YouTube, dark: YouTube },
	Slack: { light: Slack, dark: Slack },
	Anime: { light: anime, dark: anime },
	Blog: { light: blog, dark: blog },
	Haku: { light: haku, dark: haku },
	Riffs: { light: niceRiff, dark: niceRiff },
	Prefecture: { light: prefecture, dark: prefecture },
	Flashcard: { light: flashcard, dark: flashcard },
	Quote: { light: quote, dark: quote },
	Security: { light: Security, dark: Security },
	Readme: { light: Readme, dark: Readme },
	React: { light: React, dark: React },
	NodeJs: { light: Node, dark: Node },
	Svelte: { light: Svelte, dark: Svelte },
	VueJs: { light: Vue, dark: Vue },
	TypeScript: { light: TypeScript, dark: TypeScript },
	// start of screenshots
	Mac1: { light: mac1, dark: mac1 },
	Mac2: { light: mac2, dark: mac2 },
	Mac3: { light: mac3, dark: mac3 },
	Mac4: { light: mac4, dark: mac4 },
	Mac5: { light: mac5, dark: mac5 },
	Mac6: { light: mac6, dark: mac6 },
	Mac7: { light: mac7, dark: mac7 },
	Mac8: { light: mac8, dark: mac8 },

	Haku1: { light: haku1, dark: haku1 },
	Haku2: { light: haku2, dark: haku2 },
	Haku3: { light: haku3, dark: haku3 },
	Haku4: { light: haku4, dark: haku4 },
	Haku5: { light: haku5, dark: haku5 }
};

let currentTheme: string;
theme.subscribe((v) => (currentTheme = v));

// assets.js
export default COLOR_ASSETS;

export const getAssetURL = (asset: Asset): string => {
	return typeof asset === 'string' ? asset : currentTheme === 'dark' ? asset.dark : asset.light;
};

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
import Japan from '$lib/assets/images/japan.jpeg';
import Security from '$lib/assets/images/Security.svg';
import React from '$lib/assets/images/react.svg';
import Node from '$lib/assets/images/node.png';
import Svelte from '$lib/assets/images/svelte.png';
import Vue from '$lib/assets/images/vue.png';
import TypeScript from '$lib/assets/images/ts.png';
import Zach from '$lib/assets/images/ZacharyStone.png';

import anime from '$lib/assets/images/projects/anime.webp';
import blog from '$lib/assets/images/projects/blog.webp';
import haku from '$lib/assets/images/projects/haku.webp';
import niceRiff from '$lib/assets/images/projects/niceRiff.jpeg';
import prefecture from '$lib/assets/images/projects/prefecture.webp';
import quote from '$lib/assets/images/projects/quote.webp';
import flashcard from '$lib/assets/images/projects/flashcard.png';

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
	Zach: { light: Zach, dark: Zach }
};

let currentTheme: string;
theme.subscribe((v) => (currentTheme = v));

// assets.js
export default COLOR_ASSETS;

export const getAssetURL = (asset: Asset): string => {
	return typeof asset === 'string' ? asset : currentTheme === 'dark' ? asset.dark : asset.light;
};

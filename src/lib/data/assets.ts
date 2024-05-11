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
import Mobile from '$lib/assets/images/react-native.png';

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

import blog1 from '$lib/assets/images/projects/screenshots/blog1.png';
import blog2 from '$lib/assets/images/projects/screenshots/blog2.png';
import blog3 from '$lib/assets/images/projects/screenshots/blog3.png';
import blog4 from '$lib/assets/images/projects/screenshots/blog4.png';

import anki1 from '$lib/assets/images/projects/screenshots/anki1.png';
import anki2 from '$lib/assets/images/projects/screenshots/anki2.png';
import anki3 from '$lib/assets/images/projects/screenshots/anki3.png';
import anki4 from '$lib/assets/images/projects/screenshots/anki4.png';

import prefecture1 from '$lib/assets/images/projects/screenshots/prefecture1.png';
import prefecture2 from '$lib/assets/images/projects/screenshots/prefecture2.png';

// skill images
import japanese1 from '$lib/assets/images/skills/japanese1.jpeg';

// experience images
import alt1 from '$lib/assets/images/experiences/alt1.jpeg';
import rapptr1 from '$lib/assets/images/experiences/rapptr1.png';
import rapptr2 from '$lib/assets/images/experiences/rapptr2.jpeg';
import rapptr3 from '$lib/assets/images/experiences/rapptr3.jpeg';

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
	Mobile: { light: Mobile, dark: Mobile },
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
	Haku5: { light: haku5, dark: haku5 },

	Blog1: { light: blog1, dark: blog1 },
	Blog2: { light: blog2, dark: blog2 },
	Blog3: { light: blog3, dark: blog3 },
	Blog4: { light: blog4, dark: blog4 },

	Anki1: { light: anki1, dark: anki1 },
	Anki2: { light: anki2, dark: anki2 },
	Anki3: { light: anki3, dark: anki3 },
	Anki4: { light: anki4, dark: anki4 },

	Prefecture1: { light: prefecture1, dark: prefecture1 },
	Prefecture2: { light: prefecture2, dark: prefecture2 },

	// skill images
	Japanese1: { light: japanese1, dark: japanese1 },

	// experience images
	Alt1: { light: alt1, dark: alt1 },

	Rapptr1: { light: rapptr1, dark: rapptr1 },
	Rapptr2: { light: rapptr2, dark: rapptr2 },
	Rapptr3: { light: rapptr3, dark: rapptr3 }
};

let currentTheme: string;
theme.subscribe((v) => (currentTheme = v));

// assets.js
export default COLOR_ASSETS;

export const getAssetURL = (asset: Asset): string => {
	return typeof asset === 'string' ? asset : currentTheme === 'dark' ? asset.dark : asset.light;
};

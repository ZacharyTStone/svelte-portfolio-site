import type { Asset } from '$lib/types';
import { theme } from '$lib/stores/theme';
import Japan from '$lib/assets/images/japan.png';
import JapaneseLight from '$lib/assets/images/japanese-black.svg';
import JapaneseDark from '$lib/assets/images/japanese-white.svg';
import Rapptr from '$lib/assets/images/rapptr.png';
import GitHubLight from '$lib/assets/images/github-black.svg';
import GitHubDark from '$lib/assets/images/github-white.svg';
import ComputerLight from '$lib/assets/images/computer-black.svg';
import ComputerDark from '$lib/assets/images/computer-white.svg';
import YouTube from '$lib/assets/images/youtube.svg';
import SlackLight from '$lib/assets/images/slack-black.svg';
import SlackDark from '$lib/assets/images/slack-white.svg';

import anime from '$lib/assets/images/projects/anime.webp';
import blog from '$lib/assets/images/projects/blog.webp';
import haku from '$lib/assets/images/projects/haku.webp';
import niceRiff from '$lib/assets/images/projects/niceRiff.jpeg';
import prefecture from '$lib/assets/images/projects/prefecture.webp';
import quote from '$lib/assets/images/projects/quote.webp';

const gh = (file: string) =>
	`https://raw.githubusercontent.com/RiadhAdrani/slick-portfolio-svelte/assets/logos/${file}`;

const a = (light: string, dark?: string): Asset =>
	dark ? { dark: gh(dark), light: gh(light) } : gh(light);

const Assets = {
	AWS: a('aws.svg'),
	Bootstrap: a('bootstrap.svg'),
	C: a('c.svg'),
	Cpp: a('cpp.svg'),
	Celery: a('celery.svg'),
	Django: a('djanog.svg'),
	FastApi: a('fastapi'),
	Flask: a('flask.svg'),
	Go: a('go.svg'),
	Kafka: a('kafka.svg'),
	Neo4j: a('neo4j.svg'),
	Nginx: a('nginx.svg'),
	Numpy: a('numpy.svg'),
	Pandas: a('pandas.svg'),
	RabbitMQ: a('rabbitmq.svg'),
	Rust: a('rust.svg', 'rust-dark.png'),
	Scrapy: a('scrapy.png'),
	Selenium: a('selenium.svg'),
	Docker: a('docker.svg'),
	Kubernetes: a('kubernetees.svg'),
	Csharp: a('csharp.svg'),
	Xamarin: a('xamarin.svg'),
	TypeScript: a('ts.png'),
	VueJs: a('vue.png'),
	ReactJs: a('react.svg'),
	Dart: a('dart.png'),
	Kotlin: a('kotlin.png'),
	Python: a('python.png'),
	NodeJs: a('node.png'),
	Deno: a('deno.png', 'deno-dark.png'),
	Svelte: a('svelte.png'),
	ExpressJs: a('express.png'),
	JavaScript: a('js.png'),
	Fastify: a('fastify.svg', 'fastify-dark.png'),
	NestJs: a('nest.svg'),
	Quasar: a('quasar.svg'),
	SolidJs: a('solid.svg'),
	Electron: a('electron.png'),
	Flutter: a('flutter.svg'),
	Java: a('java.png'),
	AdonisJs: a('adonis.png'),
	Android: a('android.png'),
	Angular: a('angular.png'),
	PostgreSQL: a('postgres.png'),
	Firebase: a('firebase.png'),
	Sass: a('sass.png'),
	Unknown: a('no-img.svg'),
	MongoDB: a('mongodb.svg'),
	Redis: a('redis.svg'),
	Tailwind: a('tailwind.svg'),
	HTML: a('html.svg'),
	Premiere: a('premiere.svg'),
	Photoshop: a('photoshop.svg'),
	CSS: a('css.svg'),
	AfterEffects: a('after-effects.svg'),
	Illustrator: a('illustrator.svg'),
	Nuxt: a('nuxt.png'),
	Vite: a('vite.png'),
	Vitest: a('vitest.png'),
	Jest: a('jest.png'),
	Japan: { light: JapaneseLight, dark: JapaneseDark },
	Rapptr: { light: Rapptr, dark: Rapptr },
	GitHub: { light: GitHubLight, dark: GitHubDark },
	Computer: { light: ComputerLight, dark: ComputerDark },
	Youtube: { light: YouTube, dark: YouTube },
	Slack: { light: SlackLight, dark: SlackDark },
	Anime: { light: anime, dark: anime },
	Blog: { light: blog, dark: blog },
	Haku: { light: haku, dark: haku },
	Riffs: { light: niceRiff, dark: niceRiff },
	Prefecture: { light: prefecture, dark: prefecture },
	Quote: { light: quote, dark: quote }
};

let currentTheme: boolean;
theme.subscribe((v) => (currentTheme = v));

// assets.js
export default Assets;

export const getAssetURL = (asset: Asset): string => {
	console.log('asset', asset);
	return typeof asset === 'string' ? asset : currentTheme ? asset.dark : asset.light;
};
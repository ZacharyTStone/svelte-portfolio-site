</br>
<p align="center">
    <img src="https://img.shields.io/github/languages/count/ZacharyTStone/svelte-portfolio-site?style=plastic" alt="Languages" />
    <img src="https://img.shields.io/github/languages/top/ZacharyTStone/svelte-portfolio-site?style=plastic&labelColor=yellow" alt="Top Language" />
    <img src="https://img.shields.io/github/languages/code-size/ZacharyTStone/svelte-portfolio-site?style=plastic" alt="Code Size" />
    <img src="https://img.shields.io/github/repo-size/ZacharyTStone/svelte-portfolio-site?style=plastic" alt="Repo Size" />   
    <img src="https://img.shields.io/tokei/lines/github/ZacharyTStone/svelte-portfolio-site?style=plastic" alt="Total Lines" />
    <img src="https://img.shields.io/github/last-commit/ZacharyTStone/svelte-portfolio-site?style=plastic" alt="Last Commit" />  
    <img src="https://img.shields.io/github/issues/ZacharyTStone/svelte-portfolio-site?style=plastic" alt="Issues" />  
    <img src="https://img.shields.io/github/followers/ZacharyTStone?style=social" alt="Followers" />  
</p>

# Zach Stone Portfolio

## Description

A modern, responsive portfolio website built with Svelte and SvelteKit. This project showcases my professional experience, projects, skills, and resume in both English and Japanese.

The site was built using a template as a foundation, which has been significantly customized and extended to meet my personal branding and functional requirements.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with [Svelte 5](https://svelte.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) and [SCSS](https://sass-lang.com/)
- **Icons**: [UnoCSS](https://unocss.dev/) for icon integration
- **Internationalization**: svelte-i18n for multi-language support (English/Japanese)
- **Deployment**: [Vercel](https://vercel.com/)
- **Analytics**: Vercel Analytics and Speed Insights

## Features

- **Responsive Design**: Fully responsive on all device sizes
- **Animations**: Custom animations for enhanced user experience
- **Bilingual Support**: Complete localization in English and Japanese
- **Project Showcase**: Filterable project display with like functionality
- **Skills Section**: Visual representation of technical skills
- **Dark/Light Mode**: Theme toggle for user preference
- **Performance Optimized**: Built with performance in mind

## Project Structure

```plaintext
src/
├── lib/              # Shared component library
│   ├── assets/       # Static assets
│   ├── components/   # Reusable UI components
│   ├── data/         # Data files
│   ├── hooks/        # Custom Svelte hooks
│   ├── locales/      # i18n translation files
│   ├── md/           # Markdown content
│   ├── server/       # Server-side utilities
│   ├── stores/       # Svelte stores
│   └── utils/        # Utility functions
├── routes/           # Application routes
│   ├── about/        # About page
│   ├── experience/   # Experience page
│   ├── projects/     # Projects page
│   ├── resume/       # Resume page
│   ├── search/       # Search functionality
│   └── skills/       # Skills page
├── app.d.ts          # TypeScript declarations
└── app.html          # HTML template
```

## Vercel KV Integration

The project likes functionality uses Vercel KV for data persistence:

1. Set up a KV database in your Vercel project:

   ```bash
   npx vercel link
   npx vercel kv:create my-portfolio-likes
   ```

2. Add the created KV instance to your project:

   ```bash
   npx vercel kv:link my-portfolio-likes
   ```

3. Once deployed, the environment variables will be automatically configured in your Vercel project.

4. For local development, copy `.env.example` to `.env.local` and add your KV API credentials:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your KV credentials
   ```

## Security Considerations for Like Feature

The thumbs up feature implements robust security measures to protect against abuse and attacks:

1. **User Identification**: Users are uniquely identified using a UUID stored in localStorage to track like status while maintaining privacy.

2. **Rate Limiting**:

   - IP-based rate limiting restricts users to 30 likes per hour
   - Rate limit headers provide transparent feedback to clients
   - Prevents brute force attacks and abuse of the API

3. **Input Validation and Sanitization**:

   - All input parameters are validated for format and length
   - Data is sanitized before use in Redis operations
   - Prevents injection attacks and malformed data

4. **Namespace Restrictions**:

   - Redis key access is limited to specific allowed prefixes
   - Prevents unauthorized access to Redis data outside the application's scope
   - All operations are validated against allowed namespaces

5. **Error Handling**:

   - Comprehensive error catching and graceful failure
   - Limited error information in responses to prevent information leakage
   - Detailed server-side logging for diagnostics

6. **Security Headers**:

   - Content-Security-Policy restricts resource loading
   - X-Content-Type-Options prevents MIME type sniffing
   - X-XSS-Protection adds browser-level XSS protection
   - Strict-Transport-Security enforces HTTPS in production
   - X-Frame-Options prevents clickjacking attacks

7. **Environment Variables**:
   - Critical API credentials are stored securely as environment variables
   - No credentials in client-side code
   - Separation of development and production environments

### Required Environment Variables

For the like feature to work in production, you need to set up Redis storage through the Vercel Marketplace:

1. **Redis Setup in Vercel Dashboard**:

   - Go to your Vercel project dashboard
   - Click on "Storage" in the left sidebar
   - Click "Connect Storage"
   - Select "Redis" from the marketplace
   - Follow the instructions to create a new Redis database or connect to an existing one
   - Complete the setup to get your Redis credentials

2. **Environment Variables**:
   After setting up Redis, the following environment variables will be automatically added to your project:

   - `REDIS_URL` - The URL endpoint for your Redis database
   - `REDIS_TOKEN` - The authentication token for your Redis database

3. **Local Development**:
   For local development, copy these credentials to your `.env.local` file:
   ```bash
   cp .env.example .env.local
   # Then add your Redis credentials from the Vercel dashboard
   ```

These environment variables will be automatically set in your Vercel deployments once you've set up the Redis integration.

## Getting Started

### Prerequisites

- Node.js (v16+)
- Yarn or npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/ZacharyTStone/svelte-portfolio-site.git
cd svelte-portfolio-site
```

2. Install dependencies

```bash
yarn install
# or
npm install
```

3. Start the development server

```bash
yarn dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
yarn build
# or
npm run build
```

## License

[![MIT](https://img.shields.io/badge/license-MIT-green?style=plastic)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)

## Contributions

I am not taking contributions to this site at this time.

## Questions and Contact

[![GitHub](https://img.shields.io/badge/My%20GitHub-Click%20Me!-blueviolet?style=plastic&logo=GitHub)](https://github.com/ZacharyTStone)
[![LinkedIn](https://img.shields.io/badge/My%20LinkedIn-Click%20Me!-grey?style=plastic&logo=LinkedIn&labelColor=blue)](https://www.linkedin.com/in/zach-stone-45b649211/)

このプロジェクトに関するご質問は、Zach.Stone.Developer@gmail.com までお気軽にご連絡ください。

Feel free to reach me at Zach.Stone.Developer@gmail.com with any question regarding this project!

# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
SvelteKit 2 + Svelte 5 portfolio site using adapter-static for static site generation. Single-page application architecture: all sections (About, Skills, Projects, Experience, Resume, Contact) are on the landing page with anchor-based navigation. Sub-pages exist at `/projects/[slug]`, `/skills/[slug]`, `/experience/[slug]`, and `/search`.

### Running the dev server
```
yarn dev --host 0.0.0.0
```
Serves at `http://localhost:5173/`. See `package.json` for all available scripts.

### Key gotchas
- **Node version**: `.nvmrc` specifies Node 24.0.0. Use `nvm use` to activate it.
- **Lint**: `yarn lint` runs Prettier then ESLint. Prettier emits deprecation warnings about `--plugin-search-dir` (safe to ignore). ESLint uses the older `eslint-plugin-svelte3` which may fail on some Svelte 5 files — these are pre-existing and not regressions.
- **Type checking**: Use `yarn run check` (not `yarn check` which is a different yarn built-in command).
- **Build**: `yarn build` performs static site generation. The `svelte.config.js` has `handleHttpError` configured to suppress 404s for removed standalone routes that are now SPA sections.
- **Navigation**: The `NavMenu` uses `/#section-id` hash links. Breadcrumbs on sub-pages link intermediate segments (e.g., "Skills") back to the landing page section (`/#skills`) rather than standalone routes.
- **Environment variables**: EmailJS and reCAPTCHA keys (`VITE_EMAILJS_*`, `VITE_RECAPTCHA_*`) are optional — the contact form degrades gracefully without them.

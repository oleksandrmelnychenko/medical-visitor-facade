# Repository Guidelines

This repository contains a Next.js 16 medical appointment website built with the App Router, Sass modules, and a component-based UI architecture.

## Project Structure & Module Organization
- `src/app` hosts route segments and `page.tsx` files (e.g., `src/app/appointment/page.tsx`).
- `src/components` is split into `layout/`, `sections/`, and `ui/` for shared building blocks.
- `src/lib` contains utilities such as `cn` for class name composition.
- `src/styles` holds `globals.scss` and `variables.scss` design tokens.
- `public` contains static assets; `_legacy_backup` is archived code and should remain unchanged.

## Build, Test, and Development Commands
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: create a production build.
- `npm run start`: serve the production build locally.
- `npm run lint`: run ESLint with the Next.js config.

## Coding Style & Naming Conventions
- TypeScript + React with 2-space indentation and double-quoted strings.
- Components are PascalCase (e.g., `RequestAppointment.tsx`); routes are kebab-case folders.
- CSS Modules use kebab-case filenames like `header.module.scss` and are co-located.
- Use `@/*` path aliases for `src/*` imports and `cn()` for conditional classnames.
- Follow CVA patterns for UI variants (see `src/components/ui/button.tsx`).

## Testing Guidelines
No automated test runner is configured in `package.json`. If you introduce tests, add a script (e.g., `npm test`) and keep tests close to their components or under a dedicated folder like `src/__tests__/`.

## Commit & Pull Request Guidelines
- Commit history suggests Conventional Commits (e.g., `feat: rebuild with Next.js SSR`); follow `feat:`, `fix:`, `chore:` where possible.
- Keep messages short and imperative (e.g., `feat: add appointment form validation`).
- PRs should include a concise summary, affected routes/sections, and screenshots for UI changes.
- Note any manual testing steps or lint results in the PR description.

## Agent Notes
For architecture details and patterns, also review `CLAUDE.md`.

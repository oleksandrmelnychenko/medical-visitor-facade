# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 medical appointment website using the App Router with server-side rendering.

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Sass with CSS Modules (`.module.scss` files)
- **Animations**: Motion (Framer Motion)
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom components using class-variance-authority (CVA) pattern
- **Icons**: Lucide React

### Project Structure
```
src/
├── app/                    # Next.js App Router (pages, layouts)
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Input)
│   ├── sections/           # Page sections (feature components)
│   └── layout/             # Header, Footer
├── lib/                    # Utilities (cn function for classnames)
└── styles/
    ├── globals.scss        # Global styles
    └── variables.scss      # CSS custom properties (design tokens)
```

### Key Patterns

**Styling**: Components use co-located SCSS modules. The `cn()` utility from `@/lib/utils` combines CSS module classes with conditional classes:
```tsx
import styles from './component.module.scss';
import { cn } from '@/lib/utils';
<div className={cn(styles.base, someCondition && styles.active)} />
```

**UI Components**: Follow the CVA pattern for variant-based styling (see `src/components/ui/button.tsx`). Variants are defined using SCSS module classes mapped through CVA.

**Path Aliases**: Use `@/*` to import from `src/*`.

**Client Components**: Forms and interactive sections use `"use client"` directive and manage state with React hooks.

### Design Tokens
CSS custom properties are defined in `src/styles/variables.scss`. Key tokens include colors (`--primary`, `--background`, `--muted-foreground`), spacing (`--radius`), and container widths (`--container-*`). Dark mode support via `[data-theme="dark"]` or `.dark` class.

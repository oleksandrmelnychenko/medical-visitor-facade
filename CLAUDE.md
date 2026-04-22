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

Next.js 16 medical agency website using App Router, i18n (de, en, es, ru), and a feature-based source layout.

### Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Sass with CSS Modules (`.module.scss`, co-located with component)
- **Animations**: Motion (`motion/react`)
- **Forms**: Plain React state (no form library); `@/features/apply/wizard/validation.ts` for custom validators
- **i18n**: `next-intl` with messages in `src/messages/{de,en,es,ru}.json`
- **Icons**: `lucide-react`, `@phosphor-icons/react`

### Project Structure

```text
src/
├── app/                            # Next.js routes (thin re-exports to features)
│   ├── [locale]/
│   │   ├── page.tsx                # → features/home/HomePage
│   │   ├── apply/page.tsx          # → features/apply/ApplyPage
│   │   ├── login/page.tsx          # → features/auth/LoginPage
│   │   ├── membership/             # page.tsx + layout.tsx (layout stays in app/)
│   │   ├── privacy-policy/         # page.tsx + layout.tsx
│   │   ├── legal-notice/           # page.tsx + layout.tsx
│   │   └── financial-assistance/   # page.tsx + layout.tsx
│   └── api/                        # API routes (route handlers stay in app/)
│
├── features/                       # Business features (self-contained)
│   ├── home/
│   │   ├── HomePage.tsx            # server entry (default + generateMetadata)
│   │   └── sections/
│   │       ├── hero/ faq/ focus/ approach/ journey/
│   │       ├── locations/ stats/ scroll-rail/ scroll-reveal/
│   ├── apply/
│   │   ├── ApplyPage.tsx           # server entry (cookie redirect + metadata)
│   │   ├── ApplyShell.tsx          # client dispatcher (new / returning / physician)
│   │   ├── FallbackFlow.tsx        # returning/physician form shell
│   │   ├── forms/                  # PhysicianForm, ReturningPatientForm
│   │   └── wizard/                 # new-patient wizard
│   │       ├── NewPatientWizard.tsx
│   │       ├── WizardContext.tsx
│   │       ├── flow.ts types.ts validation.ts submission.ts
│   │       ├── wizardPath.ts progressCookie.ts contactPhone.ts choiceCardStyles.ts
│   │       ├── ui/                 # ChoiceStep, PathTree, ReviewSummary, StepLayout, TrustBanner
│   │       ├── views/              # LateFlow, PatientFlow
│   │       └── steps/              # grouped by zone
│   │           ├── entry/          # MemberCheck, AccountCheck, Welcome
│   │           ├── eligibility/    # Location, BecomeMember, TravelReady, MedicalRecords, ...
│   │           ├── profile/        # PatientName, DateOfBirth, Phone, PrimaryLanguage, ...
│   │           ├── care/           # Services, Address, PrimaryConcern, CurrentTreatment, TravelRisk
│   │           ├── insurance/      # InsuranceIntro, Insurance, InsuranceCoverage
│   │           └── finish/         # WrapUpIntro, PreferredLocation, VisitTiming, AnythingElse, ReviewSubmit
│   ├── auth/
│   │   ├── LoginPage.tsx           # server entry
│   │   └── LoginForm.tsx           # client form
│   ├── membership/
│   │   ├── MembershipPage.tsx
│   │   └── MembershipComparison.tsx
│   └── legal/
│       ├── privacy-policy/PrivacyPolicyPage.tsx
│       ├── legal-notice/LegalNoticePage.tsx
│       └── financial-assistance/FinancialAssistancePage.tsx
│
├── shared/                         # Cross-feature code
│   ├── layout/                     # Header, Footer, NavigationHoverGuard
│   ├── ui/
│   │   ├── form/                   # Form.module.scss (used by auth + wizard)
│   │   ├── section/                # SectionHeader, Section.module.scss
│   │   ├── cookie-consent/
│   │   ├── hover-sound/
│   │   └── music-toggle/
│   ├── seo/json-ld/                # JSON-LD helpers (breadcrumb, FAQ, organization, website)
│   └── lib/                        # cn.ts, encryption.ts, seo.ts
│
├── i18n/                           # next-intl config
├── messages/                       # Translations (de, en, es, ru — 645 keys each)
└── styles/                         # globals.scss, variables.scss
```

### Conventions

- **Folders** are kebab-case (`features/home/`, `home/hero/`, `steps/entry/`).
- **Component files** are PascalCase (`Hero.tsx`, `MemberCheck.tsx`).
- **CSS module files** match component name (`Hero.module.scss`).
- **Utility files** are camelCase for multi-word (`wizardPath.ts`, `progressCookie.ts`), lowercase for single-word (`flow.ts`, `types.ts`).
- **CSS class names** inside `.module.scss` are camelCase (accessed as `styles.videoFrame`).
- **No Step/Shared/Wizard prefixes** on filenames when folder already gives the context (`wizard/ui/StepLayout.tsx`, not `WizardStepLayout.tsx`; `steps/entry/MemberCheck.tsx`, not `MemberCheckStep.tsx`).
- **Path alias**: single `@/*` → `src/*`. Prefer absolute `@/shared/...` or `@/features/...` over long `../../../` relatives.

### Route → feature wiring

Every `src/app/[locale]/**/page.tsx` is a one-line re-export from the matching feature page:

```tsx
export { default, generateMetadata } from "@/features/<area>/<slug>/<X>Page";
```

`layout.tsx` files stay in `src/app/[locale]/**/` because they are a Next.js route concern (metadata inheritance, breadcrumb JSON-LD wrapping).

### Key patterns

**Styling**: `cn()` utility from `@/shared/lib/cn` combines CSS-module classes with conditionals:

```tsx
import styles from "./Component.module.scss";
import { cn } from "@/shared/lib/cn";
<div className={cn(styles.base, isActive && styles.active)} />
```

**Server vs client**: Feature pages export server components by default (`<Feature>Page.tsx`). Interactive bits live in separate client components (`<Feature>Form.tsx`, `<Feature>Shell.tsx`) with `"use client"`.

**Design tokens**: `src/styles/variables.scss` holds CSS custom properties (colors, spacing, container widths). Dark mode via `[data-theme="dark"]`.

**Submission flow**: `src/features/apply/wizard/submission.ts` builds a `SubmissionBundle` and posts to `/api/apply/submit`, which forwards to a generic `LEAD_INTAKE_URL` endpoint (not Salesforce — naming was historical).

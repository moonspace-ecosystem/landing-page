# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**
```bash
npm run dev          # Build and run with Node.js server (port 5173)
npm run start        # Run with Vite dev server and SSR mode
npm run dev:vite     # Run Vite in SSR mode directly
```

**Build commands:**
```bash
npm run build        # Full Qwik build
npm run build.client # Vite client build
npm run build.server # Vite server build with static adapter
npm run preview      # Build and preview
```

**Type checking:**
```bash
npm run typecheck    # TypeScript type checking (no emit)
npm run build.types  # Incremental TypeScript build
```

## Architecture Overview

**Framework:** This is a **Qwik** application (not React), using Qwik City for routing and SSR. The codebase has been migrated from React to Qwik but retains React-like patterns.

**Key Technologies:**
- Qwik framework with Qwik City for routing
- TypeScript with strict mode
- TailwindCSS for styling
- Vite as build tool
- Environment-based configuration system

**Project Structure:**
- `src/routes/` - Qwik City routes (layout.tsx, index.tsx)
- `src/components/` - Reusable Qwik components (organized by feature)
- `src/config/appConfig.ts` - Centralized configuration using environment variables
- `src/root.tsx` - Root Qwik application component
- `src/global.css` - Global styles

**Configuration System:**
All app configuration is handled through environment variables via `src/config/appConfig.ts`. The `useConfig()` hook provides access to business config, crypto wallets, contact info, etc. Environment variables must have `VITE_` prefix for client-side access.

**Component Architecture:**
- Components use Qwik's `component$()` function
- Props and state management follow Qwik patterns
- Form components integrate with Google Sheets API (see ENVIRONMENT_VARIABLES.md)

**Styling:**
- TailwindCSS with gradient themes (purple/pink/dark)
- Responsive design patterns
- Dark theme with glassmorphism effects

## Environment Setup

Copy `.env.example` to `.env` and configure:
- Google Sheets API credentials for form submissions
- Business branding variables (company name, tagline, funding info)
- Crypto wallet addresses for donations
- See `ENVIRONMENT_VARIABLES.md` for complete variable list

The application has fallback behavior when environment variables are missing, but Google Sheets integration requires proper API setup (see `GOOGLE_SHEETS_SETUP.md`).

## Important Notes

- This is a **Qwik application**, not React - use Qwik APIs and patterns
- All client-side environment variables need `VITE_` prefix
- Configuration is centralized in `src/config/appConfig.ts`
- Forms integrate with Google Sheets API for data collection
- TypeScript paths use `~/*` alias for `./src/*`
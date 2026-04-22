---
name: Project Overview
description: Bitcoin portfolio tracker app — stack, features, pages, i18n, database schema, current status
type: project
---

## Stack
- **Framework:** Next.js 14 (App Router), TypeScript 5, React 18
- **Backend/Auth:** Supabase (PostgreSQL + RLS + email/password auth)
- **Styling:** Plain CSS (`src/app/globals.css`) — no Tailwind/CSS modules
- **Charts:** Chart.js (BTC history), TradingView widget (metrics page)
- **Fonts:** Montserrat via `next/font/google` (CSS var `--font-montserrat`), applied on `<html>` in layout.tsx
- **Price data:** CoinGecko (current BTC price via `/api/btc-price`), Stooq API (comparison assets via `/api/asset-quotes`)
- **Fear & Greed:** Alternative.me API via `/api/fear-greed`
- **Locale:** German (de-DE) number formatting, EUR currency

## Pages (src/app/)
| Route | File | Auth required |
|---|---|---|
| `/` | `page.tsx` | No (redirects logged-in users to /dashboard) |
| `/dashboard` | `dashboard/page.tsx` | Yes |
| `/sell-simulation` | `sell-simulation/page.tsx` | Yes |
| `/reset-password` | `reset-password/page.tsx` | No |
| `/what-is-bitcoin` | `what-is-bitcoin/page.tsx` | No |
| `/become-a-bitcoiner` | `become-a-bitcoiner/page.tsx` | No |
| `/investment-strategies` | `investment-strategies/page.tsx` | No |
| `/metrics` | `metrics/page.tsx` | No |
| `/tribute` | `tribute/page.tsx` | No |

## Components (src/components/)
- **LandingHeader** — fixed top nav with BTC price, language picker, Members Zone button, settings
- **DashboardHeader** — logged-in nav with portfolio selector and logout
- **WelcomeSection** — landing page welcome with dual heartbeat Bitcoin logos and HODL signature (bitcointalk link)
- **BtcHistoricalChart** — Chart.js BTC price history chart
- **SummarySection** — community aggregate portfolio stats (visible to all)
- **CalculatorsSection** / **CalculatorSection** / **DcaCalculatorSection** — BTC/EUR calculators and DCA tool
- **InvestmentsTable** — CRUD table for transactions in dashboard
- **LoginForm** — email/password login with Supabase
- **MemberSettingsModal** / **SettingsMenu** / **ChangePasswordModal** — settings UX
- **LanguagePicker** — UI to switch language (triggers `language-changed` event)
- **LectureToggle** — toggle for educational content sections
- **StatsGrid** — grid of community stats cards
- **Footer** — page footer
- **Logos** — partner/trust logos
- **TranslationGate** — wraps app, loads all translations before rendering children

## Hooks (src/hooks/)
- `useAuth` — Supabase session state
- `useBtcPrice` — polls `/api/btc-price` for live price
- `useInvestments` — CRUD for transactions via investmentsService
- `usePortfolioSummary` — aggregate portfolio stats
- `useCalculator` — simple BTC↔EUR calculator state
- `useDcaCalculator` — DCA calculator state
- `useHistoricalBtcPrices` — loads historical prices from Supabase
- `useLanguage` — subscribes to `language-changed` event, exposes current lang
- `useT(file)` — returns a `t(key)` function scoped to a translation file

## Services (src/services/)
- `supabaseClient` — singleton Supabase client
- `investmentsService` — CRUD for investments table
- `portfolio` — CRUD for portfolios table
- `members` — member profile read/update
- `btc` — BTC price fetch helpers
- `assetsHistory` — load daily asset prices from Supabase
- `sellSimulationService` — FIFO sell simulation logic, saves result as sell transaction

## i18n System (src/utils/i18n.ts + src/translations/)
- **8 languages:** `en`, `ca`, `es`, `fr`, `de`, `zh`, `ar`, `ru`
- **11 translation files per language:** `navbar`, `common`, `landing`, `investment-strategies`, `metrics`, `become-a-bitcoiner`, `what-is-bitcoin`, `tribute`, `dashboard`, `settings`, `sell-simulation`
- Language auto-detected from browser (`navigator.languages`), Catalan prioritized over Spanish
- Persisted in localStorage key `app_language`
- Dynamic imports per file — only loads what's needed; cache prevents re-fetching
- `t('file.key')` → current lang → English fallback → raw key (never throws)
- `TranslationGate` calls `loadAllTranslations` before first render to avoid flash of raw keys
- Translations edited via Python scripts (run without asking permission)

## Database Tables
- **members** — `member_id`, `user_id` (FK to auth), `email`, `display_name`, `visibility_summary` (bool), `taxes` (decimal e.g. 0.19)
- **portfolios** — `portfolio_id`, `member_id` (FK), `name`; unique (member_id, name)
- **investments** — `investments_id`, `portfolio_id` (FK), `type` (buy/sell/transfer-in/transfer-out), `btc_amount`, `eur_amount`, `price`, `date_swap`, `notes`, `commission`, `guaranteed`
- **assets_daily_prices** — `price_date` (PK), `btc_eur`, `gold_eur`, `sp500_eur`, `ibex35_eur` + source columns
- All user data protected by Supabase RLS policies

## Key Features
- Multi-portfolio management (create/rename/delete)
- Transaction CRUD (buy/sell/transfer-in/transfer-out)
- Portfolio analytics: total BTC, invested, avg price, profit/loss, taxes
- **FIFO sell simulator:** BTC-mode and EUR-mode; binary search for post-tax target; saves result as sell transaction
- Community dashboard: aggregate stats for opted-in members
- DCA calculator, simple BTC↔EUR calculator, BTC historical chart, comparison assets
- Password reset flow, member settings (tax rate, visibility)
- Educational public pages: What is Bitcoin, Become a Bitcoiner (both with TOC and scroll-offset fix), Investment Strategies, Metrics
- Tribute page with heartbeat Bitcoin animation (keyframes `tribute-beat` / `tribute-aura`)

## CSS Conventions
- All CSS in `globals.css`; class names kebab-case by component prefix (e.g. `istrat-`, `wib-`, `bbtc-`, `welcome-`, `landing-`)
- Fixed nav height: CSS var `--top-nav-height: 84px`
- Mobile breakpoint: 900px (changed from 768px)
- `scroll-margin-top: calc(var(--top-nav-height) + 16px)` on anchor sections (`.wib-section`, `.bbtc-section`) to offset fixed nav
- Heartbeat animation: `tribute-beat` (scale pulse) + `tribute-aura` (glow pulse), reused on landing WelcomeSection logos

## Current Status (as of 2026-04-23)
- Latest commit: `e4f05ff` — welcome section max-width 950px
- All public pages are multilingual (8 languages)
- Project is functional; ongoing UX/content polish
- Previously developed with Codex; continuing with Claude Code
- Gaps: no bulk transaction import, no export, EUR-only, limited reporting

**Why:** Provides full context for all future assistance on this project.
**How to apply:** Reference this when helping with any feature, bug, architecture decision, or i18n work.

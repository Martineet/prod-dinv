---
name: Project Overview
description: Bitcoin portfolio tracker app — stack, features, database schema, current status
type: project
---

## Stack
- **Framework:** Next.js 14 (App Router), TypeScript 5, React 18
- **Backend/Auth:** Supabase (PostgreSQL + RLS + email/password auth)
- **Styling:** Plain CSS (globals.css)
- **Charts:** Chart.js
- **Price data:** CoinGecko (current BTC), Stooq API (comparison assets)
- **Locale:** German (de-DE) number formatting, EUR currency

## Database Tables
- **members** — user profiles; `member_id`, `user_id` (FK to auth), `email`, `display_name`, `visibility_summary` (bool), `taxes` (decimal e.g. 0.19)
- **portfolios** — `portfolio_id`, `member_id` (FK), `name`; unique (member_id, name)
- **investments** — `investments_id`, `portfolio_id` (FK), `type` (buy/sell/transfer-in/transfer-out), `btc_amount`, `eur_amount`, `price`, `date_swap`, `notes`, `commission`, `guaranteed`
- **assets_daily_prices** — `price_date` (PK), `btc_eur`, `gold_eur`, `sp500_eur`, `ibex35_eur` + source columns
- All user data protected by Supabase RLS policies

## Key Features
- Multi-portfolio management (create/rename/delete)
- Transaction CRUD (buy/sell/transfer-in/transfer-out)
- Portfolio analytics: total BTC, invested, avg price, profit/loss, taxes
- **FIFO sell simulator** (v0, latest feature): BTC-mode and EUR-mode; binary search for post-tax target; saves result as sell transaction
- Community dashboard: aggregate stats for opted-in users
- DCA calculator, simple calculator, BTC historical chart, comparison assets
- Password reset flow, member settings (tax rate, visibility)

## Structure
- `src/app/` — pages: `/`, `/dashboard`, `/sell-simulation`, `/reset-password`
- `src/components/` — 16 React components
- `src/hooks/` — 7 hooks: useAuth, useBtcPrice, useInvestments, usePortfolioSummary, useCalculator, useDcaCalculator, useHistoricalBtcPrices
- `src/services/` — supabaseClient, investmentsService, portfolio, members, btc, assetsHistory, sellSimulationService
- `src/lib/` — types.ts, calculations.ts, format.ts, constants.ts
- `database/` — SQL migrations
- `docs/` — email templates

## Current Status (as of 2026-04-10)
- Latest commit: "FIFO sell simulator v0"
- Project is functional and near-complete
- Previously developed with Codex; now continuing with Claude Code
- Gaps: no bulk transaction import, no export, EUR-only, limited reporting

**Why:** Provides full context for all future assistance on this project.
**How to apply:** Reference this when helping with any feature, bug, or question about the app.
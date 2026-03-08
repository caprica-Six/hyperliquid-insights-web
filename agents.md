# Agents for hyperliquid-insights-web

This document describes the purpose and scope of lightweight agents (Cursor skills) for this repository and gives examples and expectations for their behavior.

## Purpose

- Help contributors automate routine tasks (fix lint/format, run tests, add small components, update docs).
- Provide a small, safe skill that has scoped access to the repository and follows simple rules.

## Scope & Access

- Files the skill may read and update (by default):
  - `app/**`, `components/**`, `lib/**`, `mock-data/**`, `types/**`
  - Project meta files: `package.json`, `tsconfig.json`, `next.config.ts`, `README.md`
- The skill should avoid touching secret/credential files and should never commit literal secrets.

## Expectations / Workflow

- Before making changes, run the following locally (or instruct the user to run):
  - `npm run lint` — verify lint passes
  - `npm run format` — apply formatting
  - `npm test` — run unit tests (`vitest`)
- For non-trivial changes, include or update tests and documentation.
- Prefer TypeScript (`.ts`, `.tsx`) changes; do not add plain JavaScript files unless requested.

## Example agent tasks

- Add a new UI component in `components/` following existing patterns.
- Fix a failing unit test and add a test that covers the regression.
- Improve a helper in `lib/`, update types in `types/`, and run format/tests.

## Prompts / Examples

Example 1 — small feature addition:

User: "Add a `MarketCard` component that displays market name, price, and 24h change following our `ui/card` pattern. Add a test under `components/` and update `components/index.tsx` if needed."

Assistant: "I will add `components/MarketCard.tsx`, a simple test at `components/MarketCard.test.tsx`, and wire it in. I will run `prettier` formatting and ensure tests pass locally; I will not commit if tests fail."

Example 2 — fix formatting & lint:

User: "Fix formatting and lint errors in `lib/format.ts`."

Assistant: "I will run `prettier` and `eslint --fix` for the repository, and report any remaining lint failures for manual review."

## Safety notes

- Do not introduce or commit secrets (API keys, tokens, .env values). If a change requires secrets, document required env vars instead.
- For breaking or large changes, create a PR and include test coverage and a clear description.

## Where skills and rules live

- Cursor skill: `.cursor/skills/nextjs-insights-skill.yaml` (included in this repository).
- Rules will live under `.cursor/` (for example `.cursor/rules.yaml`) and should be kept simple and extendable.

# Claude Instructions for hyperliquid-insights-web

This file mirrors the project agent guidance so Claude-compatible tools can discover repository conventions.

## Core workflow

- Run `npm run lint`, `npm run format`, and `npm test` before finishing non-trivial changes.
- Prefer TypeScript changes in `app/**`, `components/**`, `lib/**`, and `types/**`.
- Update tests/docs when behavior changes.

## Safety

- Never commit secrets (`.env*`, API keys, tokens, credentials).
- For large or breaking changes, include clear migration/testing notes.

## Notes

- Existing project guidance is currently maintained in `AGENTS.md`

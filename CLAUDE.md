# CLAUDE.md

Instructions for AI coding agents working on the WhatCanICook mobile app.

## Project

WhatCanICook is a mobile-first community recipe app: users select ingredients they have and get ranked recipe matches, with missing required ingredients shown. Users can submit recipes, which stay private until a moderator approves them.

This repository is the Expo app. The Go backend and all project documentation live in the separate `whatcanicook-api` repository.

- Mobile: React Native, Expo, TypeScript, Expo Router, TanStack Query

## Where the documentation is

The documentation is NOT in this repository. It is in `whatcanicook-api/docs/`. Assume both repositories are cloned side by side, so the docs are at `../whatcanicook-api/docs/`. If that path is not available, ask the developer for the relevant document instead of assuming its content.

## Rules

1. Read the relevant documents (PRD, API, TESTING, TECH-STACK) before changing code.
2. Make small, focused changes. Implement one task at a time.
3. Do not implement unrelated features or add dependencies without a clear need.
4. Add or update tests for important behavior and states.
5. Run the relevant checks and report their actual results. Never invent successful test results.
6. Never expose secrets or copy real credentials into tracked files. Use `.env.example` with placeholder values.
7. Ask before making destructive or broad changes.
8. If an assumption blocks the work, explain it instead of silently inventing behavior.

## API contract

- The API contract is `docs/API.md` in the API repository. Never invent endpoints, fields, or error shapes.
- If the API behaves differently from the documentation, or the documentation is missing something, stop and flag it. API changes are made and documented in the API repository first.

## Conventions

- All mobile code is TypeScript.
- All API calls go through one shared client module (`src/lib/api.ts`).
- Use TanStack Query for remote server state.
- Use Expo Router for navigation.
- Validate forms with React Hook Form and Zod when forms are added.
- Tests use Jest via `jest-expo` and React Native Testing Library (approved in the Milestone 1 plan).
- Styling with NativeWind is deferred to Milestone 2.
- Do not upgrade major versions without checking compatibility and running the tests.

## Workflow

Plan, then wait for approval, then implement one vertical slice, then verify, then review the diff, then commit.

Commit messages use conventional commits, for example `feat(mobile): add API client and connectivity check screen`.

## Current status

Milestone 1 (Project Foundation) is in progress. The Expo app is not initialized yet. Commands will be listed here as each task lands.
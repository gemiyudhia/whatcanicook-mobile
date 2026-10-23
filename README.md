# WhatCanICook Mobile

React Native (Expo) app for WhatCanICook, a recipe discovery and community app that helps people cook with ingredients they already have.

The backend API and all project documentation live in the separate `whatcanicook-api` repository.

## Status

Milestone 1: Project Foundation (in progress).

## Documentation

All project documents are in the API repository:
[whatcanicook-api/docs](https://github.com/YOUR-GITHUB-USERNAME/whatcanicook-api/tree/main/docs)

Start with the PRD, the API specification, and the testing strategy.

## Technology

React Native, Expo, TypeScript, Expo Router, TanStack Query.

## Local Setup

Requirements: Node.js (LTS) and the Expo Go app on your phone. The phone and the computer must be on the same Wi-Fi network.

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go. If the phone cannot connect, try `npx expo start --tunnel`.

### Checks

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
```

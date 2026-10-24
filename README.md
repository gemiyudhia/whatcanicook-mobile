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

### Configuration

Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL` to the address of the API **as seen from your phone**, for example `http://192.168.1.10:8080`. `localhost` will not work, because it points to the phone itself. Find your computer's address with `ipconfig` (IPv4 address of the Wi-Fi adapter).

The API must be running (see the `whatcanicook-api` repository) and reachable from the phone. Restart the dev server with `npx expo start --clear` after changing `.env`.

Scan the QR code with Expo Go. If the phone cannot connect, try `npx expo start --tunnel`.

### Checks

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
```

# AI Mystery Room

A responsive, AI-powered detective game. Write a premise, investigate generated suspects and evidence, discover clues, request limited hints, accuse a suspect, and receive a server-calculated score and solution.

## Features

- Gemini mystery generation with Zod validation and a controlled retry.
- Difficulty-based suspect, clue, hint, and base-score rules.
- Persistent MongoDB cases and server-owned progress.
- One-time clue rewards, limited hints, protected accusation, and final scoring.
- Culprit and solution fields are excluded from normal case API responses.
- Responsive React interface for the full investigation flow.

## Stack

React, Vite, React Router, Axios, Express, MongoDB/Mongoose, Google Gemini (`@google/genai`), and Zod.

## Architecture

The browser uses Axios to call the Express REST API. The API validates input, asks Gemini for structured fictional case data, validates it with Zod, and persists game state in MongoDB. Culprit and solution fields are excluded from ordinary Mongoose queries and safe case responses; only accusation and completed-result handlers explicitly retrieve them.

## Local setup

1. Use Node.js 20.19+ or 22.12+.
2. In `server/`, install dependencies with `npm install`, copy `.env.example` to `.env`, and set `MONGODB_URI`, `GEMINI_API_KEY`, and `CLIENT_URL`.
3. Start the API from `server/` with `npm run dev` (default port 5000).
4. In `client/`, install dependencies with `npm install`, copy `.env.example` to `.env`, and set `VITE_API_URL` to the API origin.
5. Start Vite from `client/` with `npm run dev` (default port 5173).

Do not commit `.env` files. The Gemini key and MongoDB URI belong only in the backend environment.

## API overview

- `POST /api/cases` — generate and save a case.
- `GET /api/cases/:id` — retrieve safe investigation state.
- `POST /api/cases/:id/clues/:clueId/discover` — discover a clue once.
- `POST /api/cases/:id/hints` — request a limited hint.
- `POST /api/cases/:id/accuse` — submit the final accusation and receive the result.
- `GET /api/cases/:id/result` — retrieve a result only after completion.
- `GET /api/health` — API/database readiness.

## Deployment

Deploy the Express server to a Node.js host and set `PORT`, `MONGODB_URI`, `GEMINI_API_KEY`, and `CLIENT_URL` in its environment. `CLIENT_URL` may contain comma-separated allowed origins. Deploy `client/` to Vercel and set `VITE_API_URL` to the deployed backend origin. Set the same values in the corresponding platform build/runtime environments, then verify case creation through final results on the live site.

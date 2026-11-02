# AI Mystery Room — Software Specification

**Version:** 1.0  
**Project Name:** AI Mystery Room  
**Development Approach:** Spec-Driven Development  
**Primary AI:** Google Gemini  
**Architecture:** MERN Stack  
**Document Purpose:** Single source of truth for implementation

---

# 1. Project Overview

## 1.1 Project Description

AI Mystery Room is an AI-powered interactive mystery-solving web application.

The user provides a short scenario, situation, or story premise. Based on this premise, the backend uses the Gemini API to generate a fictional investigation containing:

- A mystery story
- A hidden culprit
- Multiple suspects
- Motives and backgrounds
- Evidence and clues
- Investigation details
- Hints
- Evidence such as WhatsApp-style messages, CCTV-style observations, images or image descriptions, timestamps, and other fictional proof

The user investigates the case by reviewing suspects and evidence, discovering clues, and requesting hints when necessary.

At the end of the investigation, the user selects the person they believe is the culprit.

The backend evaluates the accusation, calculates the score, and reveals the correct culprit and explanation.

The application must provide a complete playable mystery experience from case creation to final verdict.

---

# 2. Problem Statement

Traditional mystery games usually provide fixed stories and predetermined evidence.

AI Mystery Room aims to create a dynamic experience where each mystery can be generated based on the user's own scenario and selected difficulty.

The system should use AI to create logically consistent fictional investigations while keeping the final solution hidden from the player until an accusation is submitted.

The project demonstrates:

- AI integration
- Full-stack web development
- REST API development
- Database management
- Structured AI output validation
- Backend security
- Interactive UI development
- Game logic
- Deployment

---

# 3. Project Goals

The application must:

1. Allow users to enter a mystery premise.
2. Allow users to select a difficulty level.
3. Generate a complete fictional mystery using Gemini.
4. Generate multiple suspects.
5. Generate clues and evidence.
6. Generate hints.
7. Allow users to investigate the case.
8. Track discovered clues.
9. Allow users to request hints.
10. Allow users to accuse a suspect.
11. Validate the accusation on the backend.
12. Calculate the final score on the backend.
13. Reveal the culprit only after accusation.
14. Display an explanation of the solution.
15. Allow users to start another mystery.
16. Work correctly on the deployed website.

---

# 4. Target Users

The target users are:

- Students
- Casual gamers
- Mystery and detective game enthusiasts
- People interested in AI-powered applications
- Users who enjoy puzzles and problem solving

The application should be simple enough for a first-time user to understand without instructions.

---

# 5. User Experience

The experience should feel like a digital detective investigation.

The user should:

1. Enter a scenario.
2. Start an investigation.
3. Read the case story.
4. Review suspects.
5. Investigate evidence.
6. Discover clues.
7. Request hints when necessary.
8. Form a theory.
9. Accuse a suspect.
10. Receive a final verdict and score.

The UI should feel mysterious, investigative, modern, and engaging while remaining clean and easy to use.

---

# 6. Technology Stack

## 6.1 Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios

## 6.2 Backend

- Node.js
- Express.js
- JavaScript

## 6.3 Database

- MongoDB
- MongoDB Atlas
- Mongoose

## 6.4 AI

- Google Gemini API
- `@google/genai`

## 6.5 Validation

- Zod

## 6.6 Development

- VS Code
- Git
- GitHub
- Codex

## 6.7 Deployment

Frontend:
- Vercel

Backend:
- A suitable Node.js hosting platform

Database:
- MongoDB Atlas

---

# 7. Application Architecture

The application follows a client-server architecture.

```text
                    USER
                      |
                      v
             REACT FRONTEND
                      |
                   Axios
                      |
                      v
              EXPRESS BACKEND
                 /         \
                /           \
               v             v
         MongoDB Atlas     Gemini API
               |             |
               |             |
               └──────┬──────┘
                      |
                      v
                GAME LOGIC
                      |
                      v
                FINAL RESULT
```

The frontend must never directly communicate with Gemini.

All Gemini API requests must be handled by the backend.

---

# 8. Project Structure

The expected project structure is:

```text
ai-mystery-room/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── SPEC.md
├── README.md
├── .gitignore
└── package.json
```

The exact folder structure may be adjusted if necessary, but the separation between frontend and backend must remain clear.

---

# 9. Core User Flow

## Step 1 — Home

The user opens the application.

The Home page displays:

- Application name
- Short description
- Short explanation of how the game works
- Start Mystery button

Clicking Start Mystery navigates to Create Mystery.

---

# 10. Create Mystery Page

The user enters a scenario or premise.

Example:

> "A valuable necklace disappeared during a family dinner."

The user also selects a difficulty.

Available difficulties:

- Easy
- Medium
- Hard

The page contains:

- Scenario text area
- Difficulty selector
- Generate Mystery button

Validation:

- Scenario cannot be empty.
- Scenario should have a reasonable maximum length.
- Difficulty must be one of Easy, Medium, or Hard.

When the user clicks Generate Mystery:

```text
Frontend
   ↓
POST /api/cases
   ↓
Backend
   ↓
Gemini
   ↓
Validate generated response
   ↓
Save case to MongoDB
   ↓
Return safe case data
   ↓
Investigation Room
```

A loading state must be displayed while the mystery is being generated.

---

# 11. Difficulty Rules

The number of suspects, clues, and hints depends on difficulty.

| Difficulty | Suspects | Clues | Hints | Correct Base Score |
|------------|----------|-------|-------|---------------------|
| Easy | 3 | 5 | 2 | 100 |
| Medium | 4 | 7 | 3 | 150 |
| Hard | 5 | 9 | 3 | 200 |

The backend must enforce these values.

The frontend must not be trusted to determine scoring or game rules.

---

# 12. Investigation Room

The Investigation Room is the main gameplay screen.

It must display:

## Case Information

- Mystery title
- Case story
- Difficulty
- Investigation progress

## Suspects

Each suspect card should show:

- Name
- Short description
- Relationship to the case
- Background
- Possible motive
- Basic information

The suspect card must not reveal whether the suspect is the culprit.

## Evidence

Evidence can include different fictional formats.

Examples:

- Text clue
- WhatsApp-style message
- Email-style message
- CCTV-style observation
- Timestamp
- Location information
- Image or image description
- Object found at the crime scene
- Witness statement

Evidence must be clearly marked as fictional/game content.

## Clue Discovery

Clues should initially be undiscovered.

The user can click an available clue to discover it.

When a clue is discovered:

- Its content becomes visible.
- The backend records that it was discovered.
- The user's score increases by 5 points.

The same clue must not award points more than once.

---

# 13. Evidence Design

The system should support evidence objects with fields such as:

```text
id
type
title
description
content
timestamp
location
isDiscovered
```

Possible evidence types:

```text
text
message
cctv
image
witness
document
object
```

The first version may use text-based representations for complex evidence.

For example, a CCTV item can be displayed as:

```text
CCTV RECORDING

Location: Main Entrance
Time: 9:42 PM

Observation:
A person wearing a dark jacket entered the building.
```

A WhatsApp-style message can be displayed as a chat interface.

Actual video generation is not required for the MVP.

Actual AI image generation is optional and must not block the core application.

---

# 14. Hint System

Users can request hints while investigating.

The number of hints is limited according to difficulty.

Easy:
- 2 hints

Medium:
- 3 hints

Hard:
- 3 hints

Each hint used:

```text
Score -10
```

The backend must track the number of hints used.

A user cannot request more hints than the allowed limit.

Hints should help the user connect evidence without directly revealing the culprit.

Example:

Bad hint:

> "John is the culprit."

Good hint:

> "Look closely at the timestamp of the message and compare it with the CCTV evidence."

---

# 15. Accusation Page

After investigating the case, the user can proceed to accusation.

The page displays:

> Who do you think is the culprit?

The user selects one suspect.

The page contains:

- Suspect selection
- Submit Accusation button

The accusation is sent to:

```text
POST /api/cases/:id/accuse
```

The backend performs the evaluation.

The frontend must never determine whether the accusation is correct.

---

# 16. Result Page

After the accusation is submitted, the backend returns the final result.

The Result page displays:

- Correct/Incorrect verdict
- Culprit
- User's accusation
- Final score
- Explanation of the solution
- Important evidence supporting the solution
- Play Again button

Example:

```text
CASE SOLVED

Your Accusation:
Alex

Correct Culprit:
Alex

Verdict:
Correct!

Score:
165

Why?

The CCTV timestamp, message history, and witness statement
show that Alex had access to the room at the relevant time.
```

If the accusation is incorrect:

```text
CASE RESULT

Your Accusation:
John

Verdict:
Incorrect

The actual culprit was:
Alex

Explanation:
...
```

The result must only be available after an accusation.

---

# 17. Scoring System

Scoring must be implemented on the backend.

## Base Score

Easy:

```text
100
```

Medium:

```text
150
```

Hard:

```text
200
```

## Clue Score

Each unique discovered clue:

```text
+5
```

## Hint Penalty

Each hint:

```text
-10
```

## Correct Accusation

The base score is awarded when the accusation is correct.

If the accusation is incorrect, the base score is not awarded.

Final score formula:

```text
Correct accusation:
Base Score + (Discovered Clues × 5) - (Hints Used × 10)

Incorrect accusation:
(Discovered Clues × 5) - (Hints Used × 10)
```

Minimum score:

```text
0
```

The backend must never return a negative score.

The backend must calculate the score independently using stored game state.

---

# 18. Database Model

Create a `Case` model.

Suggested structure:

```text
Case
│
├── title
├── premise
├── story
├── difficulty
├── suspects[]
├── clues[]
├── hints[]
├── evidence[]
├── culprit
├── solution
├── playerProgress
├── accusation
├── score
├── status
├── createdAt
└── updatedAt
```

## Suspect

```text
{
  id,
  name,
  age,
  description,
  relationship,
  motive
}
```

## Clue

```text
{
  id,
  title,
  description,
  importance,
  isDiscovered
}
```

## Hint

```text
{
  id,
  text
}
```

## Evidence

```text
{
  id,
  type,
  title,
  description,
  content,
  timestamp,
  location
}
```

## Player Progress

```text
{
  discoveredClues[],
  hintsUsed,
  currentStage
}
```

## Accusation

```text
{
  suspectId,
  submittedAt
}
```

---

# 19. Security Requirement

The most important security rule is:

## Never expose the culprit before the accusation.

The backend database can contain:

```text
culprit
solution
```

but these values must not be included in normal case responses.

For example, this response is NOT allowed before accusation:

```json
{
  "title": "The Missing Necklace",
  "culprit": "Alex"
}
```

Instead:

```json
{
  "id": "case-id",
  "title": "The Missing Necklace",
  "story": "...",
  "suspects": [],
  "clues": [],
  "evidence": []
}
```

After accusation, the backend may return the culprit and solution.

---

# 20. API Endpoints

## Create Case

```http
POST /api/cases
```

Request:

```json
{
  "premise": "A valuable necklace disappeared during a family dinner.",
  "difficulty": "easy"
}
```

Response:

```json
{
  "success": true,
  "case": {
    "id": "...",
    "title": "...",
    "story": "...",
    "difficulty": "easy",
    "suspects": [],
    "clues": [],
    "evidence": []
  }
}
```

The culprit must not be included.

---

# 21. Get Case

```http
GET /api/cases/:id
```

Returns the current safe game state.

The culprit and solution must remain hidden.

---

# 22. Discover Clue

```http
POST /api/cases/:id/clues/:clueId/discover
```

The backend:

1. Validates the case.
2. Validates the clue.
3. Checks whether it was already discovered.
4. Marks the clue as discovered.
5. Awards +5 points.
6. Returns the clue.

A clue cannot award points twice.

---

# 23. Request Hint

```http
POST /api/cases/:id/hints
```

The backend:

1. Checks the number of hints already used.
2. Checks the difficulty limit.
3. Selects the next available hint.
4. Records the hint usage.
5. Applies the -10 penalty.
6. Returns the hint.

If the user has reached the hint limit, return an appropriate error.

---

# 24. Submit Accusation

```http
POST /api/cases/:id/accuse
```

Request:

```json
{
  "suspectId": "suspect-id"
}
```

Backend:

1. Validate case ID.
2. Validate suspect ID.
3. Check that the case has not already been completed.
4. Compare the selected suspect with the stored culprit.
5. Calculate score.
6. Mark the case as completed.
7. Save accusation.
8. Return verdict and solution.

---

# 25. Get Result

```http
GET /api/cases/:id/result
```

Only completed cases should return the full solution.

Response:

```json
{
  "success": true,
  "result": {
    "correct": true,
    "culprit": "...",
    "score": 165,
    "explanation": "...",
    "supportingEvidence": []
  }
}
```

---

# 26. API Error Handling

The backend must use consistent error responses.

Example:

```json
{
  "success": false,
  "message": "Case not found"
}
```

Common errors:

- Invalid request
- Empty premise
- Invalid difficulty
- Case not found
- Clue not found
- Clue already discovered
- Hint limit reached
- Invalid suspect
- Case already completed
- Gemini API failure
- MongoDB failure
- Server error

Use appropriate HTTP status codes.

Examples:

```text
400 — Bad Request
404 — Not Found
409 — Conflict
429 — Rate Limit
500 — Internal Server Error
```

---

# 27. Gemini Integration

Gemini must be called only from the backend.

The Gemini API key must be stored in an environment variable.

The backend must ask Gemini to return structured JSON.

The generated mystery must include:

- title
- story
- suspects
- clues
- hints
- evidence
- culprit
- solution
- supporting evidence

Gemini must follow the requested difficulty counts.

---

# 28. Gemini Output Validation

AI output cannot be trusted directly.

Every Gemini response must be validated using Zod or equivalent server-side validation.

The backend must verify:

- Required fields exist.
- Correct data types are present.
- Difficulty is valid.
- Number of suspects matches difficulty.
- Number of clues matches difficulty.
- Number of hints matches difficulty.
- A valid culprit exists.
- The culprit matches one of the suspects.
- The solution contains an explanation.
- Evidence is structurally valid.
- The mystery is logically consistent as far as practical validation can determine.

If Gemini returns invalid data:

1. Do not save the invalid mystery.
2. Attempt a controlled retry if appropriate.
3. If the retry fails, return a safe error to the frontend.

---

# 29. AI Prompt Requirements

The Gemini prompt must instruct the model to create a fictional mystery.

The mystery must:

- Have one clear culprit.
- Have plausible suspects.
- Give every suspect a believable motive or relationship.
- Provide clues that support the solution.
- Avoid contradictions.
- Avoid impossible evidence.
- Ensure the correct culprit can reasonably be deduced.
- Avoid revealing the culprit directly in clues.
- Provide hints that assist reasoning without immediately revealing the answer.
- Follow the requested difficulty.

The AI must not generate harmful, illegal, or real-person accusations.

All mysteries are fictional.

---

# 30. Example Gemini Data Structure

The internal Gemini response should conceptually follow:

```json
{
  "title": "The Missing Necklace",
  "story": "A valuable necklace disappears during a family dinner.",
  "suspects": [
    {
      "id": "s1",
      "name": "Alex",
      "description": "...",
      "relationship": "...",
      "motive": "..."
    }
  ],
  "clues": [
    {
      "id": "c1",
      "title": "CCTV Timestamp",
      "description": "...",
      "importance": "high"
    }
  ],
  "hints": [
    {
      "id": "h1",
      "text": "Compare the CCTV timestamp with the messages."
    }
  ],
  "evidence": [
    {
      "id": "e1",
      "type": "cctv",
      "title": "Entrance Camera",
      "content": "...",
      "timestamp": "21:42"
    }
  ],
  "culprit": "s1",
  "solution": "Alex had access to the room...",
  "supportingEvidence": ["c1", "e1"]
}
```

The exact implementation can differ, but the information must be preserved.

---

# 31. Frontend Pages

The application must contain the following primary pages.

## Home

Route:

```text
/
```

Elements:

- Logo / application name
- Hero section
- Short description
- How it works
- Start Mystery button

---

## Create Mystery

Route:

```text
/create
```

Elements:

- Scenario input
- Difficulty selector
- Generate button
- Loading state
- Validation messages

---

## Investigation Room

Route:

```text
/case/:id
```

Elements:

- Case title
- Story
- Suspect cards
- Evidence section
- Clue section
- Hint button
- Progress indicator
- Accuse button

---

## Accusation

Route:

```text
/case/:id/accuse
```

Elements:

- Suspect list
- Selected suspect
- Submit accusation button
- Confirmation message

---

## Results

Route:

```text
/case/:id/result
```

Elements:

- Verdict
- Correct culprit
- Score
- Explanation
- Supporting evidence
- Play Again button

---

# 32. Loading States

The application must provide clear loading feedback.

Examples:

```text
Generating your mystery...
```

```text
Opening evidence...
```

```text
Checking your accusation...
```

The user must not be left looking at a frozen screen.

Buttons should be disabled while their corresponding request is processing.

---

# 33. Error States

The application must handle:

- Network failure
- Gemini failure
- Backend unavailable
- Invalid case ID
- Invalid clue
- Hint limit
- Already completed case
- Empty scenario
- Invalid form input

Display user-friendly messages.

Do not display raw server errors or API keys.

---

# 34. Responsive Design

The application must work on:

- Desktop
- Laptop
- Tablet
- Mobile

The investigation interface should adapt to smaller screens.

Suspect cards should stack on mobile.

Evidence panels should remain readable.

Buttons must be easy to tap on mobile.

---

# 35. Visual Design

The visual style should communicate:

**Mystery + Investigation + Technology**

Suggested design direction:

- Dark or cinematic background
- High-contrast readable text
- Investigation-board style cards
- Evidence cards
- Subtle animations
- Clear buttons
- Modern typography
- Responsive layout

Avoid excessive animations that make the application slow or difficult to use.

The UI must prioritize usability over decoration.

---

# 36. State Management

For the MVP, React state and appropriate hooks may be used.

The application should track:

- Current case
- Loading states
- Discovered clues
- Used hints
- Selected suspect
- Result
- API errors

Do not introduce unnecessary state-management libraries unless required.

---

# 37. Environment Variables

Backend `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Frontend environment variables may be used for the backend URL if required.

Never expose:

```text
GEMINI_API_KEY
MONGODB_URI
```

to the frontend.

Never commit `.env` to GitHub.

---

# 38. Git Security

The `.gitignore` file must include:

```text
node_modules/
.env
.env.*
dist/
.DS_Store
```

Before pushing to GitHub, verify that no API keys, passwords, or database credentials are included.

---

# 39. Performance Requirements

The application should:

- Avoid unnecessary API calls.
- Disable duplicate button submissions.
- Handle Gemini delays with loading states.
- Avoid generating a new mystery every time the page refreshes.
- Store the generated case in MongoDB.
- Retrieve an existing case when appropriate.

---

# 40. Game State

A case should have a status.

Possible statuses:

```text
active
completed
```

Once an accusation is submitted:

```text
active → completed
```

A completed case cannot be accused again.

---

# 41. Data Integrity

The backend must be the source of truth for:

- Culprit
- Solution
- Discovered clues
- Hint usage
- Score
- Accusation
- Case status

The frontend must never be trusted for these values.

---

# 42. Testing Requirements

Before deployment, test the following.

## Mystery Creation

- Easy mystery works.
- Medium mystery works.
- Hard mystery works.
- Empty premise is rejected.
- Invalid difficulty is rejected.
- Gemini failure is handled.

## Investigation

- Story appears.
- Correct number of suspects appears.
- Correct number of clues appears.
- Clues can be discovered.
- A clue cannot award points twice.
- Evidence appears correctly.

## Hints

- Hint can be requested.
- Hint penalty works.
- Hint limit works.
- Extra hints are rejected.

## Accusation

- Suspect can be selected.
- Accusation is sent to backend.
- Correct accusation works.
- Incorrect accusation works.
- Duplicate accusation is prevented.

## Score

- Correct base score is applied.
- Clue points are applied.
- Hint penalties are applied.
- Score never becomes negative.

## Security

Verify that:

- Culprit is not present in the initial API response.
- Solution is not present in the initial API response.
- Culprit cannot be discovered by inspecting normal frontend state.
- Gemini API key is not exposed.
- MongoDB credentials are not exposed.

---

# 43. Acceptance Criteria

The project is considered complete only when all of the following are satisfied.

### Functional

- [ ] User can open the Home page.
- [ ] User can enter a scenario.
- [ ] User can select Easy, Medium, or Hard.
- [ ] Gemini generates a mystery.
- [ ] Mystery is stored in MongoDB.
- [ ] User can view suspects.
- [ ] User can investigate clues.
- [ ] User can view evidence.
- [ ] User can request hints.
- [ ] User can accuse a suspect.
- [ ] Backend determines the result.
- [ ] Backend calculates the score.
- [ ] Result page displays the verdict.
- [ ] Result page displays the culprit.
- [ ] Result page displays the explanation.
- [ ] User can start another mystery.

### Security

- [ ] Culprit is hidden before accusation.
- [ ] Solution is hidden before accusation.
- [ ] Gemini API key is protected.
- [ ] MongoDB credentials are protected.
- [ ] `.env` is not committed.

### UI

- [ ] Responsive on desktop.
- [ ] Responsive on mobile.
- [ ] Loading states work.
- [ ] Error states work.
- [ ] Buttons provide feedback.

### Deployment

- [ ] MongoDB Atlas configured.
- [ ] Backend deployed.
- [ ] Frontend deployed.
- [ ] Production environment variables configured.
- [ ] Live mystery can be generated.
- [ ] Live mystery can be solved.
- [ ] Live result works.

---

# 44. MVP Scope

The first implementation must prioritize a working MVP.

### Required MVP

- Story generation
- Suspects
- Clues
- Evidence
- Hints
- Accusation
- Scoring
- Results
- Gemini integration
- MongoDB persistence
- Responsive React UI
- Backend security
- Deployment

### Optional Enhancements

Only implement these after the MVP is stable:

- AI-generated images
- Advanced CCTV visualizations
- Animated investigation board
- Sound effects
- Timer
- Leaderboard
- User accounts
- Case history
- Shareable cases
- Advanced animations

Optional features must never delay or break the required MVP.

---

# 45. Deployment Requirements

## Database

Use MongoDB Atlas.

Configure:

```text
MONGODB_URI
```

in the backend hosting environment.

## Backend

Deploy the Express application.

Configure:

```text
PORT
MONGODB_URI
GEMINI_API_KEY
CLIENT_URL
```

## Frontend

Deploy the React/Vite application to Vercel.

Configure the production backend API URL.

After deployment, test the complete flow using the production URL.

---

# 46. GitHub Requirements

The GitHub repository should contain:

```text
client/
server/
SPEC.md
README.md
.gitignore
```

Do not upload:

```text
.env
node_modules/
API keys
MongoDB passwords
```

The README should contain:

- Project name
- Project description
- Features
- Tech stack
- Architecture
- Setup instructions
- Environment variables
- API overview
- Deployment information
- Screenshots if available
- Live website URL

---

# 47. Development Method

The project must be implemented incrementally.

Do NOT generate the entire application in one step.

Recommended implementation sequence:

## Phase 1

Read and understand this SPEC.md.

## Phase 2

Create project structure and install dependencies.

## Phase 3

Implement Express backend.

## Phase 4

Implement MongoDB connection and models.

## Phase 5

Implement Gemini service and structured output validation.

## Phase 6

Implement case creation API.

## Phase 7

Implement investigation APIs.

## Phase 8

Implement accusation and scoring APIs.

## Phase 9

Implement React pages.

## Phase 10

Connect frontend to backend.

## Phase 11

Implement UI polish and responsive behavior.

## Phase 12

Test all acceptance criteria.

## Phase 13

Deploy backend.

## Phase 14

Deploy frontend.

## Phase 15

Perform final production test.

---

# 48. Codex Instructions

This specification is the single source of truth for the project.

When implementing the project:

1. Read this entire SPEC.md before modifying code.
2. Follow the requirements in this document.
3. Do not invent major features without approval.
4. Do not remove required functionality.
5. Keep frontend and backend responsibilities separate.
6. Keep Gemini API calls on the backend.
7. Never expose the culprit before accusation.
8. Never expose secrets.
9. Validate all AI-generated data.
10. Keep scoring on the backend.
11. Implement one development phase at a time.
12. Test each phase before continuing.
13. Prefer simple, maintainable code.
14. Do not add unnecessary dependencies.
15. Follow the existing project structure.
16. If a requirement is ambiguous, explain the ambiguity before making a major architectural decision.
17. Do not replace working code unnecessarily.
18. Do not mark a feature complete without testing it.
19. Preserve all existing functionality when adding new functionality.
20. Ensure the final application satisfies every acceptance criterion.

---

# 49. Definition of Done

The project is considered finished only when:

```text
SPEC.md
   ↓
Frontend built
   ↓
Backend built
   ↓
MongoDB connected
   ↓
Gemini integrated
   ↓
AI output validated
   ↓
Mystery generated
   ↓
Investigation works
   ↓
Hints work
   ↓
Accusation works
   ↓
Scoring works
   ↓
Culprit protected
   ↓
Result works
   ↓
All tests pass
   ↓
GitHub repository ready
   ↓
Backend deployed
   ↓
Frontend deployed
   ↓
Live website tested
   ↓
Submission ready
```

---

# 50. Final Deliverables

The final project must provide:

1. Complete GitHub repository.
2. Complete `SPEC.md`.
3. Working MERN application.
4. Gemini-powered mystery generation.
5. MongoDB persistence.
6. Functional investigation experience.
7. Functional accusation system.
8. Backend-controlled scoring.
9. Secure culprit/solution handling.
10. Deployed backend.
11. Deployed frontend.
12. Working live website URL.
13. README with project documentation.

---

# 51. Final Project Goal

The final application should demonstrate that the developer can:

- Plan an application using Spec-Driven Development.
- Use AI to generate structured content.
- Build a MERN full-stack application.
- Integrate Gemini securely.
- Validate AI-generated data.
- Design and consume REST APIs.
- Store application data in MongoDB.
- Implement backend-controlled game logic.
- Build a responsive React interface.
- Protect sensitive information.
- Test an application systematically.
- Deploy a complete AI-powered web application.

The primary priority is a **working, reliable, secure, and deployable AI Mystery Room**, not the number of optional features.

**End of Specification**
# StudyTech Assessment: AWS Cloud Practitioner Personalisation Engine

A mini personalisation engine that models the AWS CLF-C02 certification structure, computes a student's weakest skills from quiz history, and generates an AI-powered "Today's Study Session" recommendation.

## How to run

```bash
# 1. Install dependencies
npm install

# 2. Add your Groq API key (free tier)
echo "GROQ_API_KEY=gsk_..." > .env.local

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

No API key? The app still fully works, every AI feature falls back to a deterministic local recommendation built from the same data (see Tradeoffs below).

```bash
npm run build   # production build check
npm run lint    # eslint
```

## What I built

**Pages:**

- **`/`** (Overview)  readiness score hero, quick links to every feature, top-3 weakest skills preview. Entry point that surfaces all 5 requirements without requiring navigation.
- **`/skills`**  full collapsible Certification → Domain → SkillSet → Skill tree, plus the complete weakest-skills ranking.
- **`/study`**  "Today's Study Session": the weakest skill, why it was selected, a lesson summary, 3 flashcards, and a 5-question quiz plan. Generates automatically on load  no button required to see the core recommendation.
- **`/flashcards`**  a second, independent AI feature: generate flashcards for *any* skill on demand, decoupled from the weakness-ranking logic entirely.
- **`/history`**  table of all quiz attempts with domain, skill, question excerpt, and pass/fail.

**Data model** (`lib/types.ts`, `data.ts`):

```
Certification        1 record   (AWS CLF-C02)
  |
  +-- Domain          4 records   has examWeight (% of exam)
        |
        +-- SkillSet  9 records
              |
              +-- Skill          15 records
                    |
                    +-- Question         15 records   (1 per skill)
                          |
                          +-- QuizAttempt   18 records   (a student's answer to a question)
```

One certification has many domains. Each domain has many skill sets. Each skill set has many skills.
Each skill has one question (in this mock data). Each question has many attempts over time.

| Entity | Fields | Points to (foreign key) |
|---|---|---|
| `Certification` | `id`, `name`, `code` | (top of the tree) |
| `Domain` | `id`, `certificationId`, `name`, `examWeight` | `Certification` |
| `SkillSet` | `id`, `domainId`, `name` | `Domain` |
| `Skill` | `id`, `skillSetId`, `name` | `SkillSet` |
| `Question` | `id`, `skillId`, `question`, `options`, `correctAnswer`, plus `domainId`/`skillSetId`/`certificationId` copied down for fast filtering | `Skill` |
| `QuizAttempt` | `id`, `userId`, `questionId`, `selectedAnswer`, `isCorrect`, `answeredAt` | `Question`, `User` |

Every "points to" column is a plain string id, the same way a foreign key works in a real database table. Nothing is nested; `lib/lookup.ts` builds an `id -> entity` lookup table for each entity once when the app starts, so finding "the skill for this question" is a single lookup, not a search through an array.

Every relationship is a string id, not a nested object same shape a relational table would have. `lib/lookup.ts` builds `Map<id, entity>` indexes once at module load (so the in-memory arrays behave like indexed tables instead of requiring a linear scan per lookup), and `lib/analytics.ts` is the only place that joins across entities. Swapping `data.ts` for a real Prisma schema would touch that one file, not the UI.

**Weakness algorithm** (`lib/analytics.ts`):
```
weaknessScore = (1 - accuracy) + (recentWrongAnswers × 0.15)
```
Recency window = last 7 days (`RECENCY_WINDOW_DAYS` in `lib/constants.ts`). A skill missed yesterday outranks one missed a month ago at equal accuracy recency signals urgency, not just raw performance.

**Architecture:**
- `lib/lookup.ts` every entity pre-indexed into `Map`s once at module load, so `computeSkillStats`/`buildCertTree`/`getRecentAttempts` run in O(n), not O(n×m) nested lookups.
- `hooks/useStudySession.ts`, `hooks/useFlashcardGenerator.ts` own all fetch/loading/error/fallback state and request cancellation; components are pure render.
- `components/{atoms,molecules,organisms}/` atomic structure, no business logic in JSX.
- All colors live in Tailwind theme tokens (`app/globals.css` `@theme` block); all magic numbers live in `lib/constants.ts`.

## How I used AI tools

**In the product:**
- **Groq** (`llama-3.3-70b-versatile`, OpenAI-compatible, free tier) powers both AI features via `POST /api/ai-session` and `POST /api/ai-flashcards`.
- Prompt construction and request validation are isolated in `lib/prompts.ts`, fully separate from the SDK call in the route handlers switching providers (e.g. back to Claude) is a ~10-line change, not a rewrite.
- Both routes wire the incoming request's `AbortSignal` through to the Groq call (`{ signal: req.signal }`), and both client hooks cancel any in-flight request before starting a new one (rapid skill switching, regenerate spam, or navigating away mid-fetch). This stops wasted generation server-side, not just in the browser.
- Responses are requested as structured JSON in the prompt, parsed with a regex fallback on the first `{...}` block to tolerate any surrounding prose from the model.

**While building:**
- Built with Claude Code as a pair-programming tool I drove every decision (data model shape, weakness formula, page structure, provider choice, fallback strategy) and reviewed/directed each change rather than accepting first output.
- Used it for the mechanical parts that don't need judgement: scaffolding new components, applying the same refactor pattern across many files (e.g. swapping every hardcoded hex color for a Tailwind theme token, extracting fetch logic into hooks), and catching real bugs I asked it to investigate (a 3D-transform CSS overflow bug, a missing-feedback state on the regenerate button).
- Caught and corrected its mistakes during the session e.g. it initially consolidated everything onto one dashboard page when I'd asked for a multi-page split, and I had it revert; it's in the tradeoffs table because that back-and-forth is part of the actual build history, not hidden.
- Did not let it choose the architecture unsupervised every structural decision (multi-page vs single-page, Groq vs Anthropic, auto-generate vs button-gated) was a call I made and asked it to implement, with reasoning I can defend live.

## Tradeoffs

### Product & data

| Decision | Why | Alternative considered |
|---|---|---|
| Mock data in `data.ts` | Brief explicitly allows it, no infra needed for an assessment | Real DB (Prisma + Postgres) |
| Heuristic weakness formula, untuned weight (`recentWrong × 0.15`) | Reasonable first pass that's easy to reason about and explain live | Calibrate the weight against real retake/outcome data, or a proper IRT-style model |
| No auth, single mock user (`currentUser`) | Out of scope per brief; adding it is pure scope, not signal | Multi-user via Supabase/NextAuth `QuizAttempt.userId` already exists on the type, just unfiltered |
| Denormalized `Question` (carries `domainId`/`skillSetId` up the chain, not just `skillId`) | Cheap filtering/joins in `lib/analytics.ts` without walking the hierarchy every time | Fully normalized (`Question` only references `Skill`, derive domain/skillSet by walking up) less duplication, more lookups per read |

### AI integration

| Decision | Why | Alternative considered |
|---|---|---|
| Groq over Anthropic | Ran out of Anthropic credits mid-build; Groq's free tier and OpenAI-compatible SDK made the swap cheap and low-risk | Anthropic Claude Haiku (original choice the prompt/validation layer in `lib/prompts.ts` is provider-agnostic, so swapping back is ~10 lines in the route handler) |
| Local deterministic fallback (`lib/mockStudySession.ts`, `lib/mockFlashcards.ts`) | The core requirement a study session must always render can't depend on a third-party API being up or a key being configured | Hard error / empty state on AI failure (simpler, but breaks the actual requirement under a flaky network or missing key) |
| Auto-generate study session on mount, no button gate | Spec says "generate a recommendation" a recommendation the student has to click for isn't really generated *for* them | Manual "Generate" button only (lower cost per page load, worse first-requirement compliance) |
| Abort in-flight requests on unmount/skill-change, signal wired server-side too (`{ signal: req.signal }`) | Stops wasted Groq generation cost on the server, not just discarding the response client-side; avoids stale responses overwriting newer state | Let requests run to completion and just ignore late responses (simpler, wastes API quota and money) |
| Regex-extract first `{...}` block instead of strict JSON parse | Open-source models occasionally wrap JSON in prose despite instructions; tolerant parsing avoids false failures | Force JSON mode / tool-calling for a hard schema guarantee (not available on every Groq model, adds provider coupling) |

### Architecture & engineering process

| Decision | Why | Alternative considered |
|---|---|---|
| Multi-page split (`/`, `/study`, `/skills`, `/history`, `/flashcards`) over one dense dashboard | Each requirement gets a focused, uncluttered view; tried single-page first and it felt cramped once animations and AI states were added | Single dashboard (also revisited mid-build when I worried a grader might miss requirements behind nav landed on: keep the split, but make `/` surface all 5 requirements via quick links + previews instead of merging everything back) |
| `lib/lookup.ts` pre-built `Map` indexes, `lib/analytics.ts` reduced to O(n) | Original version used nested `.find()`/`.filter()` per row O(n×m) on every page load. Caught and fixed once the data layer was reviewed | Leave nested lookups (fine at 15 questions/18 attempts, would degrade at real scale) |
| Logic extracted into `hooks/useStudySession.ts` / `useFlashcardGenerator.ts` | Components were mixing fetch/loading/error state with JSX; pulling it into hooks makes both testable independently and keeps components pure-render | Keep fetch logic inline in components (less indirection for a small app, worse separation of concerns) |
| All colors as Tailwind theme tokens (`app/globals.css` `@theme`), all magic numbers in `lib/constants.ts` | One file to rebrand or retune timing/weights instead of hunting through every component | Inline hex/numbers per component (faster to write once, much harder to change consistently later) |
| Atomic component structure (`atoms/molecules/organisms`) | Forces small, single-purpose components; made the "split one dense card into 5 labeled cards" request (a real ask mid-build) a half-hour change instead of a rewrite | Flat `components/` folder (less ceremony, harder to keep components small as the app grew) |

## What I would improve with more time

- **Interactive quizzes** let the student actually answer questions in-app, feeding results back into the weakness engine live instead of replaying static history.
- **Progress over time** accuracy trend charts per skill/domain.
- **Spaced repetition** schedule review based on forgetting curves, not a single "weakest skill" snapshot.
- **Domain-weighted recommendations** factor in `examWeight` so a 30%-weighted domain skill outranks a 12%-weighted one at equal weakness score.
- **Auth + persistence** multi-user, persisted attempts (the `userId` field is already there, just unfiltered).
- **Streaming AI responses** stream the study session token-by-token instead of waiting for the full JSON payload.
- **Validate AI output against a schema** (e.g. Zod) instead of trusting the model's JSON shape currently a malformed response just fails to the local fallback, which is safe but silent.

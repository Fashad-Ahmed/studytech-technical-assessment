@AGENTS.md

# StudyTech — AWS CLF-C02 Personalisation Engine

Next.js 16 + TypeScript + Tailwind + Groq SDK prototype built for a technical assessment.

## Stack
- Next.js 16 (App Router, Turbopack)
- TypeScript strict
- Tailwind CSS
- `groq-sdk` — Llama 3.3 70B (free-tier, open-source) for AI study session generation
- lucide-react for icons
- Mock data only — no DB, no auth

## Key files
- `data.ts` — all mock data (Certification, Domain, SkillSet, Skill, Question, QuizAttempt)
- `lib/analytics.ts` — weakness engine + cert tree builder + recent attempts (Map-based lookups, O(n))
- `lib/lookup.ts` — pre-built id→entity Maps shared by analytics
- `lib/types.ts` — entity + composed types (SkillStat, CertTreeNode, StudySessionContent, RecentAttempt)
- `lib/constants.ts` — magic numbers (recency window, AI model, display limits)
- `lib/prompts.ts` — AI prompt builder + request validator
- `lib/utils.ts` — formatDate
- `app/page.tsx` — server component dashboard (all analytics run server-side)
- `app/api/ai-session/route.ts` — POST endpoint, calls Groq Llama, returns StudySessionContent JSON
- `components/atoms/` — AccuracyBar, Badge, StatCard
- `components/molecules/` — Flashcard, WeaknessItem, QuizPlanItem
- `components/organisms/` — CertTree, WeaknessRanking, StudySession, QuizHistory

## Data model
```
Certification → Domain (4) → SkillSet (9) → Skill (15) ← Question (15) ← QuizAttempt (18)
```

## Weakness algorithm
```ts
weaknessScore = (1 - accuracy) + (recentWrongAnswers * 0.15)
// recency window = last 7 days
```
Sorted descending. `skillStats[0]` = weakest skill → passed to StudySession.

## AI feature
`POST /api/ai-session` — body: `{ skillName, skillSetName, domainName, accuracy, totalAttempts }`
Response: `{ explanation, lessonSummary, flashcards[3], quizPlan[5] }`
Model: `llama-3.3-70b-versatile` (Groq, free tier)
Env var: `GROQ_API_KEY` in `.env.local` — get one at console.groq.com/keys

## Dev
```bash
npm run dev   # localhost:3000
npm run build # production build check
```

## What's NOT built (intentional tradeoffs)
- No auth, no payments, no DB
- No real quiz interaction (read-only history)
- No streaming AI response
- No spaced repetition scheduling
- No domain-level weighting by exam % in recommendations

## Current user
`user_1` / "Demo Student" — hardcoded in `data.ts → currentUser`

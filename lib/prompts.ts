export type StudySessionParams = {
  skillName: string;
  skillSetName: string;
  domainName: string;
  accuracy: number;
  totalAttempts: number;
};

export function isValidStudySessionParams(
  body: unknown
): body is StudySessionParams {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.skillName === "string" &&
    typeof b.skillSetName === "string" &&
    typeof b.domainName === "string" &&
    typeof b.accuracy === "number" &&
    typeof b.totalAttempts === "number"
  );
}

export function buildStudySessionPrompt(params: StudySessionParams): string {
  const { skillName, skillSetName, domainName, accuracy, totalAttempts } =
    params;
  return `You are an AWS Cloud Practitioner exam coach. A student is struggling with the skill: "${skillName}" (part of "${skillSetName}" in the "${domainName}" domain).

Student stats:
- Accuracy: ${Math.round(accuracy * 100)}%
- Total attempts: ${totalAttempts}

Generate a personalized study session with:
1. A short explanation (2-3 sentences) of WHY this skill was selected for today
2. A concise lesson summary (3-4 sentences) explaining the core concept
3. Exactly 3 flashcards (front = question, back = answer)
4. A 5-question quiz plan where each entry has a focus area and a sample question

Respond with ONLY valid JSON in this exact shape:
{
  "explanation": "string",
  "lessonSummary": "string",
  "flashcards": [
    { "front": "string", "back": "string" }
  ],
  "quizPlan": [
    { "questionNumber": 1, "focus": "string", "sampleQuestion": "string" }
  ]
}`;
}

export type AiFlashcardsParams = {
  skillName: string;
  count: number;
};

export function isValidAiFlashcardsParams(
  body: unknown
): body is AiFlashcardsParams {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.skillName === "string" &&
    b.skillName.trim().length > 0 &&
    typeof b.count === "number" &&
    b.count > 0 &&
    b.count <= 10
  );
}

export function buildAiFlashcardsPrompt(params: AiFlashcardsParams): string {
  const { skillName, count } = params;
  return `You are an AWS Cloud Practitioner exam coach. Generate exactly ${count} flashcards to help a student study the topic: "${skillName}".

Each flashcard has a front (a question or term) and a back (the answer or definition). Keep each side concise — one or two sentences.

Respond with ONLY valid JSON in this exact shape:
{
  "flashcards": [
    { "front": "string", "back": "string" }
  ]
}`;
}

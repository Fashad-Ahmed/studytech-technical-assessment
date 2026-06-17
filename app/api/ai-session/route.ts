import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import type { StudySessionContent } from "@/lib/types";
import { AI_MODEL, AI_MAX_TOKENS } from "@/lib/constants";
import { buildStudySessionPrompt, isValidStudySessionParams } from "@/lib/prompts";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidStudySessionParams(body)) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  try {
    const completion = await client.chat.completions.create(
      {
        model: AI_MODEL,
        max_tokens: AI_MAX_TOKENS,
        messages: [{ role: "user", content: buildStudySessionPrompt(body) }],
      },
      { signal: req.signal }
    );

    const text = completion.choices[0]?.message?.content ?? "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 }
      );
    }

    const content: StudySessionContent = JSON.parse(jsonMatch[0]);
    return NextResponse.json(content);
  } catch (err) {
    console.error("AI session error:", err);
    return NextResponse.json(
      { error: "Failed to generate study session" },
      { status: 500 }
    );
  }
}

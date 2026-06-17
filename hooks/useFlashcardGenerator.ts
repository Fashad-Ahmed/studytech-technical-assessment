import { useEffect, useRef, useState } from "react";
import type { Skill, AiFlashcardsContent } from "@/lib/types";
import { buildMockFlashcards } from "@/lib/mockFlashcards";
import { AI_FLASHCARD_DEFAULT_COUNT } from "@/lib/constants";

export function useFlashcardGenerator(skills: Skill[]) {
  const [skillId, setSkillId] = useState(skills[0]?.id ?? "");
  const [content, setContent] = useState<AiFlashcardsContent | null>(null);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const selectedSkill = skills.find((s) => s.id === skillId);

  function selectSkill(id: string) {
    abortRef.current?.abort();
    setSkillId(id);
    setContent(null);
    setError(null);
  }

  async function generate() {
    if (!selectedSkill) return;

    // Cancel any in-flight request — avoids wasted network work and stale
    // responses overwriting newer state.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillName: selectedSkill.name,
          count: AI_FLASHCARD_DEFAULT_COUNT,
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("Failed to generate flashcards");
      const data: AiFlashcardsContent = await res.json();
      setContent(data);
      setIsAiGenerated(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("AI generation unavailable — showing local flashcards instead.");
      setContent(buildMockFlashcards(selectedSkill.name, AI_FLASHCARD_DEFAULT_COUNT));
      setIsAiGenerated(false);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  // Abort any in-flight request if the component unmounts mid-fetch.
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return {
    skillId,
    selectSkill,
    content,
    isAiGenerated,
    loading,
    error,
    generate,
  };
}

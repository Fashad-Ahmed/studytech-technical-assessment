import { useEffect, useRef, useState } from "react";
import type { SkillStat, StudySessionContent } from "@/lib/types";
import { buildMockStudySessionContent } from "@/lib/mockStudySession";

export function useStudySession(weakestSkill: SkillStat) {
  const [content, setContent] = useState<StudySessionContent | null>(null);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function generate() {
    // Cancel any in-flight request — avoids wasted network work and stale
    // responses overwriting newer state (e.g. rapid navigation or skill change).
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillName: weakestSkill.skill.name,
          skillSetName: weakestSkill.skillSet.name,
          domainName: weakestSkill.domain.name,
          accuracy: weakestSkill.accuracy,
          totalAttempts: weakestSkill.totalAttempts,
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("Failed to generate session");
      const data: StudySessionContent = await res.json();
      setContent(data);
      setIsAiGenerated(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("AI generation unavailable — showing a local recommendation instead.");
      setContent(buildMockStudySessionContent(weakestSkill));
      setIsAiGenerated(false);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  // Recommendation must be visible without user interaction — generate on mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generate();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weakestSkill.skill.id]);

  return { content, isAiGenerated, loading, error, regenerate: generate };
}

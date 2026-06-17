import { attempts, certification, domains } from "@/data";
import type { SkillStat, CertTreeNode, RecentAttempt } from "@/lib/types";
import { RECENCY_WINDOW_DAYS, RECENCY_WRONG_PENALTY } from "@/lib/constants";
import {
  questionMap,
  skillMap,
  skillSetMap,
  domainMap,
  skillSetsByDomain,
  skillsBySkillSet,
} from "@/lib/lookup";

// O(attempts) — was O(attempts × questions)
export function computeSkillStats(): SkillStat[] {
  const cutoff = new Date(
    Date.now() - RECENCY_WINDOW_DAYS * 86400_000
  );

  const statsMap = new Map<
    string,
    { correct: number; total: number; recentWrong: number }
  >();

  for (const attempt of attempts) {
    const question = questionMap.get(attempt.questionId);
    if (!question) continue;

    const entry = statsMap.get(question.skillId) ?? {
      correct: 0,
      total: 0,
      recentWrong: 0,
    };

    entry.total += 1;
    if (attempt.isCorrect) {
      entry.correct += 1;
    } else if (new Date(attempt.answeredAt) >= cutoff) {
      entry.recentWrong += 1;
    }

    statsMap.set(question.skillId, entry);
  }

  const result: SkillStat[] = [];

  for (const [skillId, raw] of statsMap) {
    const skill = skillMap.get(skillId);
    if (!skill) continue;

    const skillSet = skillSetMap.get(skill.skillSetId)!;
    const domain = domainMap.get(skillSet.domainId)!;
    const accuracy = raw.total > 0 ? raw.correct / raw.total : 1;

    result.push({
      skill,
      skillSet,
      domain,
      totalAttempts: raw.total,
      correctAttempts: raw.correct,
      accuracy,
      weaknessScore: 1 - accuracy + raw.recentWrong * RECENCY_WRONG_PENALTY,
    });
  }

  return result.sort((a, b) => b.weaknessScore - a.weaknessScore);
}

// O(domains + skillSets + skills) — was O(domains × skillSets × skills)
export function buildCertTree(): CertTreeNode {
  return {
    certification,
    domains: domains.map((domain) => ({
      domain,
      skillSets: (skillSetsByDomain.get(domain.id) ?? []).map((skillSet) => ({
        skillSet,
        skills: skillsBySkillSet.get(skillSet.id) ?? [],
      })),
    })),
  };
}

// O(n log n) sort + O(n) map — was O(n × m) due to nested finds
export function getRecentAttempts(limit = 10): RecentAttempt[] {
  return [...attempts]
    .sort(
      (a, b) =>
        new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime()
    )
    .slice(0, limit)
    .map((attempt) => {
      const question = questionMap.get(attempt.questionId)!;
      const skill = skillMap.get(question.skillId)!;
      const skillSet = skillSetMap.get(skill.skillSetId)!;
      const domain = domainMap.get(skillSet.domainId)!;
      return { attempt, question, skill, skillSet, domain };
    });
}

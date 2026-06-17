import type { SkillStat, StudySessionContent } from "@/lib/types";

export function buildMockStudySessionContent(
  skill: SkillStat
): StudySessionContent {
  const name = skill.skill.name;
  const pct = Math.round(skill.accuracy * 100);

  return {
    explanation: `This skill was selected because your accuracy on "${name}" is ${pct}% across ${skill.totalAttempts} attempt${
      skill.totalAttempts === 1 ? "" : "s"
    } — the weakest in your "${skill.skillSet.name}" skill set within "${skill.domain.name}".`,
    lessonSummary: `"${name}" is a core concept tested under ${skill.domain.name} on the AWS Cloud Practitioner exam. Reviewing the official AWS documentation and practicing related questions will help close this gap before your next attempt.`,
    flashcards: [
      { front: `What is ${name}?`, back: `Review the official AWS docs for "${name}" to recall the precise definition.` },
      { front: `Why does ${name} matter for CLF-C02?`, back: `It falls under "${skill.domain.name}", worth a meaningful share of the exam.` },
      { front: `Common mistake with ${name}?`, back: `Confusing it with adjacent concepts in "${skill.skillSet.name}" — re-read the distinctions.` },
    ],
    quizPlan: [
      { questionNumber: 1, focus: name, sampleQuestion: `Define the core idea behind ${name}.` },
      { questionNumber: 2, focus: name, sampleQuestion: `Identify a real-world use case for ${name}.` },
      { questionNumber: 3, focus: skill.skillSet.name, sampleQuestion: `How does ${name} relate to other skills in ${skill.skillSet.name}?` },
      { questionNumber: 4, focus: skill.domain.name, sampleQuestion: `Where does ${name} fit within ${skill.domain.name}?` },
      { questionNumber: 5, focus: name, sampleQuestion: `Spot the correct answer in a scenario-based question about ${name}.` },
    ],
  };
}

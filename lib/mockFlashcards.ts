import type { AiFlashcardsContent } from "@/lib/types";

export function buildMockFlashcards(skillName: string, count: number): AiFlashcardsContent {
  const templates = [
    { front: `What is ${skillName}?`, back: `Review the official AWS docs for "${skillName}" to recall the precise definition.` },
    { front: `Why does ${skillName} matter for CLF-C02?`, back: `It's a tested concept on the AWS Cloud Practitioner exam.` },
    { front: `Common mistake with ${skillName}?`, back: `Watch for confusion with adjacent, similarly-named concepts.` },
    { front: `Real-world use case for ${skillName}?`, back: `Think of a scenario where this concept solves a concrete business problem.` },
    { front: `How is ${skillName} tested on the exam?`, back: `Usually via a scenario-based multiple-choice question.` },
  ];

  return {
    flashcards: Array.from({ length: count }, (_, i) => templates[i % templates.length]),
  };
}

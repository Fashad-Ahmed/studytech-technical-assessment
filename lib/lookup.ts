import { questions, skills, skillSets, domains } from "@/data";
import type { Skill, SkillSet } from "@/lib/types";

export const questionMap = new Map(questions.map((q) => [q.id, q]));
export const skillMap = new Map(skills.map((s) => [s.id, s]));
export const skillSetMap = new Map(skillSets.map((ss) => [ss.id, ss]));
export const domainMap = new Map(domains.map((d) => [d.id, d]));

export const skillSetsByDomain: Map<string, SkillSet[]> = new Map(
  domains.map((d) => [d.id, []])
);
for (const ss of skillSets) {
  skillSetsByDomain.get(ss.domainId)?.push(ss);
}

export const skillsBySkillSet: Map<string, Skill[]> = new Map(
  skillSets.map((ss) => [ss.id, []])
);
for (const skill of skills) {
  skillsBySkillSet.get(skill.skillSetId)?.push(skill);
}

import { computeSkillStats } from "@/lib/analytics";
import PageShell from "@/components/organisms/PageShell";
import StudySession from "@/components/organisms/StudySession";

export default function StudyPage() {
  const skillStats = computeSkillStats();
  const weakestSkill = skillStats[0];

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto w-full">
        <StudySession weakestSkill={weakestSkill} />
      </div>
    </PageShell>
  );
}

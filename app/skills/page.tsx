import { buildCertTree, computeSkillStats } from "@/lib/analytics";
import PageShell from "@/components/organisms/PageShell";
import CertTree from "@/components/organisms/CertTree";
import WeaknessRanking from "@/components/organisms/WeaknessRanking";

export default function SkillsPage() {
  const tree = buildCertTree();
  const skillStats = computeSkillStats();

  return (
    <PageShell>
      <div className="mb-1">
        <h1 className="font-display text-xl font-bold text-gray-900 tracking-[-0.015em]">
          Skill Tree
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Full CLF-C02 blueprint with every skill ranked by weakness.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CertTree tree={tree} />
        <WeaknessRanking stats={skillStats} limit={skillStats.length} />
      </div>
    </PageShell>
  );
}

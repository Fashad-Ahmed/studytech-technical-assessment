import WeaknessItem from "@/components/molecules/WeaknessItem";
import RevealList from "@/components/molecules/RevealList";
import type { SkillStat } from "@/lib/types";
import { TrendingDown } from "lucide-react";

type Props = { stats: SkillStat[]; limit?: number };

export default function WeaknessRanking({ stats, limit = 5 }: Props) {
  const shown = stats.slice(0, limit);

  return (
    <div className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_12px_rgba(47,31,122,0.07)]">
      <div className="px-4 py-3.5 border-b border-black/6 flex items-center gap-2">
        <TrendingDown className="w-4 h-4 text-red-400 shrink-0" />
        <div>
          <h2 className="font-semibold text-gray-800 text-sm tracking-[-0.01em]">
            Weakest Skills
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Accuracy + recent wrong answers
          </p>
        </div>
      </div>
      <RevealList className="divide-y divide-black/3">
        {shown.map((stat, i) => (
          <WeaknessItem key={stat.skill.id} stat={stat} rank={i} />
        ))}
      </RevealList>
    </div>
  );
}

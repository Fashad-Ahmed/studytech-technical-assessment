import type { SkillStat } from "@/lib/types";
import { Target } from "lucide-react";

type Props = { weakestSkill: SkillStat };

export default function FocusSkillCard({ weakestSkill }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_12px_rgba(47,31,122,0.07)]">
      <div className="px-5 py-3 border-b border-black/6 flex items-center gap-2">
        <Target className="w-4 h-4 text-brand" />
        <h2 className="text-sm font-semibold text-gray-800 tracking-[-0.01em]">
          1. Weakest Skill
        </h2>
      </div>
      <div className="p-5 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-base truncate">
            {weakestSkill.skill.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">
            {weakestSkill.domain.name} › {weakestSkill.skillSet.name}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[28px] font-bold text-red-500 leading-none tracking-[-0.03em]">
            {Math.round(weakestSkill.accuracy * 100)}%
          </p>
          <p className="text-[10px] text-gray-400 mt-1">accuracy</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import AccuracyBar from "@/components/atoms/AccuracyBar";
import type { SkillStat } from "@/lib/types";

type Props = { stat: SkillStat; rank: number };

const rankStyle: Record<number, string> = {
  0: "bg-red-500 text-white shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
  1: "bg-orange-400 text-white",
};

export default function WeaknessItem({ stat, rank }: Props) {
  const badgeClass = rankStyle[rank] ?? "bg-gray-100 text-gray-400";
  const isTop = rank === 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 },
      }}
      whileHover={{ x: 2 }}
      className={`px-4 py-3 flex gap-3 items-start transition-colors ${
        isTop ? "bg-red-50/50" : "hover:bg-gray-50/60"
      }`}
    >
      <span
        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5 ${badgeClass}`}
      >
        {rank + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">
          {stat.skill.name}
        </p>
        <p className="text-[11px] text-gray-400 truncate mb-2">
          {stat.domain.name} › {stat.skillSet.name}
        </p>
        <AccuracyBar accuracy={stat.accuracy} />
        <p className="text-[11px] text-gray-400 mt-1.5 tabular-nums">
          {stat.correctAttempts}/{stat.totalAttempts} correct
        </p>
      </div>
    </motion.div>
  );
}

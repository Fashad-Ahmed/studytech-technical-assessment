"use client";

import { motion } from "framer-motion";
import { ANIM_ACCURACY_FILL } from "@/lib/constants";

type Props = { accuracy: number };

export default function AccuracyBar({ accuracy }: Props) {
  const pct = Math.round(accuracy * 100);
  const gradient =
    pct < 40
      ? "from-red-400 to-rose-500"
      : pct < 70
      ? "from-amber-400 to-orange-400"
      : "from-emerald-400 to-teal-500";

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 h-2 bg-black/6 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-linear-to-r ${gradient}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: ANIM_ACCURACY_FILL, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-500 w-8 text-right tabular-nums">
        {pct}%
      </span>
    </div>
  );
}

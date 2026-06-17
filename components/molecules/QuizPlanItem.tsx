"use client";

import { motion } from "framer-motion";
import type { StudySessionContent } from "@/lib/types";

type Props = { item: StudySessionContent["quizPlan"][number] };

export default function QuizPlanItem({ item }: Props) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0 },
      }}
      className="flex gap-2 bg-gray-50 rounded-lg p-3"
    >
      <span className="shrink-0 w-5 h-5 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
        {item.questionNumber}
      </span>
      <div>
        <p className="text-[11px] font-medium text-gray-700">{item.focus}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">{item.sampleQuestion}</p>
      </div>
    </motion.div>
  );
}

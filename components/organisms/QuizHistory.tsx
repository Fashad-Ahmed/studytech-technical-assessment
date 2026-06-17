"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Badge from "@/components/atoms/Badge";
import type { RecentAttempt } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Props = { attempts: RecentAttempt[] };

const tbodyVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
};

export default function QuizHistory({ attempts }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_12px_rgba(47,31,122,0.07)]">
      <div className="px-5 py-3.5 border-b border-black/6 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 text-sm tracking-[-0.01em]">
          Recent Quiz Attempts
        </h2>
        <span className="text-[11px] text-gray-400 tabular-nums">
          {attempts.length} shown
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-black/6">
              <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Domain
              </th>
              <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Skill
              </th>
              <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Question
              </th>
              <th className="text-center px-5 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Result
              </th>
            </tr>
          </thead>
          <motion.tbody variants={tbodyVariants} initial="hidden" animate="show">
            {attempts.map(({ attempt, question, skill, domain }) => (
              <motion.tr
                key={attempt.id}
                variants={rowVariants}
                className={`border-b border-black/3 transition-colors ${
                  attempt.isCorrect ? "hover:bg-emerald-50/40" : "hover:bg-red-50/30"
                }`}
              >
                <td className="px-5 py-3 text-gray-400 whitespace-nowrap tabular-nums">
                  {formatDate(attempt.answeredAt)}
                </td>
                <td className="px-5 py-3">
                  <Badge>{domain.name}</Badge>
                </td>
                <td className="px-5 py-3 text-gray-700 font-medium max-w-[140px]">
                  <span className="truncate block">{skill.name}</span>
                </td>
                <td className="px-5 py-3 text-gray-400 max-w-[200px]">
                  <span className="truncate block">{question.question}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-center">
                    {attempt.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        Pass
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                        <XCircle className="w-3 h-3" />
                        Fail
                      </span>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}

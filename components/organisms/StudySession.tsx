"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SkillStat } from "@/lib/types";
import { useStudySession } from "@/hooks/useStudySession";
import { ANIM_BASE, ANIM_IDLE_BOB } from "@/lib/constants";
import FocusSkillCard from "@/components/molecules/FocusSkillCard";
import WhyThisSkillCard from "@/components/molecules/WhyThisSkillCard";
import LessonSummaryCard from "@/components/molecules/LessonSummaryCard";
import FlashcardsCard from "@/components/molecules/FlashcardsCard";
import QuizPlanCard from "@/components/molecules/QuizPlanCard";
import { Sparkles, AlertTriangle, Loader2, Brain } from "lucide-react";

type Props = { weakestSkill: SkillStat };

export default function StudySession({ weakestSkill }: Props) {
  const { content, isAiGenerated, loading, error, regenerate } = useStudySession(weakestSkill);

  return (
    <div className="space-y-5">
      {/* Section header + regenerate */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-gray-900 tracking-[-0.01em] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand" />
            Today&apos;s Study Session
          </h2>
        </div>
        <motion.button
          onClick={regenerate}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0 flex items-center gap-1.5 border border-black/6 hover:border-brand hover:text-brand disabled:opacity-60 text-gray-400 text-xs font-medium rounded-xl px-3.5 py-2 transition-colors"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          {loading ? "Regenerating…" : "Regenerate"}
        </motion.button>
      </div>

      {/* Loading skeleton — only before first content lands */}
      <AnimatePresence mode="wait">
        {!content && (
          <motion.div
            key="pre-generate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl border border-black/6 text-center py-10"
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-light mb-3"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: ANIM_IDLE_BOB, repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain className="w-5 h-5 text-brand" />
            </motion.div>
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" />
              Generating today&apos;s study session…
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs"
        >
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </motion.div>
      )}

      {/* Five distinct, clearly numbered cards — one per requirement bullet */}
      <AnimatePresence>
        {content && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIM_BASE }}
            className={`space-y-4 transition-opacity ${loading ? "opacity-50 pointer-events-none" : ""}`}
          >
            <FocusSkillCard weakestSkill={weakestSkill} />
            <WhyThisSkillCard explanation={content.explanation} />
            <LessonSummaryCard lessonSummary={content.lessonSummary} />
            <FlashcardsCard flashcards={content.flashcards} isAiGenerated={isAiGenerated} />
            <QuizPlanCard quizPlan={content.quizPlan} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

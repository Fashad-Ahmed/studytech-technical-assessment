"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Skill } from "@/lib/types";
import { useFlashcardGenerator } from "@/hooks/useFlashcardGenerator";
import { ANIM_BASE, ANIM_ENTRANCE_DELAY, ANIM_IDLE_WIGGLE, ANIM_LOADING_PULSE } from "@/lib/constants";
import Badge from "@/components/atoms/Badge";
import Flashcard from "@/components/molecules/Flashcard";
import RevealList from "@/components/molecules/RevealList";
import { Sparkles, AlertTriangle, Loader2, LayoutGrid, ChevronDown, BookOpen } from "lucide-react";

type Props = { skills: Skill[] };

export default function FlashcardGenerator({ skills }: Props) {
  const { skillId, selectSkill, content, isAiGenerated, loading, error, generate } =
    useFlashcardGenerator(skills);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIM_BASE, delay: ANIM_ENTRANCE_DELAY }}
      className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_12px_rgba(47,31,122,0.07)]"
    >
      <div className="px-5 py-3.5 border-b border-black/6 flex items-center gap-2.5">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-light shrink-0">
          <LayoutGrid className="w-4 h-4 text-brand" />
        </div>
        <h2 className="text-sm font-semibold text-gray-800 tracking-[-0.01em] flex-1">
          Generate flashcards for a skill
        </h2>
        {content && (
          <Badge variant={isAiGenerated ? "brand" : "neutral"}>
            {isAiGenerated ? "AI-generated" : "Local"}
          </Badge>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
            <select
              value={skillId}
              onChange={(e) => selectSkill(e.target.value)}
              className="w-full appearance-none text-sm rounded-xl border border-black/6 pl-10 pr-9 py-2.5 text-gray-700 bg-white focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-colors cursor-pointer"
            >
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <motion.button
            onClick={generate}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold text-sm rounded-xl px-5 py-2.5 transition-colors shadow-[0_8px_24px_rgba(74,47,196,0.35)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
              </>
            )}
          </motion.button>
        </div>

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

        <AnimatePresence mode="wait">
          {content ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIM_BASE }}
            >
              <RevealList className="grid sm:grid-cols-2 gap-2.5 items-start">
                {content.flashcards.map((card, i) => (
                  <Flashcard key={i} card={card} />
                ))}
              </RevealList>
            </motion.div>
          ) : !loading ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10"
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-light mb-3"
                animate={{ rotate: [0, -4, 4, 0] }}
                transition={{ duration: ANIM_IDLE_WIGGLE, repeat: Infinity, ease: "easeInOut" }}
              >
                <LayoutGrid className="w-5 h-5 text-brand" />
              </motion.div>
              <p className="text-xs text-gray-400">
                Pick a skill above and hit Generate to create AI flashcards.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10"
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-light mb-3"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: ANIM_LOADING_PULSE, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-5 h-5 text-brand" />
              </motion.div>
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <Loader2 className="w-3 h-3 animate-spin" />
                Generating flashcards…
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

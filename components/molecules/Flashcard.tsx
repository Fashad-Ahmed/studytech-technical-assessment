"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FlipHorizontal } from "lucide-react";
import type { StudySessionContent } from "@/lib/types";
import { ANIM_SLOW } from "@/lib/constants";

type Props = { card: StudySessionContent["flashcards"][number] };

export default function Flashcard({ card }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="relative w-full text-left"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="grid"
        style={{ transformStyle: "preserve-3d", gridTemplateAreas: '"card"' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: ANIM_SLOW, ease: "easeInOut" }}
      >
        {/* front */}
        <div
          className="[grid-area:card] rounded-xl border border-black/6 p-3 bg-white hover:border-brand/50 transition-colors"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
              Question
            </span>
            <FlipHorizontal className="w-3 h-3 text-gray-300 shrink-0" />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{card.front}</p>
          <p className="text-[10px] text-gray-300 mt-2">Click to flip</p>
        </div>

        {/* back */}
        <div
          className="[grid-area:card] rounded-xl border border-brand/30 p-3 bg-brand-light"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium text-brand uppercase tracking-wide">
              Answer
            </span>
            <FlipHorizontal className="w-3 h-3 text-brand/60 shrink-0" />
          </div>
          <p className="text-sm text-brand-dark leading-relaxed">{card.back}</p>
          <p className="text-[10px] text-brand/50 mt-2">Click to flip</p>
        </div>
      </motion.div>
    </button>
  );
}

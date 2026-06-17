import { FlipHorizontal } from "lucide-react";
import Badge from "@/components/atoms/Badge";
import Flashcard from "@/components/molecules/Flashcard";
import RevealList from "@/components/molecules/RevealList";
import type { StudySessionContent } from "@/lib/types";

type Props = { flashcards: StudySessionContent["flashcards"]; isAiGenerated: boolean };

export default function FlashcardsCard({ flashcards, isAiGenerated }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_12px_rgba(47,31,122,0.07)]">
      <div className="px-5 py-3 border-b border-black/6 flex items-center gap-2">
        <FlipHorizontal className="w-4 h-4 text-brand" />
        <h2 className="text-sm font-semibold text-gray-800 tracking-[-0.01em] flex-1">
          4. Flashcards
        </h2>
        <Badge variant={isAiGenerated ? "brand" : "neutral"}>
          {isAiGenerated ? "AI-generated" : "Local"}
        </Badge>
      </div>
      <div className="p-5">
        <RevealList className="grid sm:grid-cols-2 gap-2">
          {flashcards.map((card, i) => (
            <Flashcard key={i} card={card} />
          ))}
        </RevealList>
      </div>
    </div>
  );
}

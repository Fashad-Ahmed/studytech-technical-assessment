import { ClipboardList } from "lucide-react";
import QuizPlanItem from "@/components/molecules/QuizPlanItem";
import RevealList from "@/components/molecules/RevealList";
import type { StudySessionContent } from "@/lib/types";

type Props = { quizPlan: StudySessionContent["quizPlan"] };

export default function QuizPlanCard({ quizPlan }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_12px_rgba(47,31,122,0.07)]">
      <div className="px-5 py-3 border-b border-black/6 flex items-center gap-2">
        <ClipboardList className="w-4 h-4 text-brand" />
        <h2 className="text-sm font-semibold text-gray-800 tracking-[-0.01em]">
          5. Quiz Plan ({quizPlan.length} questions)
        </h2>
      </div>
      <div className="p-5">
        <RevealList className="space-y-2">
          {quizPlan.map((item) => (
            <QuizPlanItem key={item.questionNumber} item={item} />
          ))}
        </RevealList>
      </div>
    </div>
  );
}

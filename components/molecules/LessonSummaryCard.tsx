import { BookOpen } from "lucide-react";

type Props = { lessonSummary: string };

export default function LessonSummaryCard({ lessonSummary }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_12px_rgba(47,31,122,0.07)]">
      <div className="px-5 py-3 border-b border-black/6 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-brand" />
        <h2 className="text-sm font-semibold text-gray-800 tracking-[-0.01em]">
          3. Lesson Summary
        </h2>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600 leading-relaxed">{lessonSummary}</p>
      </div>
    </div>
  );
}

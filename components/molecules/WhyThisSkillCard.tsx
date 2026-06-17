import { AlertTriangle } from "lucide-react";

type Props = { explanation: string };

export default function WhyThisSkillCard({ explanation }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_12px_rgba(47,31,122,0.07)]">
      <div className="px-5 py-3 border-b border-black/6 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-brand" />
        <h2 className="text-sm font-semibold text-gray-800 tracking-[-0.01em]">
          2. Why This Skill Was Selected
        </h2>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600 leading-relaxed">{explanation}</p>
      </div>
    </div>
  );
}

import { getRecentAttempts } from "@/lib/analytics";
import { HISTORY_PAGE_ATTEMPTS_LIMIT } from "@/lib/constants";
import PageShell from "@/components/organisms/PageShell";
import QuizHistory from "@/components/organisms/QuizHistory";

export default function HistoryPage() {
  const recentAttempts = getRecentAttempts(HISTORY_PAGE_ATTEMPTS_LIMIT);

  return (
    <PageShell>
      <div className="mb-1">
        <h1 className="font-display text-xl font-bold text-gray-900 tracking-[-0.015em]">
          Quiz History
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Every attempt, most recent first.
        </p>
      </div>
      <QuizHistory attempts={recentAttempts} />
    </PageShell>
  );
}

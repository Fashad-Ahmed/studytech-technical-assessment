import { skills } from "@/data";
import PageShell from "@/components/organisms/PageShell";
import FlashcardGenerator from "@/components/organisms/FlashcardGenerator";
import GlossyOrb from "@/components/atoms/GlossyOrb";

export default function FlashcardsPage() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto w-full space-y-5">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="relative rounded-3xl overflow-hidden bg-hero shadow-[0_24px_64px_-12px_rgba(26,15,92,0.55)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_top_right,_rgba(109,77,232,0.55)_0%,_transparent_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_bottom_left,_rgba(74,47,196,0.35)_0%,_transparent_100%)]" />

          <div className="absolute -right-8 -top-12 pointer-events-none hidden sm:block opacity-90">
            <GlossyOrb size="md" floatVariant="a" />
          </div>
          <div className="absolute right-28 bottom-[-2.5rem] pointer-events-none hidden lg:block opacity-70">
            <GlossyOrb size="sm" floatVariant="b" />
          </div>

          <div className="relative px-7 py-9">
            <p className="text-[10px] font-bold text-white/35 uppercase tracking-[0.18em] mb-3">
              AI-Assisted Feature
            </p>
            <h1 className="font-display text-3xl font-bold text-white tracking-[-0.02em]">
              Flashcard Generator
            </h1>
            <p className="text-white/45 text-sm mt-2 max-w-md tracking-[-0.005em]">
              Pick any skill, generate fresh flashcards on demand standalone, not tied to your weakest-skill recommendation.
            </p>
          </div>
        </div>

        <FlashcardGenerator skills={skills} />
      </div>
    </PageShell>
  );
}

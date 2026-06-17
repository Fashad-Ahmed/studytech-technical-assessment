import Link from "next/link";
import { buildCertTree, computeSkillStats, getRecentAttempts } from "@/lib/analytics";
import { RECENT_ATTEMPTS_LIMIT } from "@/lib/constants";
import PageShell from "@/components/organisms/PageShell";
import WeaknessItem from "@/components/molecules/WeaknessItem";
import GlossyOrb from "@/components/atoms/GlossyOrb";
import CountUp from "@/components/atoms/CountUp";
import HeroStat from "@/components/molecules/HeroStat";
import QuickLinkCard from "@/components/molecules/QuickLinkCard";
import RevealList from "@/components/molecules/RevealList";
import { Sparkles, ListTree, History, LayoutGrid } from "lucide-react";

const iconClass = "w-4.5 h-4.5 text-brand";

const QUICK_LINKS = [
  {
    href: "/study",
    icon: <Sparkles className={iconClass} />,
    title: "Study Session",
    desc: "Weakest skill, explanation, lesson, flashcards & quiz plan",
  },
  {
    href: "/flashcards",
    icon: <LayoutGrid className={iconClass} />,
    title: "AI Flashcards",
    desc: "Generate AI flashcards for any skill, on demand",
  },
  {
    href: "/skills",
    icon: <ListTree className={iconClass} />,
    title: "Skill Tree",
    desc: "Browse the full CLF-C02 blueprint and weakest skill ranking",
  },
  {
    href: "/history",
    icon: <History className={iconClass} />,
    title: "Quiz History",
    desc: "Review every attempt with pass/fail breakdown",
  },
];

export default function OverviewPage() {
  const tree = buildCertTree();
  const skillStats = computeSkillStats();
  const recentAttempts = getRecentAttempts(RECENT_ATTEMPTS_LIMIT);
  const weakestSkill = skillStats[0];

  const totalAttempts = recentAttempts.length;
  const correctCount = recentAttempts.filter((a) => a.attempt.isCorrect).length;
  const overallAccuracy = totalAttempts > 0 ? correctCount / totalAttempts : 0;
  const readinessPct = Math.round(overallAccuracy * 100);

  return (
    <PageShell>
      {/* ── Readiness Hero ───────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-hero shadow-[0_24px_64px_-12px_rgba(26,15,92,0.55)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_top_right,_rgba(109,77,232,0.55)_0%,_transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_bottom_left,_rgba(74,47,196,0.35)_0%,_transparent_100%)]" />

        {/* floating glossy 3D orbs */}
        <div className="absolute -right-10 -top-16 pointer-events-none hidden sm:block opacity-90">
          <GlossyOrb size="lg" floatVariant="a" />
        </div>
        <div className="absolute right-32 bottom-[-3rem] pointer-events-none hidden lg:block opacity-70">
          <GlossyOrb size="sm" floatVariant="b" />
        </div>

        <div className="relative px-7 py-8 flex flex-col sm:flex-row sm:items-center gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-white/35 uppercase tracking-[0.18em] mb-4">
              Readiness Score · AWS CLF-C02
            </p>
            <div className="flex items-baseline gap-2 leading-none">
              <CountUp
                value={readinessPct}
                className="font-display text-[82px] font-bold text-white tracking-[-0.05em] leading-none"
              />
              <span className="text-4xl font-light text-white/25">%</span>
            </div>
            <p className="text-white/40 text-sm mt-3 tracking-[-0.005em]">
              {correctCount} of {totalAttempts} questions correct this session
            </p>
          </div>

          <div className="flex gap-8 sm:border-l sm:border-white/8 sm:pl-8 shrink-0 relative z-10">
            <HeroStat value={skillStats.length} label="Skills" color="text-white" />
            <HeroStat
              value={Math.round(weakestSkill.accuracy * 100)}
              suffix="%"
              label="Weakest"
              color="text-red-300"
            />
            <HeroStat value={tree.domains.length} label="Domains" color="text-emerald-300" />
          </div>
        </div>
      </div>

      {/* ── Quick links ──────────────────────────────────────────── */}
      <RevealList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_LINKS.map((link) => (
          <QuickLinkCard key={link.href} {...link} />
        ))}
      </RevealList>

      {/* ── Top weakness preview ────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_12px_rgba(47,31,122,0.07)]">
        <div className="px-4 py-3.5 border-b border-black/6 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 text-sm tracking-[-0.01em]">
            Where to focus next
          </h2>
          <Link
            href="/skills"
            className="text-[11px] font-medium text-brand hover:underline"
          >
            View all skills
          </Link>
        </div>
        <RevealList className="divide-y divide-black/3">
          {skillStats.slice(0, 3).map((stat, i) => (
            <WeaknessItem key={stat.skill.id} stat={stat} rank={i} />
          ))}
        </RevealList>
      </div>
    </PageShell>
  );
}

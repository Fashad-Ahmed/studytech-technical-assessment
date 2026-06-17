"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { currentUser } from "@/data";
import { ANIM_BASE, SPRING_NAV_PILL } from "@/lib/constants";
import { GraduationCap, User } from "lucide-react";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/study", label: "Study Session" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/skills", label: "Skill Tree" },
  { href: "/history", label: "Quiz History" },
];

export default function NavHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed w-full top-0 z-50 bg-white/86 backdrop-blur-[10px] backdrop-saturate-150 border-b border-black/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        <motion.div
          className="flex items-center gap-2.5 shrink-0"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: ANIM_BASE }}
        >
          <GraduationCap className="w-5 h-5 text-brand" />
          <span className="font-display font-semibold text-foreground text-lg tracking-[-0.01em]">
            StudyTech
          </span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-1 relative">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-medium tracking-[-0.005em] px-3 py-1.5 rounded-lg transition-colors ${
                  active ? "text-brand" : "text-gray-500 hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-brand-light rounded-lg"
                    transition={{ type: "spring", ...SPRING_NAV_PILL }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 text-gray-500 text-[13px] tracking-[-0.005em] shrink-0">
          <User className="w-3.5 h-3.5" />
          {currentUser.name}
        </div>
      </div>
    </header>
  );
}

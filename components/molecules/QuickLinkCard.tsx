"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ANIM_BASE, SPRING_ICON_HOVER } from "@/lib/constants";

type Props = {
  href: string;
  icon: ReactNode;
  title: string;
  desc: string;
};

export default function QuickLinkCard({ href, icon, title, desc }: Props) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: ANIM_BASE, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="group block bg-white rounded-2xl border border-black/6 p-5 shadow-[0_2px_12px_rgba(47,31,122,0.07)] hover:border-brand/30 hover:shadow-[0_12px_28px_rgba(74,47,196,0.15)] transition-shadow"
      >
        <motion.div
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-light mb-3.5"
          whileHover={{ rotate: -6, scale: 1.08 }}
          transition={{ type: "spring", ...SPRING_ICON_HOVER }}
        >
          {icon}
        </motion.div>
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="font-display font-semibold text-gray-900 text-sm tracking-[-0.005em]">
            {title}
          </h3>
          <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
      </Link>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ANIM_STAGGER_DELAY } from "@/lib/constants";

type Props = { children: ReactNode; className?: string };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: ANIM_STAGGER_DELAY } },
};

export default function RevealList({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

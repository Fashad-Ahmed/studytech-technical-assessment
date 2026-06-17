"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ANIM_BASE } from "@/lib/constants";

export default function PageFade({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIM_BASE, ease: "easeOut" }}
      className="space-y-5"
    >
      {children}
    </motion.div>
  );
}

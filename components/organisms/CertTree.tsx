"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CertTreeNode } from "@/lib/types";
import Badge from "@/components/atoms/Badge";
import { ANIM_FAST } from "@/lib/constants";
import { ChevronRight, Award, BookOpen, Layers, Target } from "lucide-react";

type Props = { tree: CertTreeNode };

const collapseVariants = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
};

export default function CertTree({ tree }: Props) {
  const [openDomains, setOpenDomains] = useState<Set<string>>(new Set());
  const [openSkillSets, setOpenSkillSets] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, id: string): Set<string> => {
    const next = new Set(set);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return next;
  };

  return (
    <div className="bg-white rounded-2xl border border-black/6 overflow-hidden shadow-[0_2px_8px_rgba(47,31,122,0.06)]">
      <div className="bg-linear-to-r from-brand to-brand-dark px-4 py-3 flex items-center gap-2">
        <Award className="w-4 h-4 text-white/80" />
        <span className="font-display text-white font-semibold text-sm tracking-[-0.005em]">
          {tree.certification.name}
        </span>
        <span className="ml-auto">
          <Badge variant="ghost">{tree.certification.code}</Badge>
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {tree.domains.map(({ domain, skillSets }) => {
          const domainOpen = openDomains.has(domain.id);
          return (
            <div key={domain.id}>
              <button
                onClick={() => setOpenDomains(toggle(openDomains, domain.id))}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-brand-light transition-colors text-left"
              >
                <motion.div animate={{ rotate: domainOpen ? 90 : 0 }} transition={{ duration: ANIM_FAST }}>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                </motion.div>
                <BookOpen className="w-4 h-4 text-brand shrink-0" />
                <span className="text-sm font-medium text-gray-800 flex-1">
                  {domain.name}
                </span>
                <span className="text-xs text-gray-400 shrink-0">
                  {domain.examWeight}%
                </span>
              </button>

              <AnimatePresence initial={false}>
                {domainOpen && (
                  <motion.div
                    key="domain-body"
                    variants={collapseVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={{ duration: ANIM_FAST, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                    className="border-t border-gray-100"
                  >
                    {skillSets.map(({ skillSet, skills }) => {
                      const ssOpen = openSkillSets.has(skillSet.id);
                      return (
                        <div key={skillSet.id} className="bg-gray-50">
                          <button
                            onClick={() =>
                              setOpenSkillSets(toggle(openSkillSets, skillSet.id))
                            }
                            className="w-full flex items-center gap-2 pl-8 pr-4 py-2.5 hover:bg-brand-medium transition-colors text-left"
                          >
                            <motion.div
                              animate={{ rotate: ssOpen ? 90 : 0 }}
                              transition={{ duration: ANIM_FAST }}
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            </motion.div>
                            <Layers className="w-3.5 h-3.5 text-brand shrink-0" />
                            <span className="text-xs font-medium text-gray-700">
                              {skillSet.name}
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {ssOpen && (
                              <motion.div
                                key="skillset-body"
                                variants={collapseVariants}
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                transition={{ duration: ANIM_FAST, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                                className="pb-1"
                              >
                                {skills.map((skill) => (
                                  <div
                                    key={skill.id}
                                    className="flex items-center gap-2 pl-14 pr-4 py-1.5"
                                  >
                                    <Target className="w-3 h-3 text-emerald-500 shrink-0" />
                                    <span className="text-xs text-gray-600">
                                      {skill.name}
                                    </span>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

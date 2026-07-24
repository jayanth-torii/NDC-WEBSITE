"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Clock, Users, BookOpen, BookMarked, GraduationCap, AlertTriangle, IdCard, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const getRuleIcon = (rule: string) => {
  const text = rule.toLowerCase();
  if (text.includes("timing")) return <Clock size={18} />;
  if (text.includes("eligible") || text.includes("admitted")) return <Users size={18} />;
  if (text.includes("thesis") || text.includes("dissertation")) return <GraduationCap size={18} />;
  if (text.includes("journal") || text.includes("reference")) return <BookMarked size={18} />;
  if (text.includes("identity card") || text.includes("id card")) return <IdCard size={18} />;
  if (text.includes("damage") || text.includes("lost") || text.includes("replace") || text.includes("silence") || text.includes("misbehavior")) return <AlertTriangle size={18} />;
  if (text.includes("borrow") || text.includes("book") || text.includes("renewal")) return <BookOpen size={18} />;
  return <ShieldCheck size={18} />;
};

export default function EventsRules({ data }: { data: any }) {
  if (!data) return null;
  const { title, events, rulesRegulations } = data;

  const [visibleCount, setVisibleCount] = useState(6);
  const [isShowingLess, setIsShowingLess] = useState(false);

  const rules = rulesRegulations?.sections || [];
  const totalRules = rules.length;
  const visibleRules = rules.slice(0, visibleCount);

  const handleToggleShow = () => {
    if (visibleCount < totalRules) {
      setIsShowingLess(false);
      setVisibleCount((prev) => prev + 6);
    } else {
      setIsShowingLess(true);
      setVisibleCount(6);
    }
  };

  return (
    <div className="mb-16 relative">
      {/* Events */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <SectionHeading eyebrow="Campus Life" title={title} className="mb-6" />
        <div className="space-y-4 max-w-4xl border-l-2 border-card-border pl-6 md:pl-8">
          {events?.map((paragraph: string, index: number) => (
            <p key={index} className="text-base text-body-gray leading-relaxed font-medium">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Rules */}
      <div className="pt-8 border-t border-card-border relative">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">

          <div className="w-full md:w-1/4">
            <div className="md:sticky md:top-24">
              <h2 className="text-navy font-bold text-2xl mb-3">
                {rulesRegulations?.title}
              </h2>
              <span className="inline-block h-[3px] w-12 bg-orange rounded-full" />

              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-chip-bg text-orange mt-6 mb-4">
                <ClipboardList size={22} />
              </div>

              <p className="text-base text-body-gray">
                Please adhere to the following guidelines to ensure a productive environment for everyone.
              </p>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <AnimatePresence initial={false}>
                {visibleRules.map((rule: string, index: number) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, height: 0, padding: 0 }}
                    animate={{ opacity: 1, height: "auto", padding: "1.5rem" }}
                    exit={{ opacity: 0, height: 0, padding: 0, overflow: "hidden" }}
                    transition={{ duration: isShowingLess ? 0.8 : 0.3, ease: "easeInOut" }}
                    className="bg-surface-tint rounded-[20px] border border-card-border hover:border-orange/30 hover:bg-white hover:shadow-[var(--shadow-card-hover)] transition-all duration-250 ease-[var(--ease-editorial)] flex flex-col justify-between overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-2xl font-black text-orange leading-none">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-chip-bg text-orange shrink-0">
                        {getRuleIcon(rule)}
                      </span>
                    </div>
                    <p className="text-base text-navy font-medium leading-snug">
                      {rule}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {totalRules > 6 && (
              <motion.div layout className="flex justify-center mt-10">
                <Button onClick={handleToggleShow} variant="primary">
                  {visibleCount < totalRules ? "Load More Rules" : "Show Less"}
                </Button>
              </motion.div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

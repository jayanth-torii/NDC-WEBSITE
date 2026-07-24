"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Library as LibraryIcon, BookOpen } from "lucide-react";
import Kicker from "@/components/ui/Kicker";
import LibraryIllustration from "./LibraryIllustration";

export default function AboutLibrary({ data }: { data: any }) {
  const aboutText = data?.aboutText || [];
  const sections = data?.dropdowns || [];
  const title = data?.title || "About Library";

  const titleWords = title.trim().split(" ");
  const titleLast = titleWords.length > 1 ? titleWords.pop() : null;

  const cardTheme = [
    { bg: "bg-surface-tint", iconBg: "bg-navy", icon: <BookOpen size={22} /> },
    { bg: "bg-chip-bg", iconBg: "bg-orange", icon: <LibraryIcon size={22} /> },
  ];

  return (
    <div className="mb-16 pt-8">
      <div className="grid lg:grid-cols-[1fr_260px] gap-10 items-center mb-10">
        <div className="max-w-2xl">
          <Kicker>Academics</Kicker>
          <h2 className="mt-3 text-navy text-[28px] sm:text-[34px] md:text-[40px] font-extrabold leading-[1.15] tracking-[-0.5px]">
            {titleWords.join(" ")} {titleLast && <span className="text-orange">{titleLast}</span>}
          </h2>

          <div className="mt-6 space-y-4 border-l-2 border-card-border pl-6 md:pl-8">
            {aboutText.map((paragraph: string, index: number) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-base text-body-gray leading-relaxed text-justify"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        <LibraryIllustration className="hidden lg:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {sections.map((section: any, index: number) => {
          const theme = cardTheme[index % cardTheme.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`${theme.bg} rounded-[24px] p-8 md:p-10 border border-card-border flex flex-col hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 ease-[var(--ease-editorial)]`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} text-white flex items-center justify-center shrink-0`}>
                  {theme.icon}
                </div>
                <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
              </div>

              <ul className="space-y-4">
                {(section.content?.[0]?.items || []).map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange/15 text-orange mt-0.5 shrink-0">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <p className="text-base text-body-gray leading-relaxed font-medium">{point}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  UserRound,
  ClipboardList,
  Users,
  ShieldCheck,
  MessageCircle,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

const DotGrid = ({ className = "", dot = "bg-orange/30" }: { className?: string; dot?: string }) => (
  <div className={`grid grid-cols-4 gap-1.5 ${className}`} aria-hidden="true">
    {Array.from({ length: 16 }).map((_, i) => (
      <span key={i} className={`w-1.5 h-1.5 rounded-full ${dot}`} />
    ))}
  </div>
);

const MentorMark = () => (
  <div className="relative w-full h-full" aria-hidden="true">
    <svg className="absolute -top-3 -right-1 w-14 h-14 opacity-70" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="27" stroke="#f6872a" strokeWidth="1.5" strokeDasharray="3 5" />
    </svg>
    <span className="absolute -bottom-1 right-6 w-2.5 h-2.5 rounded-full bg-orange/70" />

    <div className="relative flex items-center justify-center pt-6">
      <div className="relative flex items-end gap-4">
        <div className="w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center shadow-[0_14px_30px_rgba(14,36,85,0.35)]">
          <UserRound size={28} />
        </div>
        <MessageCircle size={20} className="absolute -top-5 left-9 text-orange fill-white" />
        <div className="w-20 h-20 rounded-2xl bg-orange text-white flex items-center justify-center shadow-[0_14px_30px_rgba(246,135,42,0.35)] -mb-3">
          <GraduationCap size={32} />
        </div>
      </div>
    </div>
  </div>
);

const GuidanceMark = () => (
  <div className="relative w-40 h-40" aria-hidden="true">
    <Users size={140} strokeWidth={1} className="text-navy/10 absolute inset-0" />
    <ShieldCheck size={60} strokeWidth={1} className="text-navy/15 absolute bottom-0 right-0" />
  </div>
);

const MentoringCell = ({ MentoringCellData }: any) => {
  const { title, description, GuideLines, table } = MentoringCellData;

  const titleWords = (title || "").trim().split(" ");
  const titleLast = titleWords.pop();
  const titleRest = titleWords.join(" ");

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="pt-20 pb-28 lg:pt-24 lg:pb-36 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <DotGrid className="absolute top-14 left-6 lg:left-10 opacity-80 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-72 h-72 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #f6872a 0 2px, transparent 2px 14px)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <div className="hidden lg:block absolute -left-16 xl:-left-28 -top-4 w-40 h-40 pointer-events-none">
              <MentorMark />
            </div>
            <div className="hidden lg:block absolute -right-8 xl:-right-20 -top-6 w-36 h-36 pointer-events-none">
              <GuidanceMark />
            </div>

            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-orange/50" />
              <span className="w-7 h-7 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0">
                <Users size={14} />
              </span>
              <span className="text-[13px] font-bold uppercase tracking-[2px] text-orange">Guidance &amp; Support</span>
              <span className="h-px w-8 bg-orange/50" />
            </div>

            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold leading-[1.1] tracking-[-0.5px]">
              <span className="text-navy">{titleRest}</span> <span className="text-orange">{titleLast}</span>
            </h2>

            <div className="flex items-center gap-2 my-5" aria-hidden="true">
              <span className="h-[3px] w-9 rounded-full bg-navy" />
              <span className="w-2 h-2 rounded-full bg-orange" />
              <span className="h-[3px] w-9 rounded-full bg-navy" />
            </div>

            <p className="text-lg text-body-gray leading-relaxed">{description}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Guidelines */}
            {GuideLines && (
              <motion.div variants={itemVariants} className="lg:col-span-7">
                <div className="bg-white rounded-[28px] shadow-[0_20px_50px_rgba(14,36,85,0.08)] border border-gray-100 p-8 lg:p-10 pl-11 lg:pl-14 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-6 lg:w-7 bg-gradient-to-b from-navy to-[#0a1a3f] rounded-r-2xl" />
                  <div className="absolute left-0 bottom-0 w-8 h-8 bg-orange rounded-tr-[20px]" />

                  <div className="relative flex items-center gap-3 mb-3">
                    <span className="w-11 h-11 rounded-2xl bg-orange text-white flex items-center justify-center shrink-0 shadow-[0_8px_18px_rgba(246,135,42,0.35)]">
                      <ClipboardList size={22} />
                    </span>
                    <h3 className="text-2xl font-bold text-navy">{GuideLines.title}</h3>
                  </div>
                  <span className="block h-[3px] w-16 bg-orange rounded-full mb-8" />

                  <div className="relative">
                    <div className="absolute left-[19px] top-3 bottom-3 border-l-2 border-dashed border-orange/40" />
                    {GuideLines.points.map((item: string, index: number) => (
                      <div
                        key={index}
                        className={`flex gap-4 relative py-4 ${
                          index !== GuideLines.points.length - 1 ? "border-b border-dashed border-gray-200" : ""
                        }`}
                      >
                        <span className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-white border-2 border-navy text-navy font-extrabold text-sm flex items-center justify-center">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-gray-600 leading-relaxed pt-1.5">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Committee Members */}
            {table && table.length > 0 && (
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <div className="flex items-stretch gap-3 mb-6">
                  <div className="flex-1 bg-navy rounded-2xl px-6 py-4 flex items-center shadow-[0_14px_30px_rgba(14,36,85,0.25)]">
                    <h3 className="text-xl font-bold text-white">Committee Members</h3>
                  </div>
                  <div className="w-16 shrink-0 bg-orange rounded-2xl flex items-center justify-center shadow-[0_14px_30px_rgba(246,135,42,0.3)]">
                    <Users className="text-white" size={24} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {table.map((member: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(246,135,42,0.08)] transition-all duration-300 flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-orange/10 text-navy group-hover:bg-navy group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                        <User size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-navy text-[15px] mb-0.5 truncate">{member.name}</h4>
                        <p className="text-[11px] font-bold text-orange uppercase tracking-wider truncate">{member.role}</p>
                      </div>
                      <span className="w-px h-8 bg-gray-200 shrink-0" />
                      <ChevronRight className="text-orange shrink-0 group-hover:translate-x-0.5 transition-transform duration-300" size={18} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none leading-[0]" aria-hidden="true">
        <svg viewBox="0 0 1440 110" className="w-full h-[70px] md:h-[100px] block" preserveAspectRatio="none">
          <path d="M0,50 C 320,110 1100,-30 1440,40 L1440,110 L0,110 Z" fill="#0a1a3f" />
          <path d="M0,50 C 320,110 1100,-30 1440,40" fill="none" stroke="#f6872a" strokeWidth="4" />
        </svg>
        <DotGrid className="absolute bottom-3 left-6 opacity-30" dot="bg-orange" />
        <DotGrid className="absolute bottom-3 right-6 opacity-30" dot="bg-white" />
      </div>
    </section>
  );
};

export default MentoringCell;

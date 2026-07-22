"use client";
import React from "react";
import { motion } from "framer-motion";
import { Eye, Target, History } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const OurVisionMission = ({ data }: { data: any }) => {
  if (!data || !data.dropdowns) return null;

  // Manually extracting from the specific JSON structure
  const visionMissionData = data.dropdowns.find((d: any) => d.title === "Our Vision & Mission");
  const historyData = data.dropdowns.find((d: any) => d.title === "History & Milestones");

  // Extract text
  const visionText = visionMissionData?.content[1]?.items?.[0] || "Leadership and Excellence in Education";
  const missionItems = visionMissionData?.content[3]?.items || [];
  const historyItems = historyData?.content[0]?.items || [];

  return (
    <section className="py-24 bg-[#0a1a3f] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#f6872a]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0e2455] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#f6872a] font-bold tracking-wider uppercase text-sm mb-3">Our Core Purpose</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Vision & Mission
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/10 hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-bl-full transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-xl text-white/90 leading-relaxed font-medium relative z-10">
              {visionText}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/10 hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f6872a]/20 rounded-bl-full transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#f6872a] text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white">Our Mission</h3>
            </div>
            <ul className="space-y-4 relative z-10">
              {missionItems.map((item: string, index: number) => (
                <li key={index} className="flex gap-4 text-white/80 leading-relaxed">
                  <span className="text-[#f6872a] mt-1 text-lg shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-[#0e2455] to-[#1a3a7a] rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <History size={200} className="-mt-10 -mr-10" />
          </div>
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider">History & Milestones</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {historyItems.map((item: string, index: number) => (
              <div key={index} className="bg-black/20 rounded-2xl p-6 border border-white/5">
                <p className="text-white/80 leading-relaxed text-sm lg:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurVisionMission;

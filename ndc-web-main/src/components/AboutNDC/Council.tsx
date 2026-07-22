"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, UserCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const Council = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, members } = data;

  return (
    <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#0e2455]/5 rounded-2xl flex items-center justify-center text-[#0e2455]">
              <Users size={32} />
            </div>
          </div>
          <SectionHeading eyebrow="Leadership" title={title} align="center" className="mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members?.map((member: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0e2455] group-hover:text-white transition-colors duration-300 border border-gray-100 text-gray-400">
                <UserCircle size={40} />
              </div>
              <h3 className="font-bold text-[#0e2455] text-lg mb-1">{member.name}</h3>
              <p className="text-sm font-semibold text-[#f6872a] uppercase tracking-wider mb-3">
                {member.position}
              </p>
              <div className="w-8 h-1 bg-gray-200 rounded-full mb-3 group-hover:bg-[#f6872a] transition-colors" />
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {member.designation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Council;

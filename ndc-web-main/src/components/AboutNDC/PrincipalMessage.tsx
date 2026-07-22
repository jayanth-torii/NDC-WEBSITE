"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const PrincipalMessage = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, image, principalName, position, message } = data;

  return (
    <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading eyebrow="Leadership" title={title} align="center" className="mb-6" />
        </div>

        <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-6xl mx-auto relative overflow-hidden">
          {/* Giant decorative quote */}
          <span className="absolute -top-4 -left-2 text-[200px] text-gray-50 opacity-50 font-serif leading-none pointer-events-none">
            "
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e2455] to-blue-500 rounded-3xl transform rotate-6 scale-105 opacity-20 -z-10" />
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                <img
                  src={image}
                  alt={principalName}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">{principalName}</h3>
                  <p className="text-sm text-white/80 font-medium">{position}</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Message */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="hidden lg:block mb-8">
                <h2 className="text-3xl font-bold text-[#0e2455] mb-2">{principalName}</h2>
                <p className="text-[#f6872a] font-bold tracking-wider uppercase text-sm">{position}</p>
              </div>

              {message?.map((each: any, index: number) => (
                <p key={index} className="text-gray-600 leading-relaxed text-lg">
                  {each}
                </p>
              ))}

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div className="font-serif italic text-gray-400 text-xl">
                  "Empowering students to meet and exceed challenges."
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;

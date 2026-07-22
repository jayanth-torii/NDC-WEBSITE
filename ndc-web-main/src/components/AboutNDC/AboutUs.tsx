"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const AboutUs = ({ data }: { data: any }) => {
  if (!data) return null;
  const { title, description, image } = data;

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <SectionHeading eyebrow="Welcome to NDC" title={title} align="left" className="mb-8" />
            <div className="space-y-6">
              {description?.map((each: string, index: number) => (
                <p
                  key={index}
                  className="text-lg text-gray-600 leading-relaxed font-medium"
                >
                  {each}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f6872a] to-orange-300 rounded-[40px] blur-2xl opacity-20 transform rotate-3 scale-105" />
            <div className="relative rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(14,36,85,0.1)] border-8 border-white">
              <img
                src={image}
                alt="About Us"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2455]/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

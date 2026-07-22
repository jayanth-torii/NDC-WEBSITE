"use client";
import React from "react";
import { motion } from "framer-motion";
import { Laptop, Building2, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const Procedure = ({ data }: { data: any }) => {
  if (!data) return null;

  const { image, title, procedures } = data;

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 lg:py-24 bg-[#0a1a3f] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#f6872a]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0e2455] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#f6872a] font-bold tracking-wider uppercase text-sm mb-3">Join Us</h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              {title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Choose the application method that works best for you. Our process is designed to be smooth and accessible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Image */}
            {image && (
              <motion.div variants={itemVariants} className="lg:col-span-5 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f6872a] to-orange-300 rounded-[32px] blur-xl opacity-20 transform -rotate-6 scale-105" />
                <div className="bg-white p-6 rounded-[32px] relative z-10 shadow-2xl">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </div>
              </motion.div>
            )}

            {/* Right: Steps */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
              {procedures?.map((section: any, index: number) => {
                const isOnline = section.title.toLowerCase().includes("online");
                
                return (
                  <div 
                    key={index} 
                    className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                        isOnline ? 'bg-[#f6872a] text-white shadow-orange-500/20' : 'bg-white text-[#0e2455]'
                      }`}>
                        {isOnline ? <Laptop size={32} /> : <Building2 size={32} />}
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-4xl font-black text-white/10 group-hover:text-[#f6872a]/20 transition-colors">
                            0{index + 1}
                          </span>
                          <h3 className="text-2xl font-bold text-white">
                            {section?.title}
                          </h3>
                        </div>
                        <p className="text-white/80 leading-relaxed text-lg mb-4">
                          {section?.description}
                        </p>
                        
                        {isOnline && (
                          <button className="inline-flex items-center gap-2 text-[#f6872a] font-semibold hover:text-white transition-colors group/btn">
                            Proceed to Payment <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Procedure;

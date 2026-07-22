"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const OurCampus = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, campuses } = data;

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading eyebrow="Our Presence" title={title} align="center" className="mb-6" />
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover our world-class campuses designed to provide the perfect environment for learning, growth, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campuses?.map((campus: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={campus.image}
                  alt={campus.collegeName}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-[#f6872a] font-bold text-xs uppercase tracking-wider mb-2">
                    <MapPin size={14} />
                    {campus.location}
                  </div>
                  <h3 className="text-white font-bold text-xl leading-tight">
                    {campus.collegeName}
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow relative bg-white">
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                  {campus.collegeDescription}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100">
                  <a 
                    href={campus.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0e2455] font-bold hover:text-[#f6872a] transition-colors group/link"
                  >
                    Visit Website
                    <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-[#f6872a] group-hover/link:text-white transition-colors">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCampus;

"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Phone, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const RedressalCell = ({ redressalData }: any) => {
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
    <section className="py-20 lg:py-24 bg-[#0a1a3f] relative overflow-hidden">
      {/* Decorative abstract shapes */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#f6872a]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0e2455] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#f6872a] font-bold tracking-wider uppercase text-sm mb-3">Support & Resolution</h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              {redressalData.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              {redressalData.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {redressalData.sections?.map((section: any, index: number) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                className={`bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 ${index === 2 ? 'lg:col-span-2 lg:w-2/3 mx-auto' : ''}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#f6872a] flex items-center justify-center text-white shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                </div>
                
                {section.description && (
                  <p className="text-white/80 leading-relaxed mb-4">{section.description}</p>
                )}
                
                {section.list && section.list.length > 0 && (
                  <ul className="space-y-3">
                    {section.list.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f6872a] shrink-0 mt-2.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* Procedure */}
          {redressalData.ProcedureSection && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-white rounded-bl-full pointer-events-none" />
              <h3 className="text-2xl lg:text-3xl font-bold text-[#0e2455] mb-8 relative z-10">
                {redressalData.ProcedureSection.title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {redressalData.ProcedureSection.procedurepoints.map((point: string, i: number) => {
                  const urlMatch = point.match(/https?:\/\/[^\s]+/);
                  const textContent = point.replace(/https?:\/\/[^\s]+/, '').trim();
                  
                  return (
                    <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#f6872a]/30 hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-[#0e2455] text-white flex items-center justify-center font-bold text-lg mb-4">
                        {i + 1}
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {textContent.replace('-', '').trim()}
                      </p>
                      {urlMatch && (
                        <a href={urlMatch[0]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#f6872a] font-semibold hover:text-[#0e2455] transition-colors">
                          Submit Online <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Committee Members */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Committee Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redressalData.TableSection?.map((member: any, index: number) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#f6872a]/20 text-[#f6872a] text-xs font-bold uppercase tracking-wider mb-4 border border-[#f6872a]/20">
                    {member.role}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                  <p className="text-sm text-white/60 mb-5 pb-5 border-b border-white/10">{member.designation}</p>
                  
                  <div className="space-y-3">
                    <a href={`mailto:${member.Email?.trim()}`} className="flex items-center gap-3 text-white/80 hover:text-[#f6872a] transition-colors text-sm group/link">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-[#f6872a]/20">
                        <Mail size={14} />
                      </div>
                      <span className="truncate">{member.Email}</span>
                    </a>
                    <a href={`tel:${member.contactNumber?.trim()}`} className="flex items-center gap-3 text-white/80 hover:text-[#f6872a] transition-colors text-sm group/link">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-[#f6872a]/20">
                        <Phone size={14} />
                      </div>
                      {member.contactNumber}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default RedressalCell;

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Eye, Rocket, UserCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const TrainingPlacementAndInternshipCell = ({ data }: any) => {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const getMergedSections = () => {
    if (!data?.sections) return { vision: null, mission: null, rest: [] };
    const vision = data.sections.find((s: any) => s.title === "Our Vision");
    const mission = data.sections.find((s: any) => s.title === "Our Mission");
    const rest = data.sections.filter(
      (s: any) => s.title !== "Our Vision" && s.title !== "Our Mission"
    );
    return { vision, mission, rest };
  };

  const { vision, mission, rest } = getMergedSections();

  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center mb-16">
            <SectionHeading eyebrow="Bridging the Gap" title={data.title} align="center" className="mb-6" />
            <p className="text-lg text-body-gray leading-relaxed">{data.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Left: Images Masonry */}
            <motion.div variants={itemVariants} className="relative h-full flex flex-col justify-center gap-6">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#0e2455]/5 to-transparent rounded-full blur-3xl -z-10" />
              {data.images?.map((src: string, index: number) => (
                <div
                  key={index}
                  className={`relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ${index % 2 === 1 ? 'ml-12 lg:ml-24' : 'mr-12 lg:mr-24'}`}
                >
                  <img src={src} alt={`Training & Placement ${index}`} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ))}
            </motion.div>

            {/* Right: Vision, Mission & Coordinators */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Vision */}
              {vision && (
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full transition-transform duration-500 group-hover:scale-110" />
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
                      <Eye size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0e2455]">{vision.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed relative z-10">{vision.description}</p>
                </div>
              )}

              {/* Mission */}
              {mission && (
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full transition-transform duration-500 group-hover:scale-110" />
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f6872a] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/30">
                      <Rocket size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0e2455]">{mission.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed relative z-10">{mission.description}</p>
                </div>
              )}

              {/* Rest of sections if any */}
              {rest.map((section: any, index: number) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-[var(--shadow-card)]">
                  <h3 className="text-xl font-bold text-[#0e2455] mb-4">{section.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{section.description}</p>
                  {section.list?.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {section.list.map((item: string, i: number) => (
                        <li key={i} className="flex gap-2 text-gray-600">
                          <span className="text-[#f6872a] mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

            </motion.div>
          </div>

          {/* Facilities / Coordinators Grid */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-bold text-[#0e2455] mb-8 text-center">Placement Coordinators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.facilitiesTable?.map((row: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(14,36,85,0.08)] transition-all duration-300 text-center group">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-4 group-hover:bg-[#0e2455] group-hover:text-white transition-colors duration-300">
                    <UserCheck size={28} />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{row.name}</h4>
                  <p className="text-sm font-medium text-[#f6872a] uppercase tracking-wider">{row.role}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default TrainingPlacementAndInternshipCell;

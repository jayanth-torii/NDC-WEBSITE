"use client";
import React from "react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ClipboardEdit, Mail, Search, ShieldCheck, Link, FileText } from "lucide-react";

const Procedure = ({ data }: any) => {
  if (!data || data.length === 0) return null;

  return (
    <RevealGroup className="mb-10 md:mb-20 space-y-8">
      {data.map((policy: any, index: any) => {
        const isGrievanceProcedure = policy.title === "Procedure" && policy.points?.some((p: string) => p.includes("forms.gle"));
        
        if (isGrievanceProcedure) {
          const linkMatch = policy.points.join(" ").match(/https:\/\/forms\.gle\/[a-zA-Z0-9]+/);
          const formLink = linkMatch ? linkMatch[0] : "#";

          return (
            <RevealItem key={index}>
              <div className="bg-[#0f1a30] rounded-[24px] border border-white/5 p-8 md:p-12 relative overflow-hidden mt-10 shadow-2xl">
                {/* Background Shapes and Glows */}
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#F6872A]/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-[#F6872A]/20 pointer-events-none z-0"></div>
                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-white/20 pointer-events-none z-0"></div>
                <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full border border-white/10 pointer-events-none z-0"></div>
                
                {/* Background Watermark */}
                <div className="absolute -bottom-16 -right-16 opacity-[0.04] z-0">
                  <FileText size={450} className="text-white" />
                </div>
                
                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center mb-16 relative z-10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-[2px] bg-[#F6872A]"></div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">Procedure</h2>
                    <div className="w-12 h-[2px] bg-[#F6872A]"></div>
                  </div>
                  <p className="text-blue-200/70 tracking-widest text-sm font-medium uppercase">Simple. Transparent. Accessible.</p>
                </div>

                {/* 4 Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 mb-16">
                  {/* Connecting Line (Desktop only) */}
                  <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#1e293b] z-[-1]"></div>
                  
                  {/* Step 1 */}
                  <div className="bg-white rounded-[20px] p-6 pt-12 relative text-center shadow-xl border border-gray-100 flex flex-col items-center mt-6 md:mt-0 z-10 transition-transform hover:-translate-y-2 duration-300">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-[6px] border-[#0f1a30] flex items-center justify-center shadow-lg">
                      <ClipboardEdit className="text-[#F6872A]" size={24} />
                      <div className="absolute -top-3 -left-4 w-8 h-8 rounded-full bg-[#F6872A] text-white flex items-center justify-center font-bold text-sm shadow-md">01</div>
                    </div>
                    <h3 className="font-bold text-[#1a3668] text-[17px] mb-3">Lodge Your Grievance</h3>
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                      Students can submit their grievance online using the link or drop a written complaint in the suggestion box (anonymous option available).
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-[20px] p-6 pt-12 relative text-center shadow-xl border border-gray-100 flex flex-col items-center mt-6 md:mt-0 z-10 transition-transform hover:-translate-y-2 duration-300">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-[6px] border-[#0f1a30] flex items-center justify-center shadow-lg">
                      <Mail className="text-[#1a3668]" size={24} />
                      <div className="absolute -top-3 -left-4 w-8 h-8 rounded-full bg-[#F6872A] text-white flex items-center justify-center font-bold text-sm shadow-md">02</div>
                    </div>
                    <h3 className="font-bold text-[#1a3668] text-[17px] mb-3">Acknowledgement</h3>
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                      You will receive an acknowledgement for your grievance within 2 working days.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-[20px] p-6 pt-12 relative text-center shadow-xl border border-gray-100 flex flex-col items-center mt-6 md:mt-0 z-10 transition-transform hover:-translate-y-2 duration-300">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-[6px] border-[#0f1a30] flex items-center justify-center shadow-lg">
                      <Search className="text-[#F6872A]" size={24} />
                      <div className="absolute -top-3 -left-4 w-8 h-8 rounded-full bg-[#F6872A] text-white flex items-center justify-center font-bold text-sm shadow-md">03</div>
                    </div>
                    <h3 className="font-bold text-[#1a3668] text-[17px] mb-3">Review & Action</h3>
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                      The Grievance Cell will review your case and take appropriate action after verification.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white rounded-[20px] p-6 pt-12 relative text-center shadow-xl border border-gray-100 flex flex-col items-center mt-6 md:mt-0 z-10 transition-transform hover:-translate-y-2 duration-300">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-[6px] border-[#0f1a30] flex items-center justify-center shadow-lg">
                      <ShieldCheck className="text-[#1a3668]" size={24} />
                      <div className="absolute -top-3 -left-4 w-8 h-8 rounded-full bg-[#F6872A] text-white flex items-center justify-center font-bold text-sm shadow-md">04</div>
                    </div>
                    <h3 className="font-bold text-[#1a3668] text-[17px] mb-3">Resolution & Feedback</h3>
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                      You will be informed about the resolution and your feedback helps us improve continuously.
                    </p>
                  </div>
                </div>

                {/* Bottom Link Button */}
                <div className="flex justify-center relative z-10">
                   <a href={formLink} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-6 py-4 rounded-full flex flex-col md:flex-row items-center gap-4 transition-all hover:scale-105 group">
                      <div className="w-10 h-10 rounded-full bg-[#F6872A] flex items-center justify-center shrink-0">
                        <Link className="text-white" size={18} />
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <span className="text-white font-bold text-[15px]">Online Grievance Link:</span>
                        <span className="text-[#F6872A] font-bold text-[15px] underline underline-offset-4">{formLink}</span>
                      </div>
                   </a>
                </div>
              </div>
            </RevealItem>
          );
        }

        return (
          <RevealItem key={index}>
            <div className="bg-white rounded-[24px] border border-card-border shadow-[var(--shadow-card)] p-6 md:p-10 relative overflow-hidden group transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:border-orange/40">
               {/* Background Shapes for generic procedure */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange/5 rounded-full blur-[60px] pointer-events-none transition-all group-hover:bg-orange/10"></div>
               <div className="absolute top-1/2 left-4 w-3 h-3 rounded-full bg-blue-500/10 pointer-events-none"></div>
               
               {/* Step Number Background */}
               <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-300 pointer-events-none text-navy text-8xl font-black italic">
                  {String(index + 1).padStart(2, '0')}
               </div>
               
               <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-[var(--shadow-cta)]">
                     {index + 1}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-navy">{policy.title}</h2>
               </div>

               <div className="relative z-10">
                  {policy.descriptions?.map((desc: any, idx: any) => (
                    <p key={idx} className="text-justify text-body-gray leading-relaxed mb-4 text-[16px] md:text-[17px]">
                      {desc}
                    </p>
                  ))}

                  {policy.points?.length > 0 && (
                    <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {policy.points.map((point: any, idx: any) => (
                        <li key={idx} className="flex items-start gap-3 bg-surface-tint p-4 rounded-[12px] border border-card-border transition-colors hover:border-orange/40 hover:bg-white">
                          <span className="w-2 h-2 rounded-full bg-orange mt-2 flex-shrink-0"></span>
                          <span className="text-[15px] md:text-[16px] text-body-gray leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
               </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
};

export default Procedure;

"use client";
import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Phone, Mail, User, ShieldCheck } from "lucide-react";

const AntiragginCommitte = ({ data }: any) => {
  const { title, descriptions = [], tableSection = [] } = data;

  if (!data) return null;

  return (
    <div className="mb-10 md:mb-20">
      <SectionHeading title={title} className="mb-6" />

      {descriptions.length > 0 && (
        <div className="mb-10">
          {descriptions.map((desc: string, idx: number) => (
            <p key={idx} className="text-justify text-[16px] md:text-[17px] text-body-gray leading-relaxed mb-4 last:mb-0">
              {desc}
            </p>
          ))}
        </div>
      )}

      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tableSection.map((member: any, index: number) => (
          <RevealItem key={index}>
            <div className="bg-white rounded-[24px] border border-card-border shadow-[var(--shadow-card)] p-6 md:p-8 h-full flex flex-col relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-card-hover)] hover:border-orange/30">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange/10 to-transparent rounded-bl-[100%] z-0 transition-transform duration-500 group-hover:scale-110"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-surface-tint border-2 border-white shadow-sm flex items-center justify-center text-orange shrink-0">
                    <User size={28} strokeWidth={1.5} />
                  </div>
                  {member.role && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange/10 text-orange font-bold text-[12px] uppercase tracking-wider">
                      <ShieldCheck size={14} />
                      {member.role}
                    </span>
                  )}
                </div>

                <div className="mb-6 flex-grow">
                  <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-orange transition-colors duration-300">
                    {member.name}
                  </h3>
                  {member.designation && (
                    <p className="text-body-gray text-[14px] font-medium leading-relaxed">
                      {member.designation}
                    </p>
                  )}
                </div>

                {/* Contact Info */}
                {(member.mobile || member.email) && (
                  <div className="pt-5 border-t border-card-border space-y-3 mt-auto">
                    {member.mobile && (
                      <a href={`tel:${member.mobile}`} className="flex items-center gap-3 text-[14px] text-body-gray hover:text-orange transition-colors">
                        <div className="w-8 h-8 rounded-full bg-surface-tint flex items-center justify-center shrink-0">
                          <Phone size={14} className="text-navy" />
                        </div>
                        <span className="truncate">{member.mobile}</span>
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-[14px] text-body-gray hover:text-orange transition-colors">
                        <div className="w-8 h-8 rounded-full bg-surface-tint flex items-center justify-center shrink-0">
                          <Mail size={14} className="text-navy" />
                        </div>
                        <span className="truncate">{member.email}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
};

export default AntiragginCommitte;

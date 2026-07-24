"use client"

import React, { useState, useRef } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { 
  Theater, Music, Palette, Users, BookOpen, 
  Quote, Target, Binoculars, CheckCircle2, 
  ChevronLeft, ChevronRight 
} from "lucide-react"

const TAB_ICONS: Record<string, any> = {
  "Ranga Chathanya": Theater,
  "Raaga Chaitanya": Music,
  "Fine Arts": Palette,
  "Rotaract Club": Users,
  "Leadership Cell": BookOpen,
}

const CulturalLeadershipActivities = ({ data }: any) => {
  const [activeTab, setActiveTab] = useState(0)
  const sections = data.Sections
  const scrollRef = useRef<HTMLDivElement>(null)

  if (!sections || sections.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -300 : 300
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  const currentSection = sections[activeTab]

  return (
    <div className="mb-24 relative font-sans">
      <SectionHeading title={data.title.replace(/_/g, " ")} className="mb-10" />

      {/* Pill Tabs */}
      <div className="flex overflow-x-auto gap-4 mb-12 pb-4 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {sections.map((section: any, idx: number) => {
          const Icon = TAB_ICONS[section.TabName] || Theater;
          const isActive = activeTab === idx;
          
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2.5 whitespace-nowrap flex-shrink-0 cursor-pointer px-6 py-3 rounded-[14px] font-bold transition-all duration-300 border border-gray-200 ${
                isActive 
                  ? "bg-[#1a3668] text-white shadow-[0_8px_20px_rgba(26,54,104,0.2)] border-[#1a3668]" 
                  : "bg-white text-gray-500 hover:border-[#F6872A]/50 hover:text-[#1a3668] shadow-sm"
              }`}
            >
              <Icon size={18} className={isActive ? "text-[#F6872A]" : "text-gray-400"} />
              {section.TabName}
            </button>
          )
        })}
      </div>

      <Reveal key={activeTab} className="space-y-10">
        
        {/* Vision & Mission Cards */}
        {currentSection.VisionMission?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentSection.VisionMission.map((vm: any, idx: number) => {
              const isVision = vm.title.toLowerCase().includes("vision");
              const Icon = isVision ? Binoculars : Target;
              const borderColor = isVision ? "border-[#F6872A]" : "border-[#1a3668]";
              const iconColor = isVision ? "text-[#F6872A]" : "text-[#1a3668]";
              const iconBg = isVision ? "bg-[#FFF8F3] border-orange-100" : "bg-blue-50 border-blue-100";

              return (
                <div key={idx} className={`bg-white rounded-[24px] p-8 lg:p-10 border-l-[6px] ${borderColor} border-y border-r border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden flex items-start gap-6 group hover:-translate-y-1 transition-transform duration-300`}>
                  {/* Big Quote background */}
                  <div className="absolute top-4 right-8 text-gray-50 opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                     <Quote size={120} fill="currentColor" />
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-[16px] ${iconBg} flex items-center justify-center shrink-0 border z-10 shadow-sm`}>
                     <Icon size={32} className={iconColor} strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 pt-2">
                     <h3 className="text-[22px] font-extrabold text-[#1a3668] mb-3 tracking-tight">{vm.title}</h3>
                     <p className="text-gray-500 font-medium text-[15px] leading-[1.8]">{vm.description}</p>
                     
                     {vm.points?.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {vm.points.map((p: any, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 size={16} className={`shrink-0 mt-1 ${iconColor}`} />
                              <span className="text-gray-500 text-[14.5px] leading-relaxed">{p.text}</span>
                            </li>
                          ))}
                        </ul>
                     )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Objectives Section with Generated Image */}
        {currentSection.OtherSections?.length > 0 && (
          <div className="bg-[#FAFAFA] rounded-[32px] p-8 lg:p-12 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden">
             
             {/* Faint background dots */}
             <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
               <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
                 <pattern id="dots-obj" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                   <circle cx="2" cy="2" r="1.5" fill="#1a3668" />
                 </pattern>
                 <rect width="150" height="150" fill="url(#dots-obj)" />
               </svg>
             </div>

             <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 relative z-10">
               
               {/* Objectives List (Split into columns if large) */}
               {currentSection.OtherSections.map((sec: any, idx: number) => {
                 const mid = Math.ceil(sec.ListPoints.length / 2);
                 const firstHalf = sec.ListPoints.slice(0, mid);
                 const secondHalf = sec.ListPoints.slice(mid);
                 
                 return (
                   <React.Fragment key={idx}>
                     {/* Column 1 */}
                     <div className="lg:w-2/5">
                        <h3 className="text-[24px] font-extrabold text-[#1a3668] mb-6 tracking-tight">{sec.title}</h3>
                        <div className="space-y-4">
                          {firstHalf.map((p: any, i: number) => (
                            <div key={i} className="flex items-start gap-3 group">
                               <CheckCircle2 size={20} className="text-[#F6872A] shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                               <span className="text-[14px] text-gray-600 font-medium leading-[1.6] group-hover:text-gray-900 transition-colors">{p.text}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                     {/* Column 2 */}
                     <div className="lg:w-1/4 lg:pt-[60px]">
                        <div className="space-y-4">
                          {secondHalf.map((p: any, i: number) => (
                            <div key={i} className="flex items-start gap-3 group">
                               <CheckCircle2 size={20} className="text-[#F6872A] shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                               <span className="text-[14px] text-gray-600 font-medium leading-[1.6] group-hover:text-gray-900 transition-colors">{p.text}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   </React.Fragment>
                 )
               })}

               {/* Column 3 - Theatre Masks Illustration */}
               <div className="lg:w-[35%] flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
                  <div className="relative">
                    <img 
                      src="/images/theatre_masks.png" 
                      alt="Theatre Masks Illustration" 
                      className="w-full max-w-[280px] object-contain drop-shadow-[0_20px_40px_rgba(246,135,42,0.15)] hover:scale-105 transition-transform duration-500" 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
               </div>
             </div>
          </div>
        )}

        {/* Gallery */}
        {currentSection.images?.length > 0 && (
          <div className="pt-6 relative">
            <h3 className="text-[24px] font-extrabold text-[#1a3668] mb-6 tracking-tight">Gallery</h3>
            
            <div className="relative group">
              {/* Left Arrow */}
              <button 
                onClick={() => scroll('left')}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-100 text-[#F6872A] shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-[#F6872A] hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
              >
                <ChevronLeft size={24} />
              </button>

              <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-5 pb-6 no-scrollbar snap-x scroll-smooth" 
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {currentSection.images.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`gallery-${idx}`}
                    className="w-[280px] h-[190px] object-cover flex-shrink-0 snap-start rounded-[20px] border border-gray-100 shadow-sm transition-transform duration-500 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={() => scroll('right')}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-100 text-[#F6872A] shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-[#F6872A] hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {currentSection.Table_Section && (
          <div className="mt-12">
            <div className="relative overflow-hidden rounded-[24px] border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.04)] bg-white">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#1a3668] text-white">
                    <th className="py-5 px-8 font-extrabold text-[12px] tracking-[0.1em] uppercase w-28">SL.NO</th>
                    <th className="py-5 px-8 font-extrabold text-[12px] tracking-[0.1em] uppercase">FACULTY</th>
                    <th className="py-5 px-8 font-extrabold text-[12px] tracking-[0.1em] uppercase">ROLE</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSection.Table_Section.Rows.map((row: any, index: number) => (
                    <tr key={index} className="group border-b border-gray-50 last:border-b-0 hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-5 px-8 text-[14px] font-semibold text-gray-400 group-hover:text-[#F6872A] transition-colors">
                        {String(row.Slno).padStart(2, '0')}
                      </td>
                      <td className="py-5 px-8 text-[15px] font-extrabold text-[#1a3668] group-hover:text-[#F6872A] transition-colors">
                        {row.name}
                      </td>
                      <td className="py-5 px-8">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF8F3] border border-orange-100/50 text-[#F6872A] font-bold text-[12px]">
                          {row.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Table Watermark */}
              <div className="absolute bottom-[-20px] right-4 opacity-[0.03] pointer-events-none text-[#1a3668]">
                <Users size={180} />
              </div>
            </div>
          </div>
        )}

      </Reveal>
    </div>
  )
}

export default CulturalLeadershipActivities

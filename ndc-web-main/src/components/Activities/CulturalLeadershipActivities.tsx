"use client"

import React, { useState, useRef } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import {
  Theater, Music, Palette, Users, Crown, Settings,
  Quote, Target, Binoculars, CheckCircle2, Check,
  User, Calendar, ChevronLeft, ChevronRight
} from "lucide-react"

const TAB_ICONS: Record<string, any> = {
  "Ranga Chaithanya": Theater,
  "Raaga Chaithanya": Music,
  "Fine Arts": Palette,
  "Rotaract club": Settings,
  "Leadership Cell": Crown,
}

type ColumnTheme = "orange" | "navy"

const COLUMN_THEME: Record<ColumnTheme, { ring: string; bg: string; text: string }> = {
  orange: { ring: "border-orange/25", bg: "bg-orange/10", text: "text-orange" },
  navy: { ring: "border-navy/20", bg: "bg-navy/10", text: "text-navy" },
}

const getColumnMeta = (title: string) => {
  const t = title.toLowerCase()
  if (t.includes("objective")) return { Icon: Target, theme: "orange" as ColumnTheme }
  if (t.includes("activit")) return { Icon: Palette, theme: "orange" as ColumnTheme }
  if (t.includes("faculty")) return { Icon: User, theme: "orange" as ColumnTheme }
  if (t.includes("student") || t.includes("coordinat")) return { Icon: Users, theme: "navy" as ColumnTheme }
  if (t.includes("leadership")) return { Icon: Crown, theme: "orange" as ColumnTheme }
  return { Icon: CheckCircle2, theme: "orange" as ColumnTheme }
}

const DATE_RE = /\b\d{1,2}(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{4}\b/i
const isDatedNote = (text: string) => DATE_RE.test(text)

const chunk = <T,>(items: T[], size: number): T[][] => {
  if (!items.length) return []
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
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

  const columns = (currentSection.OtherSections || []).flatMap((sec: any) => {
    const { Icon, theme } = getColumnMeta(sec.title)
    const parts = chunk(sec.ListPoints || [], 4)
    return parts.map((points, i) => ({
      key: `${sec.title}-${i}`,
      title: i === 0 ? sec.title : null,
      Icon,
      theme,
      points,
    }))
  })

  return (
    <div className="relative mb-24 rounded-[32px] border border-card-border bg-white shadow-[0_20px_60px_rgba(14,36,85,0.05)] p-6 sm:p-10 lg:p-14 overflow-hidden font-sans">
      {/* Decorative dot grid, top-right */}
      <div className="absolute top-6 right-8 opacity-50 pointer-events-none hidden md:block">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <pattern id="cla-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#cbd5e1" />
          </pattern>
          <rect width="90" height="90" fill="url(#cla-dots)" />
        </svg>
      </div>

      {/* Eyebrow */}
      <div className="relative z-10 flex items-center gap-2.5 mb-4">
        <Users size={18} className="text-orange" />
        <span className="text-[13px] font-bold uppercase tracking-[2px] text-orange">Club Activities</span>
        <span className="h-px w-8 bg-orange/40" />
      </div>

      {/* Title */}
      <h2 className="relative z-10 text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.1] tracking-tight mb-3">
        {data.title}
      </h2>
      <span className="relative z-10 block h-[4px] w-14 bg-orange rounded-full mb-10" />

      {/* Pill Tabs */}
      <div className="relative z-10 flex overflow-x-auto gap-4 mb-2 pb-4 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {sections.map((section: any, idx: number) => {
          const Icon = TAB_ICONS[section.TabName] || Theater;
          const isActive = activeTab === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2.5 whitespace-nowrap flex-shrink-0 cursor-pointer px-6 py-3 rounded-[14px] font-bold transition-all duration-300 border border-card-border ${
                isActive
                  ? "bg-navy text-white shadow-[0_8px_20px_rgba(14,36,85,0.2)] border-navy"
                  : "bg-white text-gray-500 hover:border-orange/50 hover:text-navy shadow-sm"
              }`}
            >
              <Icon size={18} className={isActive ? "text-orange" : "text-gray-400"} />
              {section.TabName}
            </button>
          )
        })}
      </div>

      <Reveal key={activeTab} className="relative z-10 space-y-10">

        {/* Vision & Mission Cards */}
        {currentSection.VisionMission?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {currentSection.VisionMission.map((vm: any, idx: number) => {
              const isVision = vm.title.toLowerCase().includes("vision");
              const Icon = isVision ? Binoculars : Target;
              const borderColor = isVision ? "border-orange" : "border-navy";
              const iconColor = isVision ? "text-orange" : "text-navy";
              const iconBg = isVision ? "bg-chip-bg border-orange-100" : "bg-navy/5 border-navy/10";

              return (
                <div key={idx} className={`bg-white rounded-[24px] p-8 lg:p-10 border-l-[6px] ${borderColor} border-y border-r border-card-border shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden flex items-start gap-6 group hover:-translate-y-1 transition-transform duration-300`}>
                  <div className="absolute top-4 right-8 text-gray-50 opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                     <Quote size={120} fill="currentColor" />
                  </div>

                  <div className={`w-16 h-16 rounded-[16px] ${iconBg} flex items-center justify-center shrink-0 border z-10 shadow-sm`}>
                     <Icon size={32} className={iconColor} strokeWidth={1.5} />
                  </div>

                  <div className="relative z-10 pt-2">
                     <h3 className="text-[22px] font-extrabold text-navy mb-3 tracking-tight">{vm.title}</h3>
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

        {/* Objectives / Activities / Coordinators panel */}
        {columns.length > 0 && (
          <div className="relative mt-6">
            {/* Gradient top border + connector notch */}
            <div className="absolute -top-[3px] left-6 right-6 h-[3px] rounded-full bg-gradient-to-r from-orange to-[#3270fc] z-10" />
            <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-navy rotate-45 rounded-[3px] z-20" />

            <div className="relative bg-[#FAFBFD] rounded-[28px] border border-card-border shadow-[0_20px_50px_rgba(14,36,85,0.05)] p-8 md:p-10 lg:p-12 overflow-hidden">
              {/* Faint background dots */}
              <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
                <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="dots-obj" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#0e2455" />
                  </pattern>
                  <rect width="150" height="150" fill="url(#dots-obj)" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-wrap gap-x-10 gap-y-10">
                {columns.map((col: any, colIdx: number) => {
                  const theme = COLUMN_THEME[col.theme as ColumnTheme]
                  const Icon = col.Icon
                  return (
                    <div
                      key={col.key}
                      className={`flex-1 min-w-[180px] ${colIdx !== 0 ? "sm:border-l sm:border-card-border sm:pl-8" : ""}`}
                    >
                      <div className="relative w-14 h-14 mb-5">
                        <span className={`absolute inset-0 rounded-full border border-dashed ${theme.ring}`} />
                        <span className={`absolute inset-[6px] rounded-full ${theme.bg} flex items-center justify-center ${theme.text}`}>
                          <Icon size={22} strokeWidth={1.75} />
                        </span>
                      </div>

                      {col.title && (
                        <>
                          <h3 className="text-[16px] font-extrabold text-navy leading-snug mb-2">{col.title}</h3>
                          <span className="block h-[3px] w-8 bg-orange rounded-full mb-4" />
                        </>
                      )}

                      <div className="space-y-3">
                        {col.points.map((p: any, i: number) =>
                          isDatedNote(p.text) ? (
                            <div key={i} className="flex items-start gap-2.5 bg-chip-bg border border-orange-100/70 rounded-xl px-3.5 py-3">
                              <Calendar size={15} className="text-orange shrink-0 mt-0.5" />
                              <span className="text-[13px] text-navy font-medium leading-relaxed">{p.text}</span>
                            </div>
                          ) : (
                            <div key={i} className="flex items-start gap-2.5">
                              <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-orange/15 text-orange shrink-0 mt-0.5">
                                <Check size={11} strokeWidth={3} />
                              </span>
                              <span className="text-[14px] text-gray-600 leading-relaxed">{p.text}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Gallery */}
        {currentSection.images?.length > 0 && (
          <div className="pt-6 relative">
            <h3 className="text-[24px] font-extrabold text-navy mb-6 tracking-tight">Gallery</h3>

            <div className="relative group">
              <button
                onClick={() => scroll('left')}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-card-border text-orange shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-orange hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
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
                    className="w-[280px] h-[190px] object-cover flex-shrink-0 snap-start rounded-[20px] border border-card-border shadow-sm transition-transform duration-500 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                  />
                ))}
              </div>

              <button
                onClick={() => scroll('right')}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-card-border text-orange shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-orange hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {currentSection.Table_Section && (
          <div className="mt-12">
            <div className="relative overflow-hidden rounded-[24px] border border-card-border shadow-[0_12px_40px_rgba(0,0,0,0.04)] bg-white">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="py-5 px-8 font-extrabold text-[12px] tracking-[0.1em] uppercase w-28">SL.NO</th>
                    <th className="py-5 px-8 font-extrabold text-[12px] tracking-[0.1em] uppercase">FACULTY</th>
                    <th className="py-5 px-8 font-extrabold text-[12px] tracking-[0.1em] uppercase">ROLE</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSection.Table_Section.Rows.map((row: any, index: number) => (
                    <tr key={index} className="group border-b border-card-border last:border-b-0 hover:bg-surface-tint transition-colors">
                      <td className="py-5 px-8 text-[14px] font-semibold text-gray-400 group-hover:text-orange transition-colors">
                        {String(row.Slno).padStart(2, '0')}
                      </td>
                      <td className="py-5 px-8 text-[15px] font-extrabold text-navy group-hover:text-orange transition-colors">
                        {row.name}
                      </td>
                      <td className="py-5 px-8">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-chip-bg border border-orange-100/50 text-orange font-bold text-[12px]">
                          {row.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="absolute bottom-[-20px] right-4 opacity-[0.03] pointer-events-none text-navy">
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

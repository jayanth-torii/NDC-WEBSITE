"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const programmeOptions: Record<string, string[]> = {
  ug: ["B.Com", "B.Com-BDA", "BBA", "BCA", "B.Science"],
  pg: ["MBA", "MCA", "M.Com"],
};

const Programme = ({ data }: any) => {
  const { title, description, image } = data;
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && ["ug_programme", "pg_programme"].includes(hash)) {
      setSelectedTab(hash.split("_")[0]);
    } else {
      setSelectedTab("ug");
    }
  }, []);

  useEffect(() => {
    if (selectedTab && window.location.hash !== `#${selectedTab}_programme`) {
      window.location.hash = `${selectedTab}_programme`;
    }
  }, [selectedTab]);

  const handleProgrammeClick = (programme: string) => {
    router.push(`/department?programme=${encodeURIComponent(programme)}`);
  };

  const programmes = programmeOptions[selectedTab ?? "ug"] ?? [];

  return (
    <section className="relative border-b border-navy/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">
        {/* Index rail */}
        <div className="lg:col-span-4 xl:col-span-3 bg-navy text-white relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 40%, #f6872a 100%)",
            }}
          />
          <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10 lg:p-12">
            <div>
              <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-5">
                Academics · Index
              </p>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-balance">
                {title}
              </h2>
              <p className="mt-5 text-white/70 text-[15px] leading-relaxed max-w-sm">
                {description}
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-1">
              {(["ug", "pg"] as const).map((tab, i) => {
                const active = selectedTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedTab(tab)}
                    className={`group flex items-center gap-4 text-left py-4 border-t border-white/15 transition-colors duration-300 ${
                      active ? "text-white" : "text-white/45 hover:text-white/80"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-bold tracking-[0.2em] tabular-nums ${
                        active ? "text-orange" : "text-white/30"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className="text-lg font-semibold tracking-tight flex-1">
                      {tab.toUpperCase()} Programmes
                    </span>
                    <span
                      className={`h-px flex-shrink-0 transition-all duration-500 ease-[var(--ease-editorial)] ${
                        active ? "w-10 bg-orange" : "w-0 bg-transparent group-hover:w-6 group-hover:bg-white/40"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Image + list */}
        <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-1 xl:grid-cols-2">
          <div className="relative min-h-[280px] xl:min-h-full order-2 xl:order-1 overflow-hidden group">
            <img
              src={image}
              alt="Nagarjuna Group of Institutions"
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-[var(--ease-editorial)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="text-orange text-[11px] font-bold tracking-[0.22em] uppercase mb-2">
                Explore
              </p>
              <p className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">
                {selectedTab?.toUpperCase()} Programmes
              </p>
            </div>
          </div>

          <div className="order-1 xl:order-2 bg-white flex flex-col justify-center px-6 py-10 md:px-10 lg:px-12">
            <div className="flex items-end justify-between gap-4 mb-8 pb-4 border-b border-navy/10">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-body-gray">
                Select a programme
              </p>
              <p className="text-orange font-bold tabular-nums text-sm">
                {String(programmes.length).padStart(2, "0")}
              </p>
            </div>

            <RevealGroup key={selectedTab || "ug"} className="flex flex-col">
              {programmes.map((programme: string, idx: number) => (
                <RevealItem key={programme}>
                  <button
                    type="button"
                    onClick={() => handleProgrammeClick(programme)}
                    className="group w-full flex items-center gap-5 py-5 border-b border-navy/8 text-left transition-colors duration-300 hover:bg-surface-light/80 -mx-2 px-2"
                  >
                    <span className="text-[12px] font-bold tracking-[0.18em] text-orange/80 tabular-nums w-8">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-xl md:text-2xl font-bold text-navy tracking-tight group-hover:text-orange transition-colors duration-300">
                      {programme}
                    </span>
                    <span className="w-10 h-10 flex items-center justify-center border border-navy/15 text-navy group-hover:bg-orange group-hover:border-orange group-hover:text-white transition-all duration-300">
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </button>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programme;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, GraduationCap, ScrollText } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const programmeOptions: Record<string, string[]> = {
  ug: ["B.Com", "B.Com-BDA", "BBA", "BCA"],
  pg: ["MBA", "MCA"],
};

const tabLabels: Record<string, string> = {
  ug: "Undergraduate",
  pg: "Postgraduate",
};

const tabIcons: Record<string, React.ReactNode> = {
  ug: <GraduationCap size={18} />,
  pg: <ScrollText size={18} />,
};

const Programme = ({ data }: any) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>("ug");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && ["ug_programme", "pg_programme"].includes(hash)) {
      setSelectedTab(hash.split("_")[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedTab && window.location.hash !== `#${selectedTab}_programme`) {
      window.location.hash = `${selectedTab}_programme`;
    }
    setSearchQuery(""); // Reset search on tab change
  }, [selectedTab]);

  const handleProgrammeClick = (programme: string) => {
    router.push(`/department?programme=${encodeURIComponent(programme)}`);
  };

  const programmes = programmeOptions[selectedTab] ?? [];
  const filteredProgrammes = programmes.filter((p) =>
    p.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-8 md:py-10 bg-[#f8fafc] relative">
      <div className="container mx-auto px-4 md:px-6 max-w-[1300px]">
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4 px-2">
              Browse By Level
            </h3>
            <div className="flex flex-col gap-2">
              {(["ug", "pg"] as const).map((tab) => {
                const active = selectedTab === tab;
                const count = programmeOptions[tab]?.length || 0;
                
                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`flex items-center gap-4 text-left p-3 md:p-4 rounded-xl transition-all duration-300 ${
                      active 
                        ? "bg-navy text-white shadow-md" 
                        : "bg-transparent text-navy hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      active ? "bg-white/10 text-[#f6872a]" : "bg-gray-50 text-navy border border-gray-100"
                    }`}>
                      {tabIcons[tab]}
                    </div>
                    <div>
                      <h4 className={`text-[15px] font-bold ${active ? "text-white" : "text-navy"}`}>
                        {tabLabels[tab]}
                      </h4>
                      <p className={`text-[12px] font-medium mt-0.5 ${active ? "text-white/70" : "text-gray-500"}`}>
                        {count} programmes
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Header & Search */}
            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white">
              <div>
                <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-1">
                  {tabLabels[selectedTab]} Programmes
                </h2>
                <p className="text-[14px] text-gray-500 font-medium">
                  Showing <span className="text-[#f6872a] font-bold">{filteredProgrammes.length}</span> of <span className="text-[#f6872a] font-bold">{programmes.length}</span> programmes
                </p>
              </div>

              <div className="w-full md:w-[280px] relative">
                <input
                  type="text"
                  placeholder="Search programmes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-[14px] text-navy placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f6872a]/50 focus:border-[#f6872a]/50 transition-all"
                />
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Programmes List */}
            <div className="p-4 md:p-6 bg-[#fafbfc]">
              <RevealGroup key={selectedTab} className="flex flex-col gap-3">
                {filteredProgrammes.length > 0 ? (
                  filteredProgrammes.map((programme: string, idx: number) => (
                    <RevealItem key={programme}>
                      <div className="w-full bg-white border border-gray-100 hover:shadow-md rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
                        
                        <div className="flex items-center gap-4 md:gap-5">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center flex-shrink-0">
                            <span className="text-[13px] font-bold text-[#3b82f6]">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-1.5">
                            <h3 className="text-[16px] md:text-[17px] font-bold text-navy">
                              {programme}
                            </h3>
                            <div className="inline-flex">
                              <span className="bg-gray-100 text-gray-500 text-[10px] md:text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                                {programme.split('-')[0].trim()} • {selectedTab.toUpperCase()} PROGRAMME
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleProgrammeClick(programme)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white text-[13px] md:text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors"
                        >
                          Explore
                          <ArrowRight size={16} />
                        </button>

                      </div>
                    </RevealItem>
                  ))
                ) : (
                  <div className="py-16 text-center bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500 text-[15px]">No programmes found matching "{searchQuery}".</p>
                  </div>
                )}
              </RevealGroup>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default Programme;

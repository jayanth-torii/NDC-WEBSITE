"use client";
import React, { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { 
  Shield, Gavel, Scale, FileText, MessageSquare, 
  Users, UserX, Megaphone, Handshake, CircleDollarSign, 
  Hand, AlertCircle, Users2
} from "lucide-react";

interface Tab {
  title: string;
  description: string;
  points: string[];
}

interface PoliciesProps {
  data: {
    title: string;
    description?: string[];
    tabsSection: Tab[];
  };
}

// Helper to get tab icon based on title
const getTabIcon = (title: string, isActive: boolean) => {
  const t = title.toLowerCase();
  const iconProps = { size: 18, className: isActive ? "text-white" : "text-gray-500" };
  
  if (t.includes("punishment")) return <Gavel {...iconProps} />;
  if (t.includes("power") || t.includes("function")) return <Scale {...iconProps} />;
  return <Shield {...iconProps} />;
};

// Helper to get point icon based on index
const getPointIcon = (index: number) => {
  const icons = [
    MessageSquare, Users, UserX, Megaphone, 
    Handshake, CircleDollarSign, Hand, AlertCircle, Users2
  ];
  const IconComponent = icons[index % icons.length];
  return <IconComponent size={24} className="text-[#1a3668]" />;
};

const Policies: React.FC<PoliciesProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = data?.tabsSection || [];
  const activeTab = tabs[selectedIndex];

  if (!data) return null;

  return (
    <div className="mb-10 md:mb-20 pt-8">
      
      {/* Main Title */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-16 h-16 rounded-full bg-[#1a3668] flex items-center justify-center text-white shadow-lg shrink-0 border-4 border-white ring-1 ring-gray-100">
          <Shield size={28} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3668] tracking-tight">
          {data?.title}
        </h2>
      </div>

      {/* Intro Description */}
      {data?.description?.length > 0 && (
        <div className="bg-[#f8fafc] p-6 md:p-8 rounded-[16px] border border-gray-200 mb-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="flex-1 relative z-10">
            {data.description.map((desc, idx) => (
              <p key={idx} className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed font-medium">
                {desc}
              </p>
            ))}
          </div>
          <div className="shrink-0 relative z-10 opacity-20">
            <Gavel size={100} strokeWidth={1} />
          </div>
        </div>
      )}

      {/* Pill Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((tab, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <button
              key={tab.title}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold text-[14px] transition-all duration-300 border-2 ${
                isActive
                  ? "bg-[#1a3668] text-white border-[#1a3668] shadow-md"
                  : "bg-[#f8fafc] text-gray-600 border-transparent hover:border-gray-200 hover:bg-white"
              }`}
            >
              {getTabIcon(tab.title, isActive)}
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* Active Content Area */}
      <Reveal key={activeTab?.title}>
        <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          {/* Orange Alert Banner */}
          {activeTab?.description && (
            <div className="mb-8 p-5 bg-[#FFF8F3] rounded-[16px] border border-orange/20 flex items-start gap-4">
               <div className="w-12 h-12 rounded-xl bg-[#F6872A] flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                 <FileText size={24} />
               </div>
               <p className="text-[15px] text-[#1a3668] leading-relaxed font-bold pt-1">
                 {activeTab.description}
               </p>
            </div>
          )}

          {/* Grid of Points */}
          {activeTab?.points?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeTab.points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-4 md:px-6 md:py-5 rounded-[12px] border border-gray-100 hover:border-[#F6872A]/30 hover:shadow-md transition-all duration-300">
                  {/* Icon & Number Column */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-10 h-10 rounded-full border border-gray-200 border-dashed flex items-center justify-center">
                      <div className="scale-90 opacity-80">{getPointIcon(idx)}</div>
                    </div>
                    <span className="text-[#1a3668] font-black text-xl w-6">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Text Column */}
                  <div className="flex-1 pl-4 border-l border-gray-100">
                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                      {point}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
};

export default Policies;

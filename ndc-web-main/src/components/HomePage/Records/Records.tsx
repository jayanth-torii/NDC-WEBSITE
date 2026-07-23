"use client";

import { Reveal } from '@/components/ui/Reveal';
import "./Records.css"; // Keep for any legacy classes

export default function Stats({ data }: { data: any[] }) {
  if (!data || data?.length === 0) return null;

  return (
    <Reveal className="w-full relative z-30 flex justify-center -mt-14 md:-mt-20 px-4 lg:px-8">
      <div className="max-w-[1300px] w-full bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_10px_40px_rgba(14,36,85,0.06)] rounded-[24px] overflow-hidden">
        
        {/* Desktop Grid (Static Row) */}
        <div className="hidden md:grid grid-cols-5 items-stretch py-8 px-4">
          {data?.map((record, index) => (
            <div key={index} className="relative group flex flex-col items-center justify-center px-4">
              
              {/* Divider (excluding first item) */}
              {index !== 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-[60%] bg-gradient-to-b from-transparent via-card-border to-transparent" aria-hidden="true" />
              )}

              <div className="w-16 h-16 rounded-full bg-[#FFF5EE] flex items-center justify-center mb-5 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:-translate-y-1 shadow-sm border border-orange/10">
                {/* Assuming the image provides a green icon, otherwise fallback */}
                <img src={record?.icon} alt="" aria-hidden="true" className="w-7 h-7 object-contain drop-shadow-sm" />
              </div>

              <div className="text-[32px] lg:text-[40px] font-black text-[#1C2344] mb-2 tracking-tight tabular-nums leading-none">
                {record?.count}
              </div>

              <div className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[2px] text-center">
                {record?.title}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden grid grid-cols-2 gap-y-8 py-8">
          {data?.map((record, index) => (
            <div key={index} className="flex flex-col items-center justify-center px-2">
              <div className="w-14 h-14 rounded-full bg-[#FFF5EE] flex items-center justify-center mb-4 border border-orange/10">
                <img src={record?.icon} alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
              </div>

              <div className="text-[28px] font-black text-[#1C2344] mb-1.5 tracking-tight tabular-nums leading-none">
                {record?.count}
              </div>

              <div className="text-[10px] font-extrabold text-gray-500 uppercase tracking-[1.5px] text-center">
                {record?.title}
              </div>
            </div>
          ))}
        </div>

      </div>
    </Reveal>
  );
}

"use client";

import { Reveal } from '@/components/ui/Reveal';
import CountUp from 'react-countup';

export default function Stats({ data }: { data: any[] }) {
  if (!data || data?.length === 0) return null;

  return (
    <section className="bg-white py-[46px] border-b border-[#eef1f6]" aria-label="NDC at a glance">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[16px] md:gap-y-[28px] lg:gap-y-[16px]">
            {data.map((stat, index) => {
              const numericPart = parseInt(stat.count.replace(/,/g, '').match(/\d+/)?.[0] || "0", 10);
              const suffix = stat.count.replace(/[0-9,]/g, '');

              return (
                <div 
                  key={index} 
                  className={`text-center p-[6px] border-[#eef1f6]
                    ${index % 2 !== 0 ? 'max-md:border-l' : 'max-md:border-l-0'}
                    ${index % 3 !== 0 ? 'md:max-lg:border-l' : 'md:max-lg:border-l-0'}
                    ${index % 6 !== 0 ? 'lg:border-l' : 'lg:border-l-0'}
                  `}
                >
                  <span className="block text-[#0e2455] text-[32px] font-extrabold leading-none tracking-[-1px]">
                    <CountUp end={numericPart} duration={2.5} separator="" enableScrollSpy scrollSpyOnce />
                    {suffix}
                  </span>
                  <span className="block text-[#777777] text-[13px] font-semibold mt-[8px]">
                    {stat.title}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

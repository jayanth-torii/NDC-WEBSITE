import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import Kicker from '@/components/ui/Kicker';

const ActivitiesBanner = ({ data }: any) => {
  if (!data) return null;
  const { title, image } = data;

  return (
    <Reveal>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[28px] bg-navy shadow-[var(--shadow-navy)] min-h-[280px] lg:min-h-[360px]">
        <div className="relative z-10 flex flex-col justify-center px-8 py-12 md:px-12 order-2 lg:order-1">
          <div className="absolute inset-0 bg-dot-grid-light opacity-[0.06] pointer-events-none" aria-hidden="true" />
          <Kicker className="relative mb-4">Extracurriculars</Kicker>
          <h1 className="relative text-white font-extrabold text-[32px] sm:text-[42px] lg:text-[3rem] leading-[1.08] tracking-[-1px]">
            <span className="text-orange">{title?.trim()}</span>
          </h1>
        </div>

        <div className="relative order-1 lg:order-2 aspect-[16/9] lg:aspect-auto min-h-[200px] bg-navy-dark flex items-center justify-center p-4">
          {image && (
            <img
              src={image}
              alt={title || "Activities"}
              className="relative z-[1] max-w-full max-h-full object-contain"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-transparent lg:w-1/5 pointer-events-none" />
        </div>
      </div>
    </Reveal>
  );
};

export default ActivitiesBanner;

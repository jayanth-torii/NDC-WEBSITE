"use client";
import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export default function CulturalActivities({ data }: any) {
  const newsletterData = data;

  return (
    <Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-6 mb-20 rounded-[18px] border border-card-border shadow-[var(--shadow-card)] overflow-hidden">
        <div className="space-y-4 bg-surface-tint p-6 md:p-8 flex flex-col justify-center h-74 md:h-80">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.5px]">{newsletterData?.title}</h2>
          <p className="text-justify text-body-gray leading-relaxed mb-5">{newsletterData?.description}</p>
        </div>
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={newsletterData?.image}
            alt="Newsletter Event"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </Reveal>
  );
}

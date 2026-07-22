'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SectionHeading from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

const ACCENTS = [
  { ring: 'group-hover:border-navy/40', chip: 'bg-surface-tint', arrow: 'text-navy' },
  { ring: 'group-hover:border-orange/50', chip: 'bg-chip-bg', arrow: 'text-orange' },
  { ring: 'group-hover:border-blue-accent/40', chip: 'bg-surface-tint', arrow: 'text-blue-accent' },
];

const LoginPortals = ({ portals }: any) => {
  const router = useRouter();

  return (
    <div>
      <SectionHeading eyebrow="Quick Access" title="Login Portals" align="center" className="mb-10" />

      <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portals.map((program: any, index: number) => {
          const accent = ACCENTS[index % ACCENTS.length];
          return (
            <RevealItem key={index}>
              <button
                type="button"
                onClick={() => router.push(program.url)}
                className={`group flex w-full cursor-pointer items-center gap-4 rounded-[18px] border border-card-border bg-white p-5 text-left shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] ${accent.ring}`}
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] ${accent.chip}`}>
                  <Image src={program.image} alt="" width={30} height={30} className="object-contain" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold text-navy">{program.title}</span>
                  <span className="block text-sm text-body-gray">Login to continue</span>
                </span>
                <ArrowUpRight
                  size={20}
                  className={`shrink-0 transition-transform duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${accent.arrow}`}
                />
              </button>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
};

export default LoginPortals;

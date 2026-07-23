"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

function HODSMessage({ data }: { data: any }) {
  if (!data) return null;
  const messageData = data;
  const hods = messageData?.Hods || [];
  const [activeTab, setActiveTab] = useState(0);

  if (hods.length === 0) return null;

  const selectedMessage = hods[activeTab];

  return (
    <Reveal as="section" className="relative border-b border-navy/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        <aside className="lg:col-span-3 xl:col-span-3 bg-navy text-white p-8 md:p-10 flex flex-col">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-4">
            Leadership
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.03em] leading-tight mb-10 text-balance">
            {messageData?.title}
          </h2>

          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 mt-auto">
            {hods.map((hod: any, index: number) => {
              const active = activeTab === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`shrink-0 text-left px-4 py-3.5 border-l-2 transition-all duration-300 ${
                    active
                      ? "border-orange bg-white/5 text-white"
                      : "border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="block text-[11px] font-bold tracking-[0.18em] text-orange/80 mb-1 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold text-sm md:text-base">
                    {hod.TabName}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="lg:col-span-9 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 h-full">
            <div className="md:col-span-5 relative min-h-[320px] md:min-h-full overflow-hidden bg-surface-tint">
              {selectedMessage?.image ? (
                <Image
                  src={selectedMessage.image}
                  alt={selectedMessage.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-navy font-semibold">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-white text-xl md:text-2xl font-extrabold tracking-tight">
                  {selectedMessage?.name}
                </p>
                <p className="text-orange text-sm font-bold tracking-wide uppercase mt-1">
                  {selectedMessage?.designation}
                </p>
              </div>
            </div>

            <div className="md:col-span-7 p-8 md:p-10 lg:p-14 flex flex-col justify-center relative">
              <Quote
                size={72}
                className="text-orange/15 absolute top-6 right-8 -scale-x-100"
                aria-hidden
              />
              {selectedMessage?.message && (
                <blockquote className="relative z-10">
                  <p className="text-lg md:text-xl text-body-gray leading-[1.75] italic max-w-prose">
                    &ldquo;{selectedMessage.message}&rdquo;
                  </p>
                  <div className="mt-8 h-px w-16 bg-orange" />
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default HODSMessage;

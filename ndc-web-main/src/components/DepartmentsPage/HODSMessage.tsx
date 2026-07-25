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
    <Reveal as="section" className="relative border-b border-navy/10 bg-[#fafbfc]">
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16">
        
        {/* Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-orange text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
            Leadership
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.02em] leading-tight">
            {messageData?.title}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {hods.map((hod: any, index: number) => {
            const active = activeTab === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  active
                    ? "bg-navy text-white border-navy shadow-md"
                    : "bg-white text-navy border-gray-200 hover:border-orange hover:text-orange shadow-sm"
                }`}
              >
                {hod.TabName}
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div 
          key={activeTab} 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 relative overflow-hidden animate-slide-in opacity-0"
        >
          <Quote
            size={80}
            className="text-orange/10 absolute top-4 right-6 -scale-x-100 pointer-events-none"
            aria-hidden
          />
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start relative z-10">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg relative bg-gray-50">
              {selectedMessage?.image ? (
                <Image
                  src={selectedMessage.image}
                  alt={selectedMessage.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-navy font-semibold text-xs">
                  No Image
                </div>
              )}
            </div>

            {/* Message & Details */}
            <div className="flex-1 text-center md:text-left">
              {selectedMessage?.message && (
                <blockquote className="mb-6">
                  <p className="text-[15px] md:text-base text-body-gray leading-[1.8] italic">
                    &ldquo;{selectedMessage.message}&rdquo;
                  </p>
                </blockquote>
              )}
              
              <div>
                <p className="text-navy text-lg md:text-xl font-extrabold tracking-tight">
                  {selectedMessage?.name}
                </p>
                <p className="text-orange text-xs md:text-sm font-bold tracking-wide uppercase mt-1">
                  {selectedMessage?.designation}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(-15px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </Reveal>
  );
}

export default HODSMessage;

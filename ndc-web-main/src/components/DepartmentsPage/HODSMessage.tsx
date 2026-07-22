"use client";
import React, { useState } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

function HODSMessage({ data }: { data: any }) {
  const messageData = data;
  const hods = messageData?.Hods || [];

  // Set the first tab active by default
  const [activeTab, setActiveTab] = useState(0);

  const selectedMessage = hods[activeTab];

  return (
    <Reveal as="section" className="mb-10 md:mb-20 px-4">
      {/* Title */}
      <SectionHeading title={messageData?.title} className="mb-6" />

      {/* Tabs */}
      <div className="flex flex-col md:flex-row items-start gap-2 md:gap-6 border-b border-card-border mb-8">
        {hods.map((hod: any, index: number) => (
          <button
            key={index}
            className={`relative cursor-pointer text-lg md:text-xl font-semibold px-3 pb-3 transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              activeTab === index ? "text-orange" : "text-navy hover:text-orange"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {hod.TabName}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-orange" />
            )}
          </button>
        ))}
      </div>

      {/* Flex layout: 30% Image + 70% Text */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div className="lg:w-[30%] w-full">
          <Card className="overflow-hidden" accent="orange-left">
            {selectedMessage?.image ? (
              <Image
                src={selectedMessage.image}
                alt={selectedMessage.name}
                width={400}
                height={300}
                className="object-contain w-full h-auto"
              />
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center text-navy font-semibold">
                No Image
              </div>
            )}
          </Card>
        </div>

        {/* Text Section */}
        <div className="lg:w-[70%] w-full">
          <h2 className="text-2xl font-semibold text-navy mb-3">
            {selectedMessage?.name}
          </h2>
          <p className="text-lg md:text-xl font-semibold text-orange">
            {selectedMessage?.designation}
          </p>
          {selectedMessage?.message && (
            <p className="text-justify text-body-gray mt-4 leading-relaxed">
              {selectedMessage.message}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default HODSMessage;

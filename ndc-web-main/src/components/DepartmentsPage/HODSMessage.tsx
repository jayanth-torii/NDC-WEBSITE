"use client";
import React, { useState } from "react";
import Image from "next/image";

function HODSMessage({ data }: { data: any }) {
  const messageData = data;
  const hods = messageData?.Hods || [];

  // Set the first tab active by default
  const [activeTab, setActiveTab] = useState(0);

  const selectedMessage = hods[activeTab];

  return (
    <div className="mb-10 md:mb-20 px-4">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#0A2342] mb-6">
        {messageData?.title}
      </h1>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row items-start gap-4 border-b border-gray-300 mb-6">
        {hods.map((hod: any, index: number) => (
          <button
            key={index}
            className={`text-[#003333] relative cursor-pointer !text-xl !font-semibold px-3 transition duration-200 ${
              activeTab === index ? "text-[#F6872A]" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {hod.TabName}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F6872A]" />
            )}
          </button>
        ))}
      </div>

      {/* Flex layout: 30% Image + 70% Text */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div className="lg:w-[30%] w-full relative">
          <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#FFB300] rounded-lg" />
          <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden">
            {selectedMessage?.image ? (
              <Image
                src={selectedMessage.image}
                alt={selectedMessage.name}
                width={400}
                height={300}
                className="object-contain w-full h-auto rounded-md"
              />
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center text-[#003333] font-semibold">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Text Section */}
        <div className="lg:w-[70%] w-full">
          <h2 className="text-2xl font-semibold text-[#0A2342] mb-3">
            {selectedMessage?.name}
          </h2>
          <p className="text-lg md:text-xl font-semibold text-[#0E2455]">
            {selectedMessage?.designation}
          </p>
          {selectedMessage?.message && (
            <p className="text-justify text-[#0E2455] mt-4 leading-relaxed">
              {selectedMessage.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HODSMessage;

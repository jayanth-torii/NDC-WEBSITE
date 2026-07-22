"use client";
import React from "react";
 
 
import Image from "next/image";
 
 

export default function CulturalActivities({data}:any) {

    const newsletterData = data
 
    return (
        
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 mb-20">
            <div className="space-y-4 bg-[#F6F6F6] p-6 h-74 md:h-80">
                <h2 className="text-2xl md:text-3xl font-bold text-[#003333]">{newsletterData?.title}</h2>
                <p className="text-justify text-[#0E2455] mb-5">{newsletterData?.description}</p>
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
       
    );
}
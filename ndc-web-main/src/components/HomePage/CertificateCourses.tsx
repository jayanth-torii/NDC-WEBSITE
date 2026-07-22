"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";

const CertificateCourses = ({data}:any) => {
  const {title, image, link} = data;

    const router = useRouter();

    return (
      <Reveal className="md:mt-10 flex justify-center items-center w-full mb-10 md:mb-20">
        <div
          onClick={() => router.push(link)}
          className="cursor-pointer overflow-hidden rounded-[18px] border border-card-border bg-white shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-card-border-hover"
        >
          <img
              src={image}
              alt="Education Image"
              className="h-full max-h-[600px] md:max-h-[800px] lg:max-h-[1000px] w-auto"
          />
        </div>
     </Reveal>
    )
}

export default CertificateCourses

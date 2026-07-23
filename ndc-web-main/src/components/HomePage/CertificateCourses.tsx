"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

const CertificateCourses = ({data}:any) => {
  const {title, image, link} = data;
  const router = useRouter();

  return (
    <section className="py-16 md:py-24 bg-surface-light">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <Reveal>
          <div
            onClick={() => router.push(link)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && router.push(link)}
            className="group relative w-full aspect-[21/9] md:aspect-[32/9] cursor-pointer overflow-hidden rounded-[32px] shadow-[var(--shadow-navy)] transition-all duration-500 hover:shadow-[0_28px_70px_rgba(14,36,85,0.32)] bg-navy"
          >
            <img
              src={image}
              alt={title || "Explore Certificate Courses"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
            />

            <span className="absolute bottom-5 right-5 md:bottom-7 md:right-7 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-orange text-white shadow-[var(--shadow-cta)] transition-all duration-300 ease-[var(--ease-editorial)] group-hover:bg-white group-hover:text-navy group-hover:scale-110">
              <ArrowUpRight size={22} />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CertificateCourses

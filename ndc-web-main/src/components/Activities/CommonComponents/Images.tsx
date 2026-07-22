"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

const Images = ({ data }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isUserScrolling) return;

    const autoScroll = () => {
      if (!scrollContainer) return;

      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: scrollContainer.clientWidth / 2, behavior: "smooth" });
      }
    };

    const interval = setInterval(autoScroll, 3000); // Scrolls every 2 seconds

    return () => clearInterval(interval);
  }, [isUserScrolling]);

  const handleScroll = (direction: "left" | "right") => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    setIsUserScrolling(true);
    const scrollDistance = scrollContainer.clientWidth / 2;

    if (direction === "left") {
      scrollContainer.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    } else {
      scrollContainer.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }

    setTimeout(() => setIsUserScrolling(false), 3000); // Resume auto-scroll after 3s
  };

  return (
    <div className="relative mb-10 md:mb-20">
      <SectionHeading title={data.title} className="mb-6" />

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data?.images?.map((image: string, index: number) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 snap-start">
            {/* Responsive, shorter cards on larger screens */}
            <div className="group relative overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] aspect-[4/3] lg:aspect-video">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                priority={index < 2}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => handleScroll("left")}
        aria-label="Scroll left"
        type="button"
        className="hidden md:flex items-center justify-center cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => handleScroll("right")}
        aria-label="Scroll right"
        type="button"
        className="hidden md:flex items-center justify-center cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white"
      >
        <ChevronRight size={20} />
      </button>

      {/* Centered Arrows on Mobile */}
      <div className="sm:hidden flex justify-center mt-4 space-x-4">
        <button
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
          type="button"
          className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          type="button"
          className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Images;

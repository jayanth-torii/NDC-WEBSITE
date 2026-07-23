"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function LifeAtNDC({data}:any) {
  const {title, videos} = data

  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount: number = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        // Check if scroll has reached the end
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" }); // Reset to start
        } else {
          scrollRef.current.scrollBy({ left: 250, behavior: "smooth" }); // Scroll right
        }
      }
    }, 2000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="Campus Life" title={title} className="mb-9" />
        </Reveal>

        {/* Top Container - Video Player */}
        <Reveal delay={0.1} className="w-full aspect-video mb-5 overflow-hidden rounded-[24px] border border-card-border shadow-[var(--shadow-navy)]">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${currentVideo}`}
            title="YouTube Video Player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Reveal>

        {/* Bottom Container - Scrollable Video List */}
        <Reveal delay={0.15} className="relative w-full overflow-hidden">
          {/* Left Arrow */}
          <button
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[var(--ease-editorial)] hover:bg-navy hover:text-white z-10"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scrollable Thumbnails */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap px-1 py-1"
          >
            {[...videos, ...videos]?.map((video: string, index: number) => {
              const isActive = video === currentVideo;
              return (
                <button
                  key={`${video}-${index}`}
                  onClick={() => setCurrentVideo(video)}
                  aria-label={`Play campus life video ${(index % videos.length) + 1}`}
                  className={`group relative w-60 sm:w-80 flex-shrink-0 rounded-[16px] overflow-hidden border-2 transition-all duration-250 ease-[var(--ease-editorial)] ${
                    isActive ? "border-orange shadow-[var(--shadow-cta)]" : "border-transparent hover:-translate-y-1 hover:border-orange/60"
                  }`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video}/hqdefault.jpg`}
                    alt=""
                    className="w-full aspect-video object-cover"
                  />
                  <span className={`absolute inset-0 flex items-center justify-center bg-navy/20 transition-opacity duration-250 ${isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`}>
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-navy">
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    </span>
                  </span>
                  {isActive && (
                    <span className="absolute top-2 right-2 flex items-center gap-1.5 bg-orange text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Playing
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[var(--ease-editorial)] hover:bg-navy hover:text-white z-10"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={20} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

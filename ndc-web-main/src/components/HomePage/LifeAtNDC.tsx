"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Video } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function LifeAtNDC({data}:any) {
  const {title, videos} = data

  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount: number = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-surface-light overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange/10 text-orange mb-6">
              <Video size={28} />
            </div>
            <SectionHeading eyebrow="Campus Life" title={title} className="justify-center" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              Experience the vibrant campus life through our video gallery
            </p>
          </div>
        </Reveal>

        {/* Enhanced Video Player */}
        <Reveal delay={0.1} className="w-full aspect-video mb-8 overflow-hidden rounded-[32px] border border-gray-200 shadow-[0_30px_80px_rgba(14,36,85,0.15)] bg-navy">
          <div className="relative w-full h-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideo}`}
              title="YouTube Video Player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            {/* Video Overlay Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-navy/20 to-transparent" />
          </div>
        </Reveal>

        {/* Enhanced Video Gallery */}
        <Reveal delay={0.15} className="relative w-full overflow-hidden">
          {/* Left Arrow */}
          <button
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white border border-gray-200 text-navy shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-navy hover:text-white hover:shadow-[0_12px_40px_rgba(14,36,85,0.2)] z-10"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scrollable Thumbnails */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap px-2 py-2"
          >
            {[...videos, ...videos]?.map((video: string, index: number) => {
              const isActive = video === currentVideo;
              return (
                <button
                  key={`${video}-${index}`}
                  onClick={() => setCurrentVideo(video)}
                  aria-label={`Play campus life video ${(index % videos.length) + 1}`}
                  className={`group relative w-72 sm:w-80 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    isActive ? "border-orange shadow-[0_16px_40px_rgba(246,135,42,0.3)]" : "border-transparent hover:-translate-y-2 hover:border-orange/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]"
                  }`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video}/hqdefault.jpg`}
                    alt=""
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play Button Overlay */}
                  <span className={`absolute inset-0 flex items-center justify-center bg-navy/30 transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`}>
                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white/95 text-navy shadow-lg">
                      <Play size={20} fill="currentColor" className="ml-0.5" />
                    </span>
                  </span>
                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute top-3 right-3 flex items-center gap-2 bg-gradient-to-r from-orange to-orange-dark text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Playing
                    </span>
                  )}
                  {/* Video Number Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg">
                    #{(index % videos.length) + 1}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white border border-gray-200 text-navy shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-navy hover:text-white hover:shadow-[0_12px_40px_rgba(14,36,85,0.2)] z-10"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={24} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

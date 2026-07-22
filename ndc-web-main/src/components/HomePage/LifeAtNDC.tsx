"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

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
    <Reveal className="flex flex-col items-center w-[90%] mx-auto p-4 mb-10 md:mt-10">
      <h1 className="text-2xl md:text-3xl text-navy font-extrabold tracking-[-0.5px] text-left w-full mb-5">
        {title}
      </h1>
      {/* Top Container - Video Player */}
      <div className="w-full aspect-video mb-4 overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${currentVideo}`}
          title="YouTube Video Player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Bottom Container - Scrollable Video List */}
      <div className="relative w-full overflow-hidden">
        {/* Left Arrow */}
        <button
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white z-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Thumbnails */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap"

          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {[...videos, ...videos]?.map((video, index) => (
            <img
key={Math.random().toString().slice(2, 6)}
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              className="cursor-pointer w-60 sm:w-80 flex-shrink-0 rounded-[14px] border-2 border-transparent transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-orange hover:-translate-y-1"
              onClick={() => setCurrentVideo(video)}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white z-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </Reveal>
  );
}

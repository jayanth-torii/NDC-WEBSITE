"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, Users, Heart, MessageSquare } from "lucide-react";
import Image from "next/image";


const Images = ({ data }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isUserScrolling || fullscreenImage) return;

    const autoScroll = () => {
      if (!scrollContainer) return;

      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: scrollContainer.clientWidth / 2, behavior: "smooth" });
      }
    };

    const interval = setInterval(autoScroll, 3000); // Scrolls every 3 seconds

    return () => clearInterval(interval);
  }, [isUserScrolling, fullscreenImage]);

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

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!data || !data.images) return null;

  return (
    <div className="relative mb-10 md:mb-20 bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-8 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F6872A]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full border-[3px] border-[#1a3668]/10 pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 right-10 w-2 h-2 rounded-full bg-[#F6872A]/20 pointer-events-none z-0"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#F6872A 2px, transparent 2px)', backgroundSize: '10px 10px' }}></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="w-12 h-12 rounded-full bg-[#F6872A] flex items-center justify-center shrink-0 shadow-[var(--shadow-cta)]">
             <Users className="text-white" size={24} />
           </div>
           <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a3668]">{data.title || "Gallery"}</h2>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data.images.map((image: string, index: number) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 snap-start relative group">
            {/* Responsive cards on larger screens */}
            <div 
              className="relative overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-editorial)] hover:-translate-y-2 hover:shadow-[var(--shadow-card-hover)] aspect-[4/3] cursor-pointer"
              onClick={() => setFullscreenImage(image)}
            >
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-110"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={index < 3}
              />
              
              {/* Bottom Caption Banner */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#1a3668] p-4 flex items-center justify-between z-20 translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium text-sm md:text-[15px] max-w-[70%] leading-tight">
                   {["Awareness Session on Menstrual Hygiene", "Women's Health Awareness Talk", "Interactive Session with Students", "Grievance Redressal Meeting"][index % 4]}
                </p>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                  {index % 3 === 0 ? <Users className="text-[#1a3668]" size={18} /> : index % 3 === 1 ? <Heart className="text-[#1a3668]" size={18} /> : <MessageSquare className="text-[#1a3668]" size={18} />}
                </div>
              </div>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center z-10">
                 <div className="bg-white/90 backdrop-blur-sm text-[#F6872A] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                    <Maximize2 size={24} />
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Desktop) */}
      <button
        onClick={() => handleScroll("left")}
        aria-label="Scroll left"
        type="button"
        className="hidden md:flex items-center justify-center cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 -ml-5 w-12 h-12 rounded-full bg-white border border-card-border text-navy shadow-lg transition-all duration-300 hover:bg-orange hover:text-white hover:border-orange hover:scale-110 z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => handleScroll("right")}
        aria-label="Scroll right"
        type="button"
        className="hidden md:flex items-center justify-center cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 -mr-5 w-12 h-12 rounded-full bg-white border border-card-border text-navy shadow-lg transition-all duration-300 hover:bg-orange hover:text-white hover:border-orange hover:scale-110 z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Navigation Arrows (Mobile) */}
      <div className="md:hidden flex justify-center mt-6 space-x-6">
        <button
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
          type="button"
          className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full bg-white border border-card-border text-navy shadow-sm transition-all hover:bg-navy hover:text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          type="button"
          className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full bg-white border border-card-border text-navy shadow-sm transition-all hover:bg-navy hover:text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10 animate-in fade-in duration-300">
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all cursor-pointer z-50"
            aria-label="Close fullscreen"
          >
            <X size={32} />
          </button>
          <div className="relative w-full max-w-6xl h-full max-h-[85vh] animate-in zoom-in-95 duration-300">
            <Image
              src={fullscreenImage}
              alt="Fullscreen view"
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Images;

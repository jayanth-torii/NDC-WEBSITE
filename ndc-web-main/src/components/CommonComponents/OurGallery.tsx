"use client"
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


interface OurGalleryProps {
  StudentCenterData: {
    images: string[];
    title:string
  };
}

const OurGallery = ({ StudentCenterData }: OurGalleryProps) => {
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

    const interval = setInterval(autoScroll, 3000);

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

    setTimeout(() => setIsUserScrolling(false), 3000);
  }

  return (
    <div className="relative mb-10 md:mb-20">

      <h1 className="text-2xl md:text-3xl text-navy font-extrabold mb-6 text-left">
        {StudentCenterData.title}
      </h1>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {StudentCenterData?.images?.map((image: string, index: number) => (
          <div key={index} className="p-2 space-y-3 flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/2">
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)] transition-shadow duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[var(--shadow-card-hover)]">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
              />
            </div>
          </div>

        ))}
      </div>
      <button
        onClick={() => handleScroll("left")}
        className="absolute bg-white left-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-orange"
      >
         <FaArrowLeft size={20} className="text-navy"/>
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 bg-white top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-orange"
      >
        <FaArrowRight size={20} className="text-navy"/>
      </button>
    </div>
  );
}
export default OurGallery
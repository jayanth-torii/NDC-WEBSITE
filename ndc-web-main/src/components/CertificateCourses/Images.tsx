import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type ImagesBlock = {
  title?: string;
  images?: string[];
};

const Images = ({ data }: { data?: ImagesBlock }) => {

  const { title = "", images = [] } = data ?? {};

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isUserScrolling || images.length < 2) return;

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
  }, [isUserScrolling, images.length]);

  const handleScroll = (direction: "left" | "right") => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    setIsUserScrolling(true);
    const scrollDistance = scrollContainer.clientWidth / 2;

    scrollContainer.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });

    // Resume auto-scroll after 3s
    const t = setTimeout(() => setIsUserScrolling(false), 3000);
    return () => clearTimeout(t);
  };

  if (!title && images.length === 0) {
    return null;
  }

  return (
    <Reveal className="relative mb-10 md:mb-20">

      {title && <SectionHeading title={title} align="left" className="mb-6" />}
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="p-2 flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/2">
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-2xl border border-card-border shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
          <>
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-11 w-11 rounded-full bg-white text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-orange hover:text-white"
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-11 w-11 rounded-full bg-white text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-orange hover:text-white"
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </Reveal>
  );
};

export default Images;

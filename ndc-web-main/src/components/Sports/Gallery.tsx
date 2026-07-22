import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";


const Gallery = ( {data} :any) => {
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

      <h1 className="mb-6 text-left text-2xl font-extrabold tracking-[-0.5px] text-navy md:text-3xl">
        {data.title}
      </h1>
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data?.images?.map((image: string, index: number) => (
          <div key={index} className="w-full flex-shrink-0 snap-start sm:w-1/2 md:w-1/2 lg:w-1/2">
            {/* Responsive, shorter cards on larger screens */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[16px] border border-card-border shadow-[var(--shadow-card)] transition-shadow duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[var(--shadow-card-hover)] lg:aspect-video">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                priority={index < 2}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 transition-opacity duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => handleScroll("left")}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white p-3 text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-orange hover:text-white md:block"
      >
         <ArrowLeft size={20} />
      </button>
      <button
        onClick={() => handleScroll("right")}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white p-3 text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-orange hover:text-white md:block"
      >
        <ArrowRight size={20} />
      </button>

      {/* Centered Arrows on Mobile */}
      <div className="mt-4 flex justify-center space-x-4 sm:hidden">
        <button
          onClick={() => handleScroll("left")}
          className="rounded-full bg-chip-bg p-3 text-orange transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
         <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="rounded-full bg-chip-bg p-3 text-orange transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
         <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
};

export default Gallery;

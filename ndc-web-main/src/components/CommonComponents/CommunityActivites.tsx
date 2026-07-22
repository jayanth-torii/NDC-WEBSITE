"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
 

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  const [reversed, setReversed] = useState(false);

  const nextSlide = () => {
    setIndex((prev) => {
      if (prev === images.length - 1) {
        setReversed(!reversed);
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setIndex((prev) => {
      if (prev === 0) {
        setReversed(!reversed);
        return images.length - 1;
      }
      return prev - 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [reversed]);

  return (
    <div className="relative w-full overflow-hidden mb-6">
      {/* Image container */}
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {(reversed ? [...images].reverse() : images).map((img, idx) => (
          <img key={idx} src={img} alt={`Slide ${idx}`} className="min-w-full md:min-w-[33.33%] aspect-[4/3] object-cover rounded-[14px]" />
        ))}
      </div>

      {/* Left Arrow */}
      <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-[var(--shadow-card)] transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-orange">
        <FontAwesomeIcon icon={faChevronLeft} className="text-navy text-xl" />
      </button>

      {/* Right Arrow */}
      <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-[var(--shadow-card)] transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-orange">
        <FontAwesomeIcon icon={faChevronRight} className="text-navy text-xl" />
      </button>
    </div>
  );
};


interface AccordionItem {
  title: string;
  description: string;
  images: string[];
}
interface CommunityActivitiesProps {
  accordionData: AccordionItem[];
  title?: string; // Added this line
}



const CommunityActivities: React.FC<CommunityActivitiesProps> = ({ accordionData, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full mb-20">
     <h1 className="text-2xl md:text-3xl text-navy font-extrabold mb-6 text-left">
        {title}
      </h1>
      {accordionData.map((item, idx) => (
        <div key={idx} className="border border-card-border rounded-[18px] overflow-hidden mb-3 shadow-[var(--shadow-card)] transition-shadow duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[var(--shadow-card-hover)]">
          <button
            className="w-full p-4 text-left bg-surface-light text-navy font-semibold flex justify-between items-center transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-surface-tint"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {item.title}
            <FontAwesomeIcon icon={openIndex === idx ? faChevronUp : faChevronDown} className="text-orange" />
          </button>
          {openIndex === idx && (
            <div className="p-4 bg-white space-y-3">
              <p className="text-body-gray leading-[1.65]">{item.description}</p>
              <ImageCarousel images={item.images} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommunityActivities;

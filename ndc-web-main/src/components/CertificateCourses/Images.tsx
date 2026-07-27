import React from "react";
import { Reveal } from "@/components/ui/Reveal";

type ImagesBlock = {
  title?: string;
  images?: string[];
};

const Images = ({ data }: { data?: ImagesBlock }) => {
  const { title = "", images = [] } = data ?? {};

  if (!title && images.length === 0) {
    return null;
  }

  return (
    <Reveal as="section" className="relative mb-10 max-w-7xl mx-auto px-4 lg:px-8">
      
      {/* Dark Theme Container */}
      <div className="bg-navy rounded-[2rem] px-8 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10 overflow-hidden relative shadow-xl">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          {title && (
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-orange text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2">
                Specialization
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight uppercase">
                {title}
              </h2>
            </div>
          )}

          {/* Premium Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {images.map((src, index) => (
              <div 
                key={index} 
                className={`group relative rounded-[1.5rem] overflow-hidden bg-white/5 border border-white/10 shadow-lg transition-all duration-500 hover:shadow-[0_20px_40px_rgba(255,107,0,0.15)] hover:-translate-y-2 aspect-[4/3] ${
                  index === 0 ? "lg:mt-8" : "lg:-mt-8" // Asymmetrical offset for a premium look
                }`}
              >
                {/* Image */}
                <img
                  src={src}
                  alt={`Fashion Design ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Decorative border line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange to-orange/30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </Reveal>
  );
};

export default Images;

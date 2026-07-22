"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

interface PlacementPartnersProps {
  images: string[];
}

const PlacementPartners: React.FC<PlacementPartnersProps> = ({ images }) => {
  const [swiperKey, setSwiperKey] = useState(0);

  useEffect(() => {
    setSwiperKey((prev) => prev + 1);
  }, [images]);

  return (
    <div className="mx-auto mb-20 mt-10 w-full">
      <h2 className="mb-8 text-2xl font-extrabold tracking-[-0.5px] text-navy md:text-3xl">
        PLACEMENT PARTNERS
      </h2>

      <div className="placement-partners relative">
        {/* Swiper Component */}
        {images?.length > 0 ? (
          <Swiper
            key={swiperKey} // Ensure re-render on data update
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
              1600: { slidesPerView: 6 },
            }}
            autoplay={{ delay: 3000 }}
            loop={true}
            pagination={{ clickable: true }}
          >
            {images?.map((url: any, index: any) => (
              <SwiperSlide key={index} className="!h-auto pb-12">
                <div className="group flex h-full items-center justify-center rounded-[16px] border border-card-border bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-card-border-hover hover:shadow-[var(--shadow-card-hover)]">
                  <div className="relative aspect-square w-full">
                    <img
                      src={url}
                      alt={`partner-${index}`}
                      className="h-full w-full object-contain grayscale transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:grayscale-0"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-body-gray">Loading partners...</p>
        )}
      </div>

      <style jsx global>{`
        .placement-partners .swiper-pagination-bullet {
          background: #0e2455;
          opacity: 0.25;
        }
        .placement-partners .swiper-pagination-bullet-active {
          background: #f6872a;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default PlacementPartners;

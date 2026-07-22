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
    <div className="rounded-lg mx-auto mb-20 mt-10  w-full">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#003333] mb-8">
        PLACEMENT PARTNERS
      </h2> 

      <div className="relative">
        {/* Swiper Component */}
        {images?.length > 0 ? (
          <Swiper
            key={swiperKey} // Ensure re-render on data update
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
              1600: { slidesPerView: 6 },
            }}
            autoplay={{ delay: 3000,   }}
            loop={true}
            pagination={{
              clickable: true,
              // renderBullet: (index, className) => {
              //   return `<span class="${className}" style="
              //     background-color: #F6872A;
              //     width: 20px;
              //     height: 12px;
              //     border-radius: 50%;
              //     margin-top: -30px;
              //     transition: width 0.5s ease;
              //   "></span>`;
              // },
            }}
            // onSlideChange={(swiper) => {
            //   setTimeout(() => {
            //     document.querySelectorAll(".swiper-pagination-bullet").forEach((bullet, i) => {
            //       if (bullet instanceof HTMLElement) {
            //         bullet.style.width = i === swiper.realIndex ? "30px" : "10px";
            //       }
            //     });
            //   }, 10);
            // }}
          >
            {images?.map((url:any, index:any) => (
              <SwiperSlide key={index} className="flex justify-center items-center mb-20 md:ml-8">
                <div className="relative bg-[#000000] shadow-lg flex items-center justify-center mx-auto w-full max-w-xs md:max-w-none pb-[75%]">
                  <img
                    src={url}
                    alt={`partner-${index}`}
                    className="absolute top-2 left-2 w-full h-full border bg-[white] border-[#0E2455] object-fill"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">Loading partners...</p>
        )}
      </div>
    </div>
  );
};

export default PlacementPartners;
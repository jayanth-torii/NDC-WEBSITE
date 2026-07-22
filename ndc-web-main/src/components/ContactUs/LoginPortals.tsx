'use client';

import React from 'react';
import { Card } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';

const LoginPortals = ({ portals }: any) => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 py-10 px-5 md:px-20 flex flex-col md:flex-row items-center w-full rounded-lg mb-10 md:mb-20">
      {/* Mobile View: Swiper */}
      <div className="w-full md:hidden">
        <Swiper 
          modules={[Pagination]} 
          spaceBetween={10} 
          slidesPerView={1} 
          pagination={{ clickable: true }}
          className="w-full"
        >
          {portals.map((program: any, index: any) => (
            <SwiperSlide key={index}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                className="w-full max-w-[90%] bg-white mb-10 sm:max-w-[400px] h-auto mx-auto"
              >
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-[200px] sm:h-[250px] object-contain" 
                />
                <div className="p-4 text-center">
                  <p className="font-semibold text-base text-[#0E2455]">{program.title}</p>
                  <button 
                    onClick={() => router.push(program.url)}  
                    className="mt-4 bg-[#003333] cursor-pointer w-full text-white text-lg py-2 px-6 rounded-sm hover:bg-[#09203F] transition"
                  >
                    Login Here
                  </button>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Side-by-Side Cards */}
      <div className="hidden md:flex w-full gap-5 justify-center">
        {portals.map((program: any, index: any) => (
          <Card
            key={index}
            shadow="sm"
            padding="lg"
            radius="md"
            className="w-full bg-white rounded-md h-auto"
          >
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-[200px] object-contain" 
            />
            <div className="p-4 text-center">
              <p className="font-semibold text-lg text-[#0E2455]">{program.title}</p>
              <button 
                onClick={() => router.push(program.url)} 
                className="mt-4 bg-[#003333] cursor-pointer w-full text-white text-lg py-2 px-6 rounded-sm hover:bg-[#09203F] transition"
              >
                Login Here
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Inline Styles for Swiper Pagination */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background-color: orange !important;
          width: 10px !important;
          height: 10px !important;
          opacity: 0.6;
          transition: all 0.3s ease-in-out;
        }

        :global(.swiper-pagination-bullet-active) {
          width: 30px !important;
          height: 10px !important;
          border-radius: 5px !important;
          background-color: orange !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default LoginPortals;

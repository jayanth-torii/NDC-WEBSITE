"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Arrow from '../../../../public/images/Link.svg';
import Image from "next/image";
import { Pagination, Autoplay } from 'swiper/modules';
import "./Records.css";


export default function Stats({ data }: { data: any[] }) {
  if (!data || data?.length === 0) return null;

  return (
    <div className="w-full flex justify-center pt-10">
      <div className="max-w-1xl w-full px-6 relative">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
        >
          {data?.map((record, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-56 h-52 rounded-lg p-6 flex flex-col justify-between text-white mx-auto"
                style={{
                  backgroundImage: `url(${record?.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <img src={record?.icon} alt='icon' className='' height={30} width={30} />
                <div className="text-4xl font-bold text-center mt-6">{record?.count}</div>
                <div className="text-lg text-center mt-2">{record?.title}</div>
                <div className="flex justify-end">
                  <Image 
                    src={Arrow} 
                    alt="Arrow Icon" 
                    width={40} 
                    height={40} 
                    className="w-8 h-8 md:w-8 md:h-8"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
        <div className="custom-pagination mt-7 flex justify-center"></div>
      </div>
    </div>
  );
}
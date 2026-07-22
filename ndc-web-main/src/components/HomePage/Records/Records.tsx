"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { ArrowUpRight } from 'lucide-react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Reveal } from '@/components/ui/Reveal';
import IconChip from '@/components/ui/IconChip';
import "./Records.css";


export default function Stats({ data }: { data: any[] }) {
  if (!data || data?.length === 0) return null;

  return (
    <Reveal className="w-full flex justify-center pt-10">
      <div className="max-w-1xl w-full px-6 relative">
        <Swiper
          spaceBetween={20}
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
                className="group relative w-56 h-52 rounded-[18px] p-6 flex flex-col justify-between text-white mx-auto overflow-hidden shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                style={{
                  backgroundImage: `url(${record?.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/20" />

                <IconChip size={44} className="relative z-10 bg-white/15 text-orange backdrop-blur-sm">
                  <img src={record?.icon} alt='icon' className='w-6 h-6' height={24} width={24} />
                </IconChip>
                <div className="relative z-10 text-4xl font-extrabold text-center mt-2">{record?.count}</div>
                <div className="relative z-10 text-lg text-center mt-1">{record?.title}</div>
                <div className="relative z-10 flex justify-end">
                  <ArrowUpRight className="w-6 h-6 text-orange transition-transform duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
        <div className="custom-pagination mt-7 flex justify-center"></div>
      </div>
    </Reveal>
  );
}

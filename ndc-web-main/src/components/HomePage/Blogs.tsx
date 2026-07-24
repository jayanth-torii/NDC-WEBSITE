"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, ArrowRight, Award, Calendar, Leaf } from "lucide-react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import blogJson from "@/data-export/blog/data.json";
import { Reveal } from "@/components/ui/Reveal";

const Blogs = () => {
  const router = useRouter();
  const articles: Record<string, any> | null = (blogJson["blogs-content"] as any)?.data?.blogs || null;
  const swiperRef = useRef<any>(null);

  return (
    <section className="relative py-20 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1300px]">
        
        {/* Top Header Section */}
        <div className="relative mb-12">
          {/* Header Content */}
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-[#F6872A] w-8" />
              <span className="text-[#F6872A] font-bold text-sm tracking-widest uppercase">
                BLOG
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a3668] tracking-tight mb-4">
              Explore Our <span className="text-[#F6872A]">Blogs</span>
            </h2>
            <p className="text-gray-500 font-medium text-[15px] max-w-xl">
              Insights, stories, and updates on our latest initiatives, events, and impact.
            </p>
          </Reveal>


        </div>

        {/* Carousel Section */}
        <Reveal delay={0.1}>
          <div className="relative pb-16">
            
            {/* Left/Right Nav Arrows (Custom Pos) */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="hidden lg:flex absolute left-[-24px] top-[40%] -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white text-[#1a3668] shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-[#F6872A] hover:text-white transition-colors border border-gray-100"
            >
              <ChevronLeft size={24} />
            </button>

            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{
                clickable: true,
                el: '.custom-blog-pagination',
                bulletClass: 'swiper-pagination-bullet !w-2.5 !h-2.5 !bg-gray-300 !opacity-100 transition-all duration-300',
                bulletActiveClass: '!w-6 !bg-[#F6872A] !rounded-full',
              }}
              className="!px-4 !py-4 -mx-4"
            >
              {articles?.slice(0, 6).map((blog: any, index: number) => {
                // Determine a category label based on index just to match the visual
                const category = index % 3 === 0 ? "Awards" : index % 3 === 1 ? "Events" : "Initiatives";
                const catIcon = index % 3 === 0 ? <Award size={14} /> : index % 3 === 1 ? <Calendar size={14} /> : <Leaf size={14} />;
                
                return (
                  <SwiperSlide key={index} className="h-auto">
                    <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 h-full flex flex-col group cursor-pointer hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-shadow duration-300">
                      
                      {/* Top Image Box */}
                      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden shrink-0">
                        <Image
                          src={blog?.blogImage || "/images/default-blog.png"}
                          alt={blog?.title || "Blog Image"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlapping Category Badge */}
                        <div className="absolute bottom-4 left-4 bg-[#F6872A] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md z-10">
                          {catIcon}
                          {category}
                        </div>
                      </div>

                      {/* Content Box */}
                      <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-white">
                        
                        {/* Date */}
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-4">
                           <Calendar size={16} className="text-gray-400" />
                           <span>{blog?.date || "April 24, 2025"}</span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-[#1a3668] leading-snug mb-3 line-clamp-2">
                          {blog?.title || "Padma Awardees from the Karnataka State"}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-8">
                          {blog?.description || "Hon'ble Award from the Civilian Awards presented by the Government of India..."}
                        </p>
                        
                        {/* Footer (Read More) */}
                        <div className="mt-auto flex items-center gap-3">
                          <span className="text-[#F6872A] font-bold text-sm">Read More</span>
                          <div className="w-8 h-8 rounded-full bg-[#F6872A] flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform">
                             <ArrowRight size={16} strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="hidden lg:flex absolute right-[-24px] top-[40%] -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white text-[#1a3668] shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-[#F6872A] hover:text-white transition-colors border border-gray-100"
            >
              <ChevronRight size={24} />
            </button>

            {/* Custom Pagination Container */}
            <div className="custom-blog-pagination flex justify-center gap-2 mt-8" />
          </div>
        </Reveal>

        {/* Bottom Banner */}
        <Reveal delay={0.2}>
          <div className="bg-[#FFF8F3] rounded-3xl p-6 md:p-8 mt-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-orange/10 shadow-sm">
            
            <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
              <div className="w-[60px] h-[60px] bg-[#F6872A] rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </div>
              <div className="flex flex-col">
                 <h3 className="text-xl font-extrabold text-[#1a3668] tracking-tight mb-1">
                   Stay Updated with Our Latest Stories
                 </h3>
                 <p className="text-gray-500 font-medium text-[14px]">
                   Subscribe to our blog and never miss an update.
                 </p>
              </div>
            </div>

            <button 
              onClick={() => router.push("/blog")}
              className="relative z-10 w-full md:w-auto bg-[#F6872A] hover:bg-[#e0751f] text-white font-bold px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(246,135,42,0.4)] transition-all flex items-center justify-center gap-3 shrink-0"
            >
              View All Blogs
              <div className="w-8 h-8 rounded-full bg-white text-[#F6872A] flex items-center justify-center -mr-3">
                 <ArrowRight size={18} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Blogs;

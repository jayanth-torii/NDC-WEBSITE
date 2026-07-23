"use client";
import React, { useRef} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide ,} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import blogJson from "@/data-export/blog/data.json";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";


const Blogs = () => {
  const router = useRouter();
   const { id } = useParams();
   const link = `blog/${id}`

   const articles: Record<string, any> | null = (blogJson["blogs-content"] as any)?.data?.blogs || null;
   const swiperRef = useRef<any>(null); // Ref for Swiper instance

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
    <Reveal className="bg-surface-tint rounded-[28px] relative flex flex-col items-center justify-center pt-12 pb-6">
      <SectionHeading eyebrow="Blog" title="Explore Our Blogs" align="center" className="mb-8" />
      {/* Swiper Slider */}
      <div className="relative w-full max-w-[90%]">

      {/* Left Arrow */}
      <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="cursor-pointer absolute left-[-8px] sm:left-[-20px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1440: { slidesPerView: 3 },
        }}
        className="h-[480px] w-full relative z-10 mb-5 pb-8"
      >
      {articles?.map((blog: any, index: any) => (
        <SwiperSlide key={index} className="flex justify-center items-center py-2">
          <Card className="w-full max-w-[320px] md:max-w-[420px] h-[460px] mx-auto flex flex-col overflow-hidden !p-0" accent="orange-left">
            <div className="w-full h-44 relative overflow-hidden shrink-0 bg-surface-tint">
              <Image
                src={blog?.blogImage || "/images/default-blog.png"}
                alt={blog?.title}
                fill
                className="object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl font-bold mb-3 text-navy line-clamp-2">
                {blog?.title}
              </h3>
              <p className="text-justify mb-5 text-body-gray line-clamp-2">
                {blog?.description}
              </p>
              <div className="w-full flex justify-start mt-auto">
                <Button
                  onClick={() => router.push(`blog/${blog.id}`)}
                  variant="primary"
                  className="!px-5 !py-2.5 !text-sm"
                >
                  VIEW BLOG
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </SwiperSlide>
      ))}
      </Swiper>

      {/* Right Arrow */}
      <button
          onClick={() => swiperRef.current?.slideNext()}
          className="cursor-pointer absolute right-[-8px] sm:right-[-20px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </Reveal>
      </div>
    </section>
  );
};

export default Blogs;

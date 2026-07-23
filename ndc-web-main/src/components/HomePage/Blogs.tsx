"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
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

  const articles: Record<string, any> | null = (blogJson["blogs-content"] as any)?.data?.blogs || null;
  const swiperRef = useRef<any>(null);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="Blog" title="Explore Our Blogs" className="mb-8" />

          <div className="relative">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="hidden md:flex absolute left-[-16px] top-[40%] -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[var(--ease-editorial)] hover:bg-navy hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>

            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              modules={[Pagination, Autoplay]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!px-1 !py-2"
            >
              {articles?.map((blog: any, index: any) => (
                <SwiperSlide key={index}>
                  <Card className="h-full flex flex-col overflow-hidden !p-0" accent="orange-left">
                    <div className="w-full h-36 relative overflow-hidden shrink-0 bg-surface-tint">
                      <Image
                        src={blog?.blogImage || "/images/default-blog.png"}
                        alt={blog?.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="text-[17px] font-bold mb-2 text-navy line-clamp-2 min-h-[3rem]">
                        {blog?.title}
                      </h3>
                      <p className="text-sm mb-4 text-body-gray line-clamp-2">
                        {blog?.description}
                      </p>
                      <Button
                        onClick={() => router.push(`blog/${blog.id}`)}
                        variant="primary"
                        className="!px-4 !py-2 !text-xs w-fit mt-auto"
                      >
                        VIEW BLOG
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="hidden md:flex absolute right-[-16px] top-[40%] -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[var(--ease-editorial)] hover:bg-navy hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Blogs;

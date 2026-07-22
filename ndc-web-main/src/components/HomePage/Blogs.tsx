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
    <Reveal className="bg-surface-tint rounded-[18px] relative flex flex-col items-center justify-center pt-10 m-auto w-[91%] mt-20 mb-10 pb-4">
      <SectionHeading title="EXPLORE OUR BLOGS" align="center" className="mb-8" />
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
        // pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1440: { slidesPerView: 3 },
        }}
        className="h-[490px] relative z-10 mb-5"
      >
      {articles?.map((blog: any, index: any) => (
        <SwiperSlide key={index}>
          <Card className="w-full max-w-[320px] md:max-w-[450px] h-[550px] mx-auto flex flex-col px-4 p-6" accent="orange-left">
            <h3 className="text-xl font-bold mb-3 text-navy">
              {blog?.title.slice(0, 40)}...
            </h3>
            <p className="text-justify mb-4 text-body-gray">
              {blog?.description.slice(0, 70)}...
            </p>
            <div className="w-full flex justify-start">
              <Button
                onClick={() => router.push(`blog/${blog.id}`)}
                variant="primary"
                className="!px-5 !py-2.5 !text-sm"
              >
                VIEW BLOG
                <ArrowRight size={18} />
              </Button>
            </div>
            <div className="mt-6 w-full h-64 relative rounded-lg overflow-hidden mb-10">
              <Image
                src={blog?.blogImage || "/images/default-blog.png"} // fallback image
                alt={blog?.title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
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
  );
};

export default Blogs;

"use client";
import React, { useEffect, useState, useRef} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide ,} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Arrow from "../../../public/images/IcocNew.svg";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Button } from "@mantine/core";
import axios from "axios";
import { BASE_URL } from "../../config/apiService";


const Blogs = () => {
  const router = useRouter();
   const { id } = useParams();
   const link = `blog/${id}`

   const [articles, setArticlesData] = useState<Record<string, any> | null>(null);
   const swiperRef = useRef<any>(null); // Ref for Swiper instance

   useEffect(() => {
    const fetchBlocksContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs-content`);
        setArticlesData(response?.data?.data?.blogs);
      } catch (error) {
        console.error("Error fetching Placement sections:", error);
      }
    };

    fetchBlocksContent();
  }, []);

  return (
    <div className="bg-[#eeece9] rounded-lg relative flex flex-col items-center justify-center pt-10 m-auto w-[91%] mt-20 mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#003333]">EXPLORE OUR BLOGS</h2>
      {/* Swiper Slider */}
      <div className="relative w-full max-w-[90%]">

      {/* Left Arrow */}
      <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="cursor-pointer absolute left-[-20px] top-1/2 transform -translate-y-1/2 text-[#003333] z-20"
        >
          <Image src="/images/left-arrow-blue.svg" alt="Right Arrow" width={50} height={67} />
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
          <div
            className="relative w-full max-w-[320px] md:max-w-[450px] bg-[#ffffff] h-[550px] mx-auto flex flex-col px-4 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold mb-3 text-[#3A3F00]">
              {blog?.title.slice(0, 40)}...
            </h3>
            <p className="text-justify mb-4 text-[#3A3F00] ">
              {blog?.description.slice(0, 70)}...
            </p>
            <div className="w-full flex justify-start">
              <Button
                onClick={() => router.push(`blog/${blog.id}`)}
                style={{ backgroundColor: "#3A3F00", color: "#ffffff" }}
                className="px-5 py-2 rounded-md flex items-center gap-4"
                variant="filled"
              >
                VIEW BLOG
                <Image src={Arrow} alt="Arrow Icon" width={20} height={20} className="w-5 h-5 md:w-6 md:h-6 ml-3" />
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
          </div>
        </SwiperSlide>
      ))}
      </Swiper>

      {/* Right Arrow */}
      <button
          onClick={() => swiperRef.current?.slideNext()}
          className="cursor-pointer absolute right-[-20px] top-1/2 transform -translate-y-1/2 text-[#003333]  z-20"
        >
          <Image src="/images/right-arrow-blue.svg" alt="Right Arrow" width={50} height={67} />
        </button>
      </div>
    </div>
  );
};

export default Blogs;

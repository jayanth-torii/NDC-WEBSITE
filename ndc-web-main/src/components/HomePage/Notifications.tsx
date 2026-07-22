"use client";
import React, { useState, useRef, useEffect } from "react";
import { Tabs, Card, Button } from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import PdfModal from "../PdfModal";
 
const Notifications = ({data}:any) => {
  const  notificationsData = data;
  const [activeTab, setActiveTab] = useState<string | null>(
  notificationsData?.NotificationTabs?.[0]?.tabName || null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
 
 
  const openPdf = (pdf: string, link: string) => {
    if (pdf && pdf !== "#" && pdf !== "") {
      setSelectedPdf(pdf);
    } else if (link && link !== "#" && link !== "") {
      window.open(link, "_blank");
    }
  };
 
  return (
    <div className="w-[90%] mx-auto px-2 py-8 relative">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-5 text-[#003333] text-left">{notificationsData.title}</h2>
 
      {Object.keys(notificationsData.NotificationTabs).length > 0 ? (
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
          <Tabs.List className="flex space-x-6 border-b-4 border-[#EEEEEE] mb-4 text-2xl">
            {notificationsData.NotificationTabs.map((tab: any, idx: number) => (
              <Tabs.Tab
                key={idx}
                value={tab.tabName}
                style={{
                  fontSize: "1.1rem",
                  fontWeight: activeTab === tab.tabName ? 700 : 500,
                  borderBottom: activeTab === tab.tabName ? "4px solid #EF7EAD" : "none",
                  marginLeft: "-10px",
                }}
              >
                {tab.tabName}
              </Tabs.Tab>
            ))}
          </Tabs.List>

 
          {activeTab && (notificationsData.NotificationTabs.find((tab: any) => tab.tabName === activeTab)?.Data.length > 0) ? (
            <div className="relative flex items-center justify-center">
              {/* Left Arrow */}
              <button
                className="cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 z-10 transition"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <Image src="/images/left-arrow-blue.svg" alt="left Arrow" width={50} height={67} />
              </button>
 
              {/* Swiper */}
              <Swiper
                key={activeTab}
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                onSwiper={(swiperInstance) => (swiperRef.current = swiperInstance)}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                allowTouchMove={false}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 1 },
                  1024: { slidesPerView: 3 },
                  1440: { slidesPerView: 4 },
                }}
                className="my-4 flex justify-center w-full"
              >
                {(notificationsData.NotificationTabs.find((tab:any)  => tab.tabName === activeTab)?.Data || []).map(
                  (notification: any, index: number) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                      <Card
                        shadow="sm"
                        padding="lg"
                        className="w-[320px] h-[150px] m-auto bg-white rounded-xl shadow-xl p-4 flex flex-col justify-between"
                      >
                        <p className="text-md text-[#0E2455] mb-2 line-clamp-2 text-center">
                          {notification?.title}
                        </p>
                        <Button
                          onClick={() => openPdf(notification.pdf, notification.link)}
                          style={{ backgroundColor: "#0E2455", fontWeight: 500 }}
                        >
                          VIEW NOTIFICATION
                        </Button>
                      </Card>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
 
              {/* Right Arrow */}
              <button
                className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2  z-10  transition"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <Image src="/images/right-arrow-blue.svg" alt="Right Arrow" width={50} height={67} />
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">No notifications available for this category.</p>
          )}
        </Tabs>
      ) : (
        <p className="text-gray-500 text-center">No notifications available.</p>
      )}
 
      {/* PDF Modal Popup */}
      <PdfModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
    </div>
  );
};
 
export default Notifications;
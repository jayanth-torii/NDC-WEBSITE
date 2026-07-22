"use client";
import React, { useState, useRef } from "react";
import { Tabs } from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PdfModal from "../PdfModal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

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
    <Reveal className="w-[90%] mx-auto px-2 py-8 relative">
      <SectionHeading title={notificationsData.title} className="mb-5" />

      {Object.keys(notificationsData.NotificationTabs).length > 0 ? (
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
          <Tabs.List className="flex flex-wrap space-x-6 border-b-4 border-[#EEEEEE] mb-4">
            {notificationsData.NotificationTabs.map((tab: any, idx: number) => (
              <Tabs.Tab
                key={idx}
                value={tab.tabName}
                style={{
                  fontSize: "1.1rem",
                  fontWeight: activeTab === tab.tabName ? 700 : 500,
                  color: activeTab === tab.tabName ? "#0e2455" : "#53545b",
                  borderBottom: activeTab === tab.tabName ? "4px solid #f6872a" : "none",
                  marginLeft: "-10px",
                  marginBottom: "-4px",
                  transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
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
                className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ChevronLeft size={20} />
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
                    <SwiperSlide key={index} className="flex justify-center items-center py-2">
                      <Card
                        className="w-[320px] h-[150px] m-auto p-4 flex flex-col justify-between"
                        accent="orange-left"
                      >
                        <p className="text-md text-navy mb-2 line-clamp-2 text-center font-medium">
                          {notification?.title}
                        </p>
                        <Button
                          onClick={() => openPdf(notification.pdf, notification.link)}
                          variant="primary"
                          className="!px-4 !py-2 !text-sm w-full"
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
                className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          ) : (
            <p className="text-body-gray text-center mt-4">No notifications available for this category.</p>
          )}
        </Tabs>
      ) : (
        <p className="text-body-gray text-center">No notifications available.</p>
      )}

      {/* PDF Modal Popup */}
      <PdfModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
    </Reveal>
  );
};

export default Notifications;

"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Download, Megaphone, Bell, Calendar, Briefcase } from "lucide-react";
import PdfModal from "../PdfModal";
import { Reveal } from "@/components/ui/Reveal";

const Notifications = ({ data }: any) => {
  const notificationsData = data;
  const tabs = notificationsData?.NotificationTabs || [];
  const [activeTab, setActiveTab] = useState<string | null>(tabs[0]?.tabName || null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const openPdf = (pdf: string, link: string) => {
    if (pdf && pdf !== "#" && pdf !== "") {
      setSelectedPdf(pdf);
    } else if (link && link !== "#" && link !== "") {
      window.open(link, "_blank");
    }
  };

  const activeTabData = tabs.find((tab: any) => tab.tabName === activeTab)?.Data || [];

  return (
    <section className="relative py-20 bg-white overflow-hidden font-sans">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-12 left-8 opacity-30 pointer-events-none hidden md:block">
        <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-notif" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#F6872A" />
          </pattern>
          <rect x="0" y="0" width="40" height="40" fill="url(#dots-notif)" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 pointer-events-none opacity-10 hidden md:block">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="0" r="100" stroke="#F6872A" strokeWidth="1" />
          <circle cx="400" cy="0" r="200" stroke="#F6872A" strokeWidth="1" />
          <circle cx="400" cy="0" r="300" stroke="#F6872A" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1300px] relative z-10">
        
        {/* Header and Tabs */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 relative z-20">
            {/* Header Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Bell size={18} className="text-[#F6872A]" />
                <span className="text-[#F6872A] font-bold text-sm tracking-widest uppercase">STAY UPDATED</span>
                <div className="h-px bg-[#F6872A] w-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a3668] tracking-tight mb-3">
                Notifications
              </h2>
              <p className="text-gray-500 font-medium text-[15px]">
                {notificationsData?.subtitle || "Latest announcements, circulars, and placement notifications."}
              </p>
            </div>

            {/* Pill Toggle Tabs */}
            {tabs.length > 0 && (
              <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-1.5 rounded-full inline-flex flex-wrap md:flex-nowrap gap-1">
                {tabs.map((tab: any, idx: number) => {
                  const isActive = activeTab === tab.tabName;
                  const isPlacement = tab.tabName.toLowerCase().includes('placement');
                  const Icon = isPlacement ? Briefcase : Megaphone;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(tab.tabName)}
                      className={`flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#1a3668] text-white shadow-md"
                          : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#1a3668]"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-white" : "text-gray-400"} />
                      {tab.tabName}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </Reveal>

        {/* Carousel Section */}
        {tabs.length > 0 ? (
          activeTabData.length > 0 ? (
            <Reveal key={activeTab} delay={0.1}>
              <div className="relative pb-16">
                
                {/* Left/Right Nav Arrows */}
                <button
                  className="hidden xl:flex absolute left-[-24px] top-[40%] -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white text-[#1a3668] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-[#F6872A] hover:text-white transition-colors border border-gray-100"
                  onClick={() => swiperRef.current?.slidePrev()}
                  aria-label="Previous notification"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  className="hidden xl:flex absolute right-[-24px] top-[40%] -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white text-[#1a3668] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-[#F6872A] hover:text-white transition-colors border border-gray-100"
                  onClick={() => swiperRef.current?.slideNext()}
                  aria-label="Next notification"
                >
                  <ChevronRight size={24} />
                </button>

                <Swiper
                  key={activeTab}
                  modules={[Navigation, Autoplay, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  onSwiper={(swiperInstance) => (swiperRef.current = swiperInstance)}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  loop={activeTabData.length > 3}
                  pagination={{
                    clickable: true,
                    el: '.custom-notif-pagination',
                    bulletClass: 'swiper-pagination-bullet !w-2.5 !h-2.5 !bg-gray-300 !opacity-100 transition-all duration-300',
                    bulletActiveClass: '!w-6 !bg-[#F6872A] !rounded-full',
                  }}
                  breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="!px-4 !py-4 -mx-4"
                >
                  {activeTabData.map((notification: any, index: number) => {
                    const isOrange = index % 2 !== 0;
                    return (
                      <SwiperSlide key={index} className="h-auto">
                        <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 h-full flex flex-col group hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-shadow duration-300">
                          
                          {/* Top Background Pattern & Icon */}
                          <div className={`relative w-full h-[200px] shrink-0 flex flex-col items-center justify-center overflow-hidden ${isOrange ? 'bg-gradient-to-br from-[#F6872A] to-[#f9a45e]' : 'bg-gradient-to-br from-[#1a3668] to-[#2d4b8e]'}`}>
                            
                            {/* Subtle Grid Overlay */}
                            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay">
                              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <pattern id={`smallGrid${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="1" />
                                </pattern>
                                <rect width="100%" height="100%" fill={`url(#smallGrid${index})`} />
                              </svg>
                            </div>

                            {/* Badge */}
                            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/20">
                              <Megaphone size={12} />
                              NOTICE
                            </div>

                            {/* Center Document Icon Illustration */}
                            <div className="relative z-10 flex flex-col items-center mt-2 group-hover:-translate-y-2 transition-transform duration-500">
                              <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                              {/* Sparkles */}
                              <svg className="absolute -top-2 -right-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L12 8M12 22L12 16M2 12L8 12M22 12L16 12M4.92893 4.92893L9.17157 9.17157M19.0711 19.0711L14.8284 14.8284M4.92893 19.0711L9.17157 14.8284M19.0711 4.92893L14.8284 9.17157" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                              {/* Glowing oval shadow */}
                              <div className="w-16 h-1.5 bg-white/20 rounded-[100%] mt-3 blur-[2px]" />
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="flex flex-col flex-1 p-6 md:p-8 relative bg-white">
                            
                            {/* Date */}
                            <div className="flex items-center gap-2 mb-3">
                              <Calendar size={16} className="text-[#F6872A]" />
                              <span className="text-gray-500 text-sm font-medium">
                                {notification?.date || (index === 0 ? "May 20, 2023" : index === 1 ? "June 01, 2023" : "June 05, 2023")}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg md:text-xl font-extrabold text-[#1a3668] leading-tight line-clamp-2 min-h-[3rem] mb-3">
                              {notification?.title || "Notification Title"}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2 mb-8">
                              {notification?.description || "This is a placeholder description for the notification card. Please update with actual content."}
                            </p>

                            {/* Footer Button */}
                            <button
                              onClick={() => openPdf(notification.pdf, notification.link)}
                              className="mt-auto bg-[#F6872A] hover:bg-[#e0751f] text-white font-bold text-[14px] px-6 py-2.5 rounded-full shadow-[0_4px_12px_rgba(246,135,42,0.3)] transition-all flex items-center justify-center gap-2 w-fit"
                            >
                              View Notification
                              <Download size={16} strokeWidth={2.5} />
                            </button>
                          </div>
                          
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                
                {/* Custom Pagination Container */}
                <div className="custom-notif-pagination flex justify-center gap-2 mt-8" />
              </div>
            </Reveal>
          ) : (
            <p className="text-gray-500 text-center py-8 font-medium">No notifications available for this category.</p>
          )
        ) : (
          <p className="text-gray-500 text-center py-8 font-medium">No notifications available.</p>
        )}

        <PdfModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
      </div>
    </section>
  );
};

export default Notifications;

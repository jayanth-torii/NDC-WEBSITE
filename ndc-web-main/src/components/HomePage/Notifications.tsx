"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, FileText, Download, BellRing } from "lucide-react";
import PdfModal from "../PdfModal";
import SectionHeading from "@/components/ui/SectionHeading";
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
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#FAFBFF]">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-navy/[0.03] to-transparent pointer-events-none" />
      <div className="absolute -left-[10%] top-[20%] w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange/10 text-orange mb-4">
              <BellRing size={24} />
            </div>
            <SectionHeading title={notificationsData?.title || "Notifications"} className="justify-center" />
          </div>
        </Reveal>

        {tabs.length > 0 ? (
          <div className="flex flex-col items-center">
            
            {/* Premium Segmented Tabs */}
            <Reveal delay={0.1} className="w-full flex justify-center mb-10">
              <div className="inline-flex flex-wrap items-center justify-center p-1.5 bg-white/80 backdrop-blur-md rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-navy/5">
                {tabs.map((tab: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(tab.tabName)}
                    className={`relative px-6 py-3 text-sm md:text-[15px] font-bold rounded-[16px] transition-all duration-300 ${
                      activeTab === tab.tabName
                        ? "text-white shadow-md"
                        : "text-navy/60 hover:text-navy hover:bg-navy/5"
                    }`}
                  >
                    {activeTab === tab.tabName && (
                      <span className="absolute inset-0 bg-navy rounded-[16px] -z-10" />
                    )}
                    {tab.tabName}
                  </button>
                ))}
              </div>
            </Reveal>

            {activeTabData.length > 0 ? (
              <Reveal delay={0.2} className="relative w-full">
                {/* Navigation Arrows */}
                <div className="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 z-20">
                  <button
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-navy shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-card-border hover:bg-navy hover:text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-navy/20"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous notification"
                  >
                    <ChevronLeft size={24} />
                  </button>
                </div>

                <div className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 z-20">
                  <button
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-navy shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-card-border hover:bg-navy hover:text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-navy/20"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next notification"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Swiper Slider */}
                <Swiper
                  key={activeTab}
                  modules={[Navigation, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={1}
                  onSwiper={(swiperInstance) => (swiperRef.current = swiperInstance)}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  loop={activeTabData.length > 3}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  className="px-2 py-6"
                >
                  {activeTabData.map((notification: any, index: number) => (
                    <SwiperSlide key={index} className="h-auto">
                      <div 
                        onClick={() => openPdf(notification.pdf, notification.link)}
                        className="group relative flex flex-col h-full bg-white rounded-[24px] p-6 cursor-pointer border border-transparent hover:border-orange/30 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(224,117,32,0.12)] transition-all duration-300 ease-[var(--ease-editorial)] hover:-translate-y-2"
                      >
                        {/* Orange Left Accent */}
                        <div className="absolute left-0 top-6 bottom-6 w-[4px] bg-gradient-to-b from-orange to-orange/50 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="w-12 h-12 rounded-2xl bg-[#FFF5EE] text-orange flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                          <FileText size={22} strokeWidth={2.5} />
                        </div>
                        
                        <h4 className="text-[16px] md:text-[17px] text-navy font-bold leading-snug mb-4 line-clamp-3 group-hover:text-orange transition-colors duration-300">
                          {notification?.title}
                        </h4>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-navy/5">
                          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-navy transition-colors duration-300">
                            View Document
                          </span>
                          <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center text-gray-400 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                            <Download size={14} strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Reveal>
            ) : (
              <div className="bg-white p-12 rounded-3xl shadow-sm text-center w-full max-w-2xl border border-card-border mt-8">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No notifications available for this category.</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center font-medium">No notifications available.</p>
        )}

        {/* PDF Modal Popup */}
        <PdfModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
      </div>
    </section>
  );
};

export default Notifications;

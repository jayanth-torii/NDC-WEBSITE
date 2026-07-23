"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, FileText, Download, Megaphone } from "lucide-react";
import PdfModal from "../PdfModal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
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
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <SectionHeading
              eyebrow="Stay Updated"
              title={notificationsData?.title || "Notifications"}
              subtitle="Latest announcements, circulars, and placement notifications."
            />

            {tabs.length > 0 && (
              <div className="inline-flex flex-wrap gap-1.5 bg-surface-tint p-1.5 rounded-2xl w-fit">
                {tabs.map((tab: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(tab.tabName)}
                    className={`whitespace-nowrap px-4 py-2 text-sm font-bold rounded-xl transition-all duration-250 ease-[var(--ease-editorial)] ${
                      activeTab === tab.tabName
                        ? "bg-navy text-white shadow-sm"
                        : "text-body-gray hover:text-navy"
                    }`}
                  >
                    {tab.tabName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {tabs.length > 0 ? (
          activeTabData.length > 0 ? (
            <Reveal key={activeTab} delay={0.1} className="relative">
              <button
                className="hidden md:flex absolute left-[-16px] top-[40%] -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[var(--ease-editorial)] hover:bg-navy hover:text-white"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous notification"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                className="hidden md:flex absolute right-[-16px] top-[40%] -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white border border-card-border text-navy shadow-[var(--shadow-card)] transition-all duration-250 ease-[var(--ease-editorial)] hover:bg-navy hover:text-white"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next notification"
              >
                <ChevronRight size={18} />
              </button>

              <Swiper
                key={activeTab}
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                onSwiper={(swiperInstance) => (swiperRef.current = swiperInstance)}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                loop={activeTabData.length > 3}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="!px-1 !py-2"
              >
                {activeTabData.map((notification: any, index: number) => (
                  <SwiperSlide key={index}>
                    <Card className="h-full flex flex-col overflow-hidden !p-0" accent="orange-left">
                      <div className="w-full h-36 relative overflow-hidden shrink-0 bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center">
                        <div className="absolute inset-0 bg-dot-grid-light opacity-[0.08]" aria-hidden="true" />
                        <FileText size={44} strokeWidth={1.5} className="text-white/25" />
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/15">
                          <Megaphone size={10} />
                          Notice
                        </span>
                      </div>

                      <div className="flex flex-col flex-1 p-5">
                        <h3 className="text-[15px] font-bold mb-4 text-navy leading-snug line-clamp-2 min-h-[2.6rem]">
                          {notification?.title}
                        </h3>
                        <Button
                          onClick={() => openPdf(notification.pdf, notification.link)}
                          variant="primary"
                          className="!px-4 !py-2 !text-xs w-fit mt-auto"
                        >
                          VIEW NOTIFICATION
                          <Download size={14} />
                        </Button>
                      </div>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Reveal>
          ) : (
            <p className="text-body-gray text-center py-8">No notifications available for this category.</p>
          )
        ) : (
          <p className="text-body-gray text-center py-8">No notifications available.</p>
        )}

        <PdfModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
      </div>
    </section>
  );
};

export default Notifications;

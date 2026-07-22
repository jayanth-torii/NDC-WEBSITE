'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PdfModal from '../PdfModal';
import Card from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';

const ViewEditions = ({ data }: any) => {
  const { title, description, buttons, Editions } = data;
  const programs = Editions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerSlide, setImagesPerSlide] = useState(2);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    const updateImagesPerSlide = () => {
      setImagesPerSlide(window.innerWidth < 768 ? 1 : 2);
    };
    updateImagesPerSlide();
    window.addEventListener('resize', updateImagesPerSlide);
    return () => window.removeEventListener('resize', updateImagesPerSlide);
  }, []);

  const totalSlides = Math.ceil(programs?.length / imagesPerSlide);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const openPdf = (pdfPath: string) => setSelectedPdf(pdfPath);
  const closePdf = () => setSelectedPdf(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5-second auto-scroll
    return () => clearInterval(interval);
  }, [currentIndex]);

  const fallbackImage = "/uploads/dummyimage_20de454cf2.png"; // use your actual fallback image

  const navBtnGhost =
    "cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-[10px] border-2 border-navy px-5 py-2 text-sm font-bold text-navy transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white md:text-base";
  const navBtnPrimary =
    "cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-orange px-6 py-2 text-sm font-bold text-white shadow-[0_10px_24px_rgba(246,135,42,0.28)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-orange-dark hover:-translate-y-0.5 md:text-base";

  return (
    <Reveal className="flex w-full flex-col items-stretch gap-8 mb-20 md:flex-row md:mb-40">
      {/* Left Section */}
      <div className="flex w-full flex-col justify-between rounded-[18px] bg-surface-light p-8 text-center md:w-1/3 md:p-12 md:text-left">
        <div>
          <h2 className="text-2xl font-extrabold text-navy md:mb-8 md:text-3xl">{title}</h2>
          <p className="mt-4 mb-5 text-justify leading-relaxed text-body-gray md:mb-10">{description}</p>
        </div>
        <div className="hidden justify-start gap-4 md:flex">
          <button onClick={prevSlide} className={navBtnGhost}>
            <ChevronLeft size={16} /> {buttons[0]}
          </button>
          <button onClick={nextSlide} className={navBtnPrimary}>
            {buttons[1]} <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Right Section - Carousel */}
      <div className="w-full overflow-hidden md:w-2/3">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="flex min-w-full flex-wrap justify-center gap-5">
              {programs
                ?.slice(slideIndex * imagesPerSlide, slideIndex * imagesPerSlide + imagesPerSlide)
                .map((program: any, index: number) => (
                  <Card
                    key={index}
                    className="h-auto w-[90%] max-w-[500px] overflow-hidden sm:w-1/2 md:w-[45%] lg:w-[48%]"
                  >
                    <Image
                      src={program.imageUrl || fallbackImage}
                      alt={program.title}
                      width={500}
                      height={350}
                      className="h-[250px] w-full object-contain sm:h-[300px] md:h-[350px]"
                    />
                    <div className="p-4">
                      <p className="text-md text-left font-semibold text-orange md:text-xl">
                        {program.title}
                      </p>
                      <p className="text-left text-base text-navy md:text-lg">{program.date}</p>
                      <button
                        className="mt-4 w-full cursor-pointer rounded-[10px] bg-orange px-3 py-2.5 text-sm font-bold text-white transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-orange-dark md:text-base"
                        onClick={() => openPdf(program.pdfUrl)}
                      >
                        VIEW NOW
                      </button>
                    </div>
                  </Card>
                ))}
            </div>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="mt-6 flex justify-center gap-4 md:hidden">
          <button onClick={prevSlide} className={navBtnGhost}>
            <ChevronLeft size={16} /> {buttons[0]}
          </button>
          <button onClick={nextSlide} className={navBtnPrimary}>
            {buttons[1]} <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* PDF Modal Popup */}
      <PdfModal pdfUrl={selectedPdf} onClose={closePdf} />
    </Reveal>
  );
};

export default ViewEditions;

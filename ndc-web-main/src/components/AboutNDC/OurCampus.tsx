"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const OurCampus = ({ data }: { data: any }) => {
  const { campuses = [], title: sectionTitle } = data || {};

  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedCampus = campuses[currentIndex] || {};

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % campuses.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + campuses.length) % campuses.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2500);
    return () => clearInterval(interval);
  }, [campuses.length]);

  if (!campuses.length) return null;

  return (
    <div className="flex flex-col md:flex-row items-start w-full mb-20">
      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0E2455] hidden md:block mb-10">{sectionTitle}</h1>
        <h6 className="text-lg font-semibold text-[#0E2455] mb-2 text-left">{selectedCampus.subtitle}</h6>
        <p className="text-justify text-[#434554] mt-3">{selectedCampus.collegeDescription}</p>
        <button className="mt-6 px-10 py-2 bg-[#0E2455] text-white w-full md:w-[50%]">
          <a href={selectedCampus?.link} target="_blank" rel="noopener noreferrer">
            KNOW MORE
          </a>
        </button>
      </div>

      {/* Carousel Section */}
      <div className="w-full md:w-1/2 relative pb-12 order-first md:order-last overflow-hidden">
        <h1 className="text-3xl text-center md:hidden mb-5 font-bold text-[#0E2455]">
          {sectionTitle}
        </h1>

        <div className="relative bg-[#FFB300] rounded-lg">
          <div
            className="relative w-full h-[300px] md:h-[400px] flex transition-transform duration-500 ease-in-out bottom-3"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {campuses?.map((campus: any, index: number) => (
              <div key={index} className="relative flex-none w-full md:w-[100%] pr-4">
                <Image
                  src={campus?.image}
                  alt={campus?.collegeName}
                  width={600}
                  height={400}
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow-lg"
                />
                <div className="w-[98%] h-[40%] absolute bottom-0 bg-[#1818186B] p-3 rounded-md shadow-lg">
                  <h1 className="text-xl text-white font-bold text-left">{campus?.collegeName}</h1>
                  <p className="text-lg text-white text-left">{campus?.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Dots */}
        <div className="flex justify-center mt-4 md:hidden">
          {campuses?.map((_:any, index:any) => (
            <button
              key={index}
              className={`w-3 h-3 mx-1 rounded-full ${
                currentIndex === index ? "bg-[#F6872A] w-8" : "bg-gray-400"
              } transition-all`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Desktop Arrows */}
        <div className="hidden md:flex justify-center mt-6 space-x-4">
          <button
            className="cursor-pointer bg-[#0E2455] text-white p-3 rounded-full transition-all"
            onClick={prevSlide}
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            className="cursor-pointer bg-[#0E2455] text-white p-3 rounded-full transition-all"
            onClick={nextSlide}
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurCampus;

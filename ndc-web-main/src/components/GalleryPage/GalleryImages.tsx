"use client";

import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const GalleryImages = ({ imageData = {} }: any) => {
  const [activeTab, setActiveTab] = useState("ALL");
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [imageAspectRatios, setImageAspectRatios] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const tabs = ["ALL", ...Object.keys(imageData).filter((key) => key !== "ALL")];

  useEffect(() => {
    const fetchImageAspectRatios = async () => {
      const ratios: Record<string, number> = {};
      if (!imageData || Object.keys(imageData).length === 0) return;

      for (const tab of Object.keys(imageData)) {
        for (const src of imageData[tab] ?? []) {
          const img = new Image();
          img.src = src;
          await new Promise<void>((resolve) => {
            img.onload = () => {
              ratios[src] = img.width / img.height;
              resolve();
            };
          });
        }
      }
      setImageAspectRatios(ratios);
    };
    fetchImageAspectRatios();
  }, [imageData]);

  useEffect(() => {
    const checkScrollable = () => {
      if (tabsRef.current) {
        setIsScrollable(tabsRef.current.scrollWidth > tabsRef.current.clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 150;
      tabsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  let displayedImages: string[] = [];
  if (activeTab === "ALL") {
    displayedImages = Object.keys(imageData)
      .filter((key) => key !== "ALL")
      .flatMap((tab) => imageData[tab] ?? []);
  } else {
    displayedImages = imageData[activeTab] ?? [];
  }

  const openPopup = (index: number) => {
    setSelectedImage(displayedImages[index]);
    setCurrentIndex(index);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setSelectedImage(displayedImages[currentIndex - 1]);
    }
  };

  const nextImage = () => {
    if (currentIndex < displayedImages.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedImage(displayedImages[currentIndex + 1]);
    }
  };

  return (
    <div className="mb-20">
      <div className="relative flex items-center w-full border-b border-gray-300 mb-10 overflow-hidden">
        <button
          className="absolute left-0 z-10 p-1 md:p-2 bg-white shadow-md rounded-full"
          onClick={() => scrollTabs("left")}
        >
          <FaChevronLeft size={20} color="#003333" />
        </button>

        <div
          ref={tabsRef}
          className="flex px-10 border-b-2 border-gray-200 transition-all duration-300 space-x-2 md:space-x-6 overflow-hidden"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[#003333] whitespace-nowrap px-2 md:px-4 py-2 text-xl md:text-2xl !font-semibold relative ${
                activeTab === tab
                  ? "after:absolute after:left-0 after:bottom-0 after:w-full after:h-[5px] after:bg-orange-500"
                  : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          className="absolute right-0 z-10 p-1 md:p-2 bg-white shadow-md rounded-full"
          onClick={() => scrollTabs("right")}
        >
          <FaChevronRight size={20} color="#003333" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {displayedImages.map((src: string, index: number) => {
          const aspectRatio = imageAspectRatios[src] || 1;
          return (
            <div
              key={index}
              className="relative w-full overflow-hidden cursor-pointer"
              style={{ height: `calc(24.6703vw)` }}
              onClick={() => openPopup(index)}
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover shadow-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          <button className="absolute top-5 z-10 right-5 text-white text-3xl" onClick={closePopup}>
            <FaTimes />
          </button>
          <div className="relative flex items-center w-full max-w-4xl">
            <button
              className="absolute left-2 md:left-8 text-white text-2xl md:text-3xl p-2 md:p-3 bg-gray-700 bg-opacity-70 rounded-full shadow-lg"
              onClick={prevImage}
              disabled={currentIndex === 0}
            >
              <FaChevronLeft />
            </button>
            
            <img src={selectedImage} alt="Popup" className="max-w-4xl max-h-[80vh] m-auto rounded-md shadow-lg" />
            
            <button
              className="absolute right-2 md:right-8 text-white text-2xl md:text-3xl p-2 md:p-3 bg-gray-700 bg-opacity-70 rounded-full shadow-lg"
              onClick={nextImage}
              disabled={currentIndex === displayedImages.length - 1}
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="mt-4 flex space-x-2 overflow-x-auto">
            {displayedImages.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt="Thumbnail"
                className={`w-16 h-16 cursor-pointer border-2 ${selectedImage === thumb ? "border-orange-500" : "border-gray-300"}`}
                onClick={() => openPopup(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryImages;

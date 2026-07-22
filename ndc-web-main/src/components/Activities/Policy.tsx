"use client";

import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import StudentCenterContent from "@/app/Data/StudentCenterContent";

const Policy = () => {
  const { title, sections } = StudentCenterContent.policyAndComposition;
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const openPdf = (pdf: string) => {
    setSelectedPdf(pdf);
  };

  const closePdf = () => {
    setSelectedPdf(null);
  };

  return (
    <div className="mb-10 md:mb-20">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#003333]">{title}</h2>

      {/* Policy & Composition Sections */}
      <div className="space-y-4">
        {sections.length > 0 ? (
          sections.map((section) => (
            <div
              key={section.title}
              className="flex justify-between items-center bg-[#F6F6F6] px-4 py-3 duration-200"
            >
              <span className="text-[#0e2455] font-medium text-lg">{section.title}</span>
              <button
                className="flex items-center border px-5 py-2 text-[#0e2455] hover:bg-[#0E2455] hover:text-[white] transition"
                onClick={() => openPdf(section.pdf)}
              >
                View <AiOutlineArrowRight className="ml-2" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-[#0E2455]text-lg text-center">No links available.</p>
        )}
      </div>

      {/* PDF Modal Popup */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl w-full max-w-6xl h-auto shadow-xl relative flex flex-col"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
              onClick={closePdf}
            >
              <IoClose size={24} />
            </button>

            {/* PDF Viewer */}
            <iframe
              src={selectedPdf}
              className="w-full h-full border-none rounded-lg"
              style={{
                height: "90vh",
                minHeight: "400px",
                maxHeight: "95vh",
                overflow: "auto",
              }}
            ></iframe>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Policy;

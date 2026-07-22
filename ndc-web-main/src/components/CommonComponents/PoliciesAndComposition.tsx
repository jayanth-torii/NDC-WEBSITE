"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Button from "@/components/ui/Button";

// Define Prop Types
interface PolicyData {
  title: string;
  description: string;
  imageUrl: string;
  policyPdf?: string;
  compositionPdf?: string;
  policybutton?: string;
  compositionbutton?: string;
}

interface Props {
  data?: PolicyData;
}

export default function PolicyAndComposition({ data }: Props) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const openPdf = (pdf?: string) => {
    if (pdf) {
      console.log("Opening PDF:", pdf);
      setSelectedPdf(pdf);
    } else {
      console.warn("No PDF URL provided");
    }
  };

  const closePdf = () => setSelectedPdf(null);

  return (
    <div>
      <div className="items-center gap-6 mb-20 flex flex-col md:flex-row">
        {/* Text Section */}
        <div className="space-y-4 rounded-[18px] border border-card-border bg-surface-light p-6 h-74 md:h-80 w-full md:w-[40%] shadow-[var(--shadow-card)]">
          <h2 className="text-3xl font-extrabold text-navy">{data?.title || "Default Title"}</h2>
          <p className="md:text-lg lg:text-xl text-body-gray mb-5 leading-[1.65]">{data?.description || "Default Description"}</p>

          {/* Buttons */}
          <div className="flex flex-col space-y-4 w-full sm:w-1/2 md:w-4/5 lg:w-3/5 whitespace-nowrap">
            <Button variant="ghost" onClick={() => openPdf(data?.policyPdf)}>
                {data?.policybutton}
            </Button>
            <Button variant="primary" onClick={() => openPdf(data?.compositionPdf)}>
                {data?.compositionbutton}
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-64 md:h-80 w-full md:w-[60%] overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
          {data?.imageUrl ? (
            <Image src={data.imageUrl} alt="Policy Image" fill objectFit="cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-tint text-body-gray">
              No Image Available
            </div>
          )}
        </div>
      </div>

      {/* PDF Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-0 rounded-2xl w-full max-w-6xl h-auto shadow-xl relative flex flex-col"
          >
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
              onClick={closePdf}
            >
              <IoClose size={24} />
            </button>
            {selectedPdf ? (
              <iframe
                src={selectedPdf}
                className="w-full h-full border-none rounded-lg"
                style={{ height: "100vh", minHeight: "400px", maxHeight: "95vh", overflow: "auto" }}
               
              />
            ) : (
              <p className="text-center text-red-500">PDF failed to load</p>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

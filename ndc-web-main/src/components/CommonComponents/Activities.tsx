"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";

interface ActivitiesSectionProps {
    title: string;
    activities: { name: string; pdf: string }[];
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ title, activities }) => {
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    const openPdf = (pdf: string) => {
        setSelectedPdf(pdf);
    };

    const closePdf = () => {
        setSelectedPdf(null);
    };

    return (
        <div className="mb-10 md:mb-20">
            <h2 className="text-xl md:text-2xl font-bold text-[#0E2455] mb-4">{title}</h2>

            <div className="bg-white space-y-5">
                {activities.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border border-[#9E9E9E]">
                        <span className="text-[#0E2455] font-medium text-lg">{activity.name}</span>
                        <button
                            className="flex items-center border px-4 py-1 text-[#0E2455] hover:bg-[#0E2455] hover:text-white transition"
                            onClick={() => openPdf(activity.pdf)}
                        >
                            View <AiOutlineArrowRight className="ml-2" />
                        </button>
                    </div>
                ))}
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

export default ActivitiesSection;

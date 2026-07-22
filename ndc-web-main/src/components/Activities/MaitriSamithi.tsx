// "use client";
// import React from "react";
// import StudentCenterContent from "@/app/Data/StudentCenterContent";
// // import { newsletterData } from "../../app/Data/AlumniContent"; // Import data
// import Image from "next/image";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// export default function MaitriSamithi() {

//     const newsletterData = StudentCenterContent?.newsletterData
//     const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
//     const openPdf = (pdf: string) => setSelectedPdf(pdf);
//     const closePdf = () => setSelectedPdf(null);
//     return (
//         <div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 mb-20">
//                 <div className="space-y-4 bg-[#F6F6F6] p-6 h-74 md:h-80">
//                     <h2 className="text-2xl md:text-3xl font-bold text-[#003333]">{newsletterData?.title}</h2>
//                     <p className="text-justify text-[#0E2455] mb-5">{newsletterData?.description}</p>
//                     <button className="px-6 py-3 bg-[#0E2455] text-white font-semibold" onClick={()=>openPdf(newsletterData?.pdf)}>
//                         {newsletterData?.buttonText}
//                     </button>
//                 </div>
//                 <div className="relative w-full h-64 md:h-80">
//                     <Image
//                         src={newsletterData?.imageUrl}
//                         alt="Newsletter Event"
//                         layout="fill"
//                         objectFit="cover"
//                     />
//                 </div>
//             </div>
//             {selectedPdf && (
//                 <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex justify-center items-center z-50 p-4">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ duration: 0.3 }}
//                         className="bg-white p-0 rounded-2xl w-full max-w-6xl h-auto shadow-xl relative flex flex-col"
//                     >
//                         <button
//                             className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
//                             onClick={closePdf}
//                         >
//                             <IoClose size={24} />
//                         </button>
//                         <iframe
//                             src={selectedPdf}
//                             className="w-full h-full border-none rounded-lg"
//                             style={{ height: "100vh", minHeight: "400px", maxHeight: "95vh", overflow: "auto" }}
//                         ></iframe>
//                     </motion.div>
//                 </div>
//             )}
//         </div>
//     );
// }
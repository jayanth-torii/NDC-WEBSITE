// "use client";

// import React, {useState, useEffect, Suspense} from "react";
// import { useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { IoClose } from "react-icons/io5";
// import PdfModal from "../PdfModal";

// import axios from "axios";
// import { BASE_URL } from "@/config/apiService";
// import { FacultyContent } from "@/app/Data/DepartmentsContent/FacultyContent";


// const DepartmentFacultyOld = () => {

//   // FETCHING API'S DATA
//   // const [facultyData, setFacultyData] = useState(null);
//   // useEffect(() => {
//   //   const fetchFacultyContent = async () => {
//   //     try {
//   //       const response = await axios.get(`${BASE_URL}/faculty-contents`);
//   //       setFacultyData(response?.data);
//   //     //  console.log("Fetched  FacultyData Data:=====>", response.data);
//   //     } catch (error) {
//   //       console.error("Error fetching FacultyData data:", error);
//   //     }
//   //   };
//   //   fetchFacultyContent();
//   // }, []);


//   const searchParams = useSearchParams();
//   const programme = searchParams.get("programme") || "";
//   const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

//   const normalizedProgramme = programme
//     .trim()
//     .toLowerCase()
//     .replace(/&/g, "and")
//     .replace(/\s+/g, " ");

//   const openPdf = (pdfUrl: string) => {
//     setSelectedPdf(pdfUrl);
//   };

//   if (!FacultyContent) {
//     return <p>Loading faculty data...</p>;
//   }
 

//   const contentMapping: Record<string, any> = {
//     "b.com": FacultyContent.BCOM,
//     "b.com-bda": FacultyContent.Bcom_BDA,
//     "bba": FacultyContent.BBA,
//     "bca": FacultyContent.BCA,
//     "b.science": FacultyContent.BScience,
//     "mba": FacultyContent.MBA,
//     "mca": FacultyContent.MCA,
//     "m.com": FacultyContent.MCom,

//   };

//   const content = contentMapping[normalizedProgramme] || [];

//   return (

// <div>
//   <h1 className="text-3xl font-bold text-[#0E2455] mb-4">DEPARTMENT FACULTIES</h1>
//   <p className="text-justify text-lg text-[#003333] mb-5">
//     NDC has a substantial number of faculty members across its various departments. The {programme} department has a team of experienced and qualified faculty members with expertise in various areas of industry. Many faculty members hold advanced degrees and are actively involved in research.
//   </p>

//   <div className="overflow-x-auto">
//     <table className="min-w-full border-collapse border border-gray-400">
//       <thead>
//         <tr className="text-sm md:text-lg bg-[#C2C0C017] text-[#003333] border-b border-gray-400 text-left">
//           <th className="p-3 border-r border-gray-400 text-lg lg:text-xl text-center">SN</th>
//           <th className="p-3 border-r border-gray-400 text-lg lg:text-xl">Name & Designation</th>
//           <th className="p-3 border-r border-gray-400 text-lg lg:text-xl">Qualification</th>
//         </tr>
//       </thead>
//       <tbody>
//         {content.map((faculty: any, index: number) => (
//           <tr
//             key={index}
//             className="text-sm md:text-base bg-[#C2C0C017] border-b border-gray-400 text-[#003333] hover:bg-gray-200"
//           >
//             <td className="py-2 md:py-5 px-3 border-r border-gray-400 text-center text-lg lg:text-xl">{index + 1}</td>
//             <td
//               onClick={() => openPdf(faculty.profilePdf)}
//               className="py-2 md:py-5 px-3 border-r border-gray-400 whitespace-nowrap text-lg lg:text-xl cursor-pointer"
//             >
//               <span className="text-[green] md:text-xl hover:underline">{faculty.name}</span>
//               <br />
//               {faculty.designation}
//             </td>
//             <td className="py-2 md:py-5 px-3 border-r border-gray-400 text-lg lg:text-xl">{faculty.qualification}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>

//   {/* PDF Modal */}
//   <PdfModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
// </div>


   

//   );
// };

// export default DepartmentFacultyOld;

"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import UpArrow from "../../../public/images/Chevron2.svg";
import DownArrow from "../../../public/images/Chevron.svg";
import { motion, AnimatePresence, cubicBezier, type Variants } from "framer-motion";
import departmentJson from "@/data-export/department/data.json";

const easeInOut = cubicBezier(0.4, 0, 0.2, 1);

const popupVariants = {
  hidden: { opacity: 0, scaleY: 0, originY: 0.5 },
  visible: {
    opacity: 1,
    scaleY: 1,
    originY: 0.5,
    transition: { duration: 0.5,   ease: easeInOut},
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    originY: 0.5,
    transition: { duration: 0.3,  ease: easeInOut },
  },
};

const getItemsPerPage = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 640 ? 3 : 6;
  }
  return 6;
};

interface FacultyDetail {
  title: string;
  content: string | string[];
}

interface Faculty {
  id: string | number;
  name: string;
  image: string;
  designation: string;
  qualification: string;
  about?: string[];
  details?: FacultyDetail[];
  listOfPublications?: {
    title: string;
    content: string[];
  };
}

// const getItemsPerPage = () => {
//   if (typeof window !== "undefined") {
//     return window.innerWidth < 640 ? 3 : 6;
//   }
//   return 6;
// };

export default function DepartmentFaculty({ haveContentCheck }: any) {
  const facultySectionRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";

  const facultyData: Record<string, any> = (departmentJson["department-faculty-member"] as any)?.data || {};
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [accordionStates, setAccordionStates] = useState<Record<string, boolean>>({});

  const normalizedProgramme = programme.toLowerCase().replace(/&/g, "and").trim();

  const contentMapping: Record<string, string> = {
    "b.com": "BCOM",
    "b.com-bda": "Bcom_BDA",
    "bba": "BBA",
    "bca": "BCA",
    "b.science": "BScience",
    "mba": "MBA",
    "mca": "MCA",
    "m.com": "MCom",
  };

  const departmentKey = contentMapping[normalizedProgramme];
  const department = departmentKey ? facultyData[departmentKey] : null;

  const content = department?.members?.map((item: Faculty, idx: number) => ({
    ...item,
    name: item.name.trim(),
    id: `${departmentKey}-${idx}`,
  })) || [];

  const totalPages = Math.ceil(content.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaculties = content.slice(startIndex, startIndex + itemsPerPage);


 haveContentCheck(!!facultyData[departmentKey]);
 

  useEffect(() => {
    setItemsPerPage(getItemsPerPage());

    const handleResize = () => {
      const updatedItems = getItemsPerPage();
      setItemsPerPage(updatedItems);
      const newTotalPages = Math.ceil(content.length / updatedItems);
      setCurrentPage((prev) => (prev > newTotalPages ? newTotalPages : prev));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [content.length]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedFaculty(null);
      setTimeout(() => {
        facultySectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const toggleAccordion = (facultyId: string | number, index: number) => {
    setAccordionStates((prev) => ({
      ...prev,
      [`${facultyId}-${index}`]: !prev[`${facultyId}-${index}`],
    }));
  };

  const renderPaginationButtons = () =>
    Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(index + 1)}
        className={`cursor-pointer px-3 py-1 rounded-lg ${
          currentPage === index + 1 ? "border border-[black] text-[#0E2455]" : ""
        }`}
      >
        {index + 1}
      </button>
    ));

  if (!department || !content.length)
    return <h1 className="text-center font-bold text-gray mt-10">No faculty data available for {programme}.</h1>;

  return (
    <div ref={facultySectionRef} className="mt-10 mb-20 text-[#003333] px-4 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">{department.title}</h1>
      <p className="text-justify mb-6">{department.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFaculties.map((faculty:any) => (
          <div
            key={faculty.id}
            className="cursor-pointer p-4 shadow-lg border rounded-md text-center transition-transform duration-300 hover:scale-105 hover:z-10 bg-white"
            onClick={() => setSelectedFaculty(faculty)}
          >
            <img
              src={faculty.image}
              alt={faculty.name}
              className="w-40 h-40 object-cover rounded-full mx-auto shadow-md shadow-gray-400"
            />
            <button className="cursor-pointer bg-[#0E2455] text-white rounded-md px-6 py-1 mt-3 hover:bg-white hover:text-[#0E2455] border border-[#0E2455]">
              READ MORE
            </button>
            <h2 className="text-xl font-semibold mt-3">{faculty.name}</h2>
            <p className="text-sm">{faculty.designation}</p>
            <p className="text-sm text-gray-600">{faculty.qualification}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
       {selectedFaculty !== null && (

          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-[999]"
            onClick={() => setSelectedFaculty(null)}
          >
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-md p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cursor-pointer absolute top-4 right-4 text-3xl font-bold text-[#0E2455] hover:text-red-500"
                onClick={() => setSelectedFaculty(null)}
              >
               X
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedFaculty.image}
                  className="w-40 h-40 border-b-2 object-cover rounded-full shadow-md shadow-gray-400"
                  alt={selectedFaculty.name}
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedFaculty.name}</h2>
                  <hr className="mb-3 w-full border-t border-black" />
                  <p className="text-sm">{selectedFaculty?.designation}</p>
                  <p className="text-sm text-gray-600">{selectedFaculty.qualification}</p>
                  {selectedFaculty?.about?.map((desc, i) => (
                    <p key={i} className="mt-2 text-sm">{desc}</p>
                  ))}
                </div>
              </div>

              {/* Publications Section */}
              {selectedFaculty &&
                selectedFaculty.listOfPublications &&
                selectedFaculty.listOfPublications.content.length > 0 && (
                <div className="rounded-lg overflow-hidden mt-6">
                  <div
                    className="flex justify-between items-center bg-[#F6F6F6] p-4 cursor-pointer"
                    onClick={() => toggleAccordion(selectedFaculty.id, 0)}
                  >
                    <h2 className="text-xl text-[#0E2455]">
                      {selectedFaculty.listOfPublications.title}
                    </h2>
                    <Image
                      src={accordionStates[`${selectedFaculty.id}-0`] ? UpArrow : DownArrow}
                      alt="toggle"
                      width={24}
                      height={24}
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: accordionStates[`${selectedFaculty.id}-0`] ? 1 : 0,
                      height: accordionStates[`${selectedFaculty.id}-0`] ? "auto" : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden bg-[#F6F6F6]"
                  >
                    <div className="p-4 overflow-x-auto">
                      <table className="w-full border border-gray-400">
                        <thead className="bg-gray-200">
                          <tr>
                            {selectedFaculty.listOfPublications.content.map((_, idx) => (
                              <th key={idx} className="border p-2">Column {idx + 1}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-center">
                            {selectedFaculty.listOfPublications.content.map((item, idx) => (
                              <td key={idx} className="border p-2">{item}</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Other Details */}
              {selectedFaculty.details?.map(({ title, content }, index) => (
                <div key={index + 1} className="rounded-lg overflow-hidden mt-6">
                  <div
                    className="flex justify-between items-center bg-[#F6F6F6] p-4 cursor-pointer"
                    onClick={() => toggleAccordion(selectedFaculty.id, index + 1)}
                  >
                    <h2 className="text-xl text-[#0E2455]">{title}</h2>
                    <Image
                      src={
                        accordionStates[`${selectedFaculty.id}-${index + 1}`]
                          ? UpArrow
                          : DownArrow
                      }
                      alt="toggle"
                      width={24}
                      height={24}
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: accordionStates[`${selectedFaculty.id}-${index + 1}`] ? 1 : 0,
                      height: accordionStates[`${selectedFaculty.id}-${index + 1}`]
                        ? "auto"
                        : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden bg-[#F6F6F6]"
                  >
                    <div className="p-4">
                      {Array.isArray(content)
                        ? content.map((line, i) => (
                            <p key={i} className="text-sm text-[#003333] mb-2">{line}</p>
                          ))
                        : <p className="text-sm text-[#003333] mb-2">{content}</p>}
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center sm:justify-between items-center mt-12 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer px-2 sm:px-4 text-sm py-2 border border-[#000000]"
        >
          PREVIOUS PAGE
        </button>
        <div className="hidden sm:flex flex-wrap gap-2">{renderPaginationButtons()}</div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer px-2 sm:px-4 text-sm py-2 border border-[#000000]"
        >
          NEXT PAGE
        </button>
      </div>
    </div>
  );
}

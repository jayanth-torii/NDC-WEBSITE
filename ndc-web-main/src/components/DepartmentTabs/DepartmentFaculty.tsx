"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { ChevronDown, User, X } from "lucide-react";
import departmentJson from "@/data-export/department/data.json";
import Button from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const FacultyAvatar = ({
  image,
  name,
  className,
}: {
  image?: string;
  name: string;
  className: string;
}) =>
  image ? (
    <img src={image} alt={name} className={`${className} object-cover`} />
  ) : (
    <div
      className={`${className} bg-surface-tint flex items-center justify-center text-navy`}
    >
      <User size={36} strokeWidth={1.5} />
    </div>
  );

const easeInOut = cubicBezier(0.4, 0, 0.2, 1);

const popupVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeInOut },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.25, ease: easeInOut },
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

export default function DepartmentFaculty({ haveContentCheck }: any) {
  const facultySectionRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";

  const facultyData: Record<string, any> =
    (departmentJson["department-faculty-member"] as any)?.data || {};
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [accordionStates, setAccordionStates] = useState<Record<string, boolean>>(
    {}
  );

  const normalizedProgramme = programme.toLowerCase().replace(/&/g, "and").trim();

  const contentMapping: Record<string, string> = {
    "b.com": "BCOM",
    "b.com-bda": "Bcom_BDA",
    bba: "BBA",
    bca: "BCA",
    "b.science": "BScience",
    mba: "MBA",
    mca: "MCA",
    "m.com": "MCom",
  };

  const departmentKey = contentMapping[normalizedProgramme];
  const department = departmentKey ? facultyData[departmentKey] : null;

  const content =
    department?.members?.map((item: Faculty, idx: number) => ({
      ...item,
      name: item.name.trim(),
      id: `${departmentKey}-${idx}`,
    })) || [];

  const totalPages = Math.ceil(content.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaculties = content.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    haveContentCheck(!!facultyData[departmentKey]);
  }, [facultyData, departmentKey, haveContentCheck]);

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
        className={`cursor-pointer w-9 h-9 flex items-center justify-center text-sm font-semibold transition-all duration-250 ${
          currentPage === index + 1
            ? "bg-navy text-white"
            : "text-body-gray hover:bg-surface-tint border border-navy/10"
        }`}
      >
        {index + 1}
      </button>
    ));

  if (!department || !content.length)
    return (
      <h1 className="text-center font-bold text-body-gray mt-10">
        No faculty data available for {programme}.
      </h1>
    );

  return (
    <div ref={facultySectionRef} className="text-body-gray">
      <Reveal>
        <header className="pb-6 mb-8 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            People
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-4">
            {department.title}
          </h1>
          <p className="leading-relaxed max-w-prose">{department.description}</p>
        </header>
      </Reveal>

      <RevealGroup className="flex flex-col border-t border-navy/10">
        {currentFaculties.map((faculty: any, idx: number) => (
          <RevealItem key={faculty.id}>
            <button
              type="button"
              onClick={() => setSelectedFaculty(faculty)}
              className="w-full grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-6 border-b border-navy/10 text-left group hover:bg-surface-light/70 transition-colors duration-300 -mx-2 px-2 cursor-pointer"
            >
              <div className="sm:col-span-1 flex items-start">
                <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums pt-2">
                  {String(startIndex + idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="sm:col-span-2">
                <FacultyAvatar
                  image={faculty.image}
                  name={faculty.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 border border-navy/10"
                />
              </div>
              <div className="sm:col-span-6 flex flex-col justify-center">
                <h2 className="text-lg md:text-xl font-bold text-navy tracking-tight group-hover:text-orange transition-colors duration-300">
                  {faculty.name}
                </h2>
                <p className="text-sm text-orange font-medium mt-1">
                  {faculty.designation}
                </p>
                <p className="text-sm text-body-gray/80 mt-1">
                  {faculty.qualification}
                </p>
              </div>
              <div className="sm:col-span-3 flex items-center sm:justify-end">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy border border-navy/20 px-4 py-2 group-hover:bg-orange group-hover:border-orange group-hover:text-white transition-all duration-300">
                  Read more
                </span>
              </div>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {selectedFaculty !== null && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4 z-[999]"
            onClick={() => setSelectedFaculty(null)}
          >
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white border border-navy/10 shadow-[var(--shadow-card-hover)] p-0 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-1 w-full bg-gradient-to-r from-navy via-orange to-navy/20 sticky top-0 z-20" />
              <button
                className="cursor-pointer absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center border border-navy/15 text-navy hover:bg-orange hover:border-orange hover:text-white transition-all duration-250"
                onClick={() => setSelectedFaculty(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-8">
                  <div className="md:col-span-3">
                    <FacultyAvatar
                      image={selectedFaculty.image}
                      name={selectedFaculty.name}
                      className="w-36 h-36 border border-navy/10"
                    />
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
                      {selectedFaculty.name}
                    </h2>
                    <div className="h-px w-16 bg-orange my-4" />
                    <p className="text-sm text-orange font-semibold">
                      {selectedFaculty?.designation}
                    </p>
                    <p className="text-sm text-body-gray/80 mt-1">
                      {selectedFaculty.qualification}
                    </p>
                    {selectedFaculty?.about?.map((desc, i) => (
                      <p key={i} className="mt-3 text-sm text-body-gray leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>

                {selectedFaculty &&
                  selectedFaculty.listOfPublications &&
                  selectedFaculty.listOfPublications.content.length > 0 && (
                    <div className="border border-navy/10 mb-4">
                      <button
                        type="button"
                        className="w-full flex justify-between items-center bg-surface-light p-4 cursor-pointer text-left"
                        onClick={() => toggleAccordion(selectedFaculty.id, 0)}
                      >
                        <h2 className="text-lg text-navy font-bold tracking-tight">
                          {selectedFaculty.listOfPublications.title}
                        </h2>
                        <ChevronDown
                          size={18}
                          className={`text-orange transition-transform duration-300 ${
                            accordionStates[`${selectedFaculty.id}-0`]
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: accordionStates[`${selectedFaculty.id}-0`]
                            ? 1
                            : 0,
                          height: accordionStates[`${selectedFaculty.id}-0`]
                            ? "auto"
                            : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden bg-white"
                      >
                        <ul className="p-4 space-y-2 border-t border-navy/10">
                          {selectedFaculty.listOfPublications.content.map(
                            (item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-sm text-body-gray leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 bg-orange mt-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    </div>
                  )}

                {selectedFaculty.details?.map(({ title, content }, index) => (
                  <div
                    key={index + 1}
                    className="border border-navy/10 mb-4"
                  >
                    <button
                      type="button"
                      className="w-full flex justify-between items-center bg-surface-light p-4 cursor-pointer text-left"
                      onClick={() =>
                        toggleAccordion(selectedFaculty.id, index + 1)
                      }
                    >
                      <h2 className="text-lg text-navy font-bold tracking-tight">
                        {title}
                      </h2>
                      <ChevronDown
                        size={18}
                        className={`text-orange transition-transform duration-300 ${
                          accordionStates[
                            `${selectedFaculty.id}-${index + 1}`
                          ]
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: accordionStates[
                          `${selectedFaculty.id}-${index + 1}`
                        ]
                          ? 1
                          : 0,
                        height: accordionStates[
                          `${selectedFaculty.id}-${index + 1}`
                        ]
                          ? "auto"
                          : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="p-4 border-t border-navy/10">
                        {Array.isArray(content)
                          ? content.map((line, i) => (
                              <p
                                key={i}
                                className="text-sm text-body-gray mb-2 leading-relaxed"
                              >
                                {line}
                              </p>
                            ))
                          : (
                              <p className="text-sm text-body-gray mb-2 leading-relaxed">
                                {content}
                              </p>
                            )}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-center sm:justify-between items-center mt-12 gap-4 pt-6 border-t border-navy/10">
        <Button
          variant="ghost"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="!px-4 !py-2 !text-xs sm:!text-sm disabled:opacity-40 disabled:pointer-events-none"
        >
          PREVIOUS PAGE
        </Button>
        <div className="hidden sm:flex flex-wrap gap-2">
          {renderPaginationButtons()}
        </div>
        <Button
          variant="ghost"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="!px-4 !py-2 !text-xs sm:!text-sm disabled:opacity-40 disabled:pointer-events-none"
        >
          NEXT PAGE
        </Button>
      </div>
    </div>
  );
}

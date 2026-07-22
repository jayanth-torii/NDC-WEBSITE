"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import StudentCenterContent from "@/app/Data/StudentCenterContent";
import PdfModal from "@/components/PdfModal";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

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
      <SectionHeading title={title} className="mb-6" />

      {/* Policy & Composition Sections */}
      <RevealGroup className="space-y-3">
        {sections.length > 0 ? (
          sections.map((section) => (
            <RevealItem key={section.title}>
              <div className="flex items-center justify-between gap-4 rounded-[14px] border border-card-border bg-white px-5 py-4 shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover hover:shadow-[var(--shadow-card-hover)]">
                <span className="text-lg font-medium text-navy">{section.title}</span>
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-2 rounded-[8px] bg-orange px-5 py-2 text-sm font-bold text-white transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-orange-dark"
                  onClick={() => openPdf(section.pdf)}
                >
                  View <ArrowRight size={16} />
                </button>
              </div>
            </RevealItem>
          ))
        ) : (
          <p className="text-body-gray text-lg text-center">No links available.</p>
        )}
      </RevealGroup>

      {/* PDF Modal Popup */}
      <PdfModal pdfUrl={selectedPdf} onClose={closePdf} />
    </div>
  );
};

export default Policy;

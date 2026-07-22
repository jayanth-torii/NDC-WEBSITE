"use client";

import React, { Suspense } from "react";
import pageJson from "@/data-export/students/data.json";

import GlobalBanner from "@/components/GlobalBanner";
import MentoringCell from "@/components/StudentsPage/MentoringCell";
import RedressalCell from "@/components/StudentsPage/RedressalCell";
import CareerAdvancementCenter from "@/components/StudentsPage/CareerAdvancementCenter";
import TPICell from "@/components/StudentsPage/TPICell";

const StudentsPage = () => {
  const studentsData: any = (pageJson["students"] as any)?.data || null;

  if (!studentsData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <GlobalBanner
        title={studentsData.BannerSection?.title || "Students"}
        image={studentsData.BannerSection?.image}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Students" }
        ]}
      />

      <Suspense fallback={<p>Loading Mentoring Cell...</p>}>
        <MentoringCell MentoringCellData={studentsData.MentoringCell} />
      </Suspense>

      <Suspense fallback={<p>Loading Redressal Cell...</p>}>
        <RedressalCell redressalData={studentsData.RedRessalCellSection} />
      </Suspense>

      <Suspense fallback={<p>Loading Career Advancement Center...</p>}>
        <CareerAdvancementCenter data={studentsData.CareerAdvancementCenter} />
      </Suspense>

      <Suspense fallback={<p>Loading Training, Placement & Internship Cell...</p>}>
        <TPICell data={studentsData.TrainingPlacementAndInternshipCell} />
      </Suspense>
    </div>
  );
};

export default StudentsPage;

import React, { Suspense } from "react";

import GlobalBanner from "@/components/GlobalBanner";
import MentoringCell from "@/components/StudentsPage/MentoringCell";
import RedressalCell from "@/components/StudentsPage/RedressalCell";
import CareerAdvancementCenter from "@/components/StudentsPage/CareerAdvancementCenter";
import TPICell from "@/components/StudentsPage/TPICell";
import { getStudents } from "@/services/data.service";

export const revalidate = 300;

const StudentsPage = async () => {
  const studentsData: any = await getStudents();

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

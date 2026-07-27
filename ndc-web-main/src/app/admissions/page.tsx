import React, { Suspense } from "react";
import { getAdmissions } from "@/services/data.service";

import GlobalBanner from "@/components/GlobalBanner";
import Courses from "@/components/Admission/Courses";
import Documents from "@/components/Admission/Documents";
import Procedure from "@/components/Admission/Procedure";

export const revalidate = 300;

const Admission = async () => {
  const admissionData: any = await getAdmissions();

  if (!admissionData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <GlobalBanner
        title={admissionData.BannerSection?.title || "Admissions"}
        image={admissionData.BannerSection?.image}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Admissions" }
        ]}
      />

      <Suspense fallback={<p>Loading Courses...</p>}>
        <Courses data={admissionData.coursesEligibility} />
      </Suspense>

      <Suspense fallback={<p>Loading Procedure...</p>}>
        <Procedure data={admissionData.applicationProcedure} />
      </Suspense>

      <Suspense fallback={<p>Loading Documents...</p>}>
        <Documents data={admissionData.ImportentDocuments} />
      </Suspense>
    </div>
  );
};

export default Admission;

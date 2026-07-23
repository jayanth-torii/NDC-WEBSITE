"use client";
import React from "react";

import About from "@/components/Activities/CommonComponents/About";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";
import Procedure from "@/components/Activities/CommonComponents/Procedure";
import Images from "@/components/Activities/CommonComponents/Images";

import pageJson from "@/data-export/activities/student-oriented-cells/students-grievance-cell/data.json";

function StudentsGrievanceRedressalCell() {
  const data: any = (pageJson["students-grievance-redressal-cell"] as any)?.data || null;

  if (!data) {
    return null;
  }

  return (
    <ActivitiesPageShell
      eyebrow="Student Oriented Cells"
      title="Students Grievance Redressal Cell"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Student Oriented Cells", path: "/activities#Student%20Oriented%20Cells" },
        { label: "Students Grievance Cell" },
      ]}
    >
      <About data={data.AboutVisionMissionSections} />

      <Procedure data={data.proceduresSection} />

      <Images data={data.ImagesSection} />

      <AntiragginCommitte data={data.Members} />
    </ActivitiesPageShell>
  );
}

export default StudentsGrievanceRedressalCell;

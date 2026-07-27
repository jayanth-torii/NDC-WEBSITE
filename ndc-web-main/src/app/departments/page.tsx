"use client";

import React from "react";

import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import FacultyPublications from "@/components/DepartmentsPage/FacultyPublications";
import HODSMessage from "@/components/DepartmentsPage/HODSMessage";
import InternalCollaboration from "@/components/DepartmentsPage/InternalCollaboration";
import ProfessionalCourses from "@/components/DepartmentsPage/ProfessionalCourses";
import Programme from "@/components/DepartmentsPage/Programme";
import ResearchAwards from "@/components/DepartmentsPage/ResearchAwards";
import VisionMission from "@/components/DepartmentsPage/VisionMission";

import pageJson from "@/data-export/departments/data.json";

const Departments = () => {
  const deptData: any = (pageJson["department-page"] as any)?.data || null;

  if (!deptData) {
    return null;
  }

  const {
    BannerSection,
    Programmes,
    International_Collaboration,
    Professional_Courses,
    Language_Department,
    Message_From_Hods,
    Faculty_And_Publications,
    Research_And_Awards,
  } = deptData;

  return (
    <main style={{ zoom: '0.9' }} className="min-h-screen flex flex-col w-full bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_28%,#f1f5f9_100%)]">
      <GlobalBanner
        eyebrow="Academics"
        title={BannerSection?.title || "Departments"}
        image={BannerSection?.image}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Departments" },
        ]}
      />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent"
        />
        <Programme data={Programmes} />
        <InternalCollaboration data={International_Collaboration} />
        <ProfessionalCourses data={Professional_Courses} />
        <VisionMission data={Language_Department} />
        <HODSMessage data={Message_From_Hods} />
        <FacultyPublications data={Faculty_And_Publications} />
        <ResearchAwards data={Research_And_Awards} />
      </div>
    </main>
  );
};

export default Departments;

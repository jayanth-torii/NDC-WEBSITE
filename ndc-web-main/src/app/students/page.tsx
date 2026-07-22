"use client";

import React, { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import StudentsBanner from "@/components/StudentsPage/StudentsBanner";
import EventsTabs from "@/components/StudentsPage/StudentsTabs";
import pageJson from "@/data-export/students/data.json";

const Events = () => {
  const studentsData: any = (pageJson["students"] as any)?.data || null;

  if (!studentsData) {
    return null;
  }

  const {BannerSection, ...Tabsdata} =  studentsData

  return (
    <div className="m-auto w-[90%]">
      <StudentsBanner data={studentsData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <Suspense>
        <EventsTabs data={Tabsdata} />
      </Suspense>
    </div>
  );
};

export default Events;

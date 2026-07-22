"use client";

import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import StudentsBanner from "@/components/StudentsPage/StudentsBanner";
import EventsTabs from "@/components/StudentsPage/StudentsTabs";
import { BASE_URL } from "@/config/apiService";

const Events = () => {
  const [studentsData, setStudentsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentsContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/students`);
        setStudentsData(response.data.data);
      } catch (error) {
        console.error("Error fetching Students data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsContent();
  }, []);

  if (loading || !studentsData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Students...
      </div>
    );
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

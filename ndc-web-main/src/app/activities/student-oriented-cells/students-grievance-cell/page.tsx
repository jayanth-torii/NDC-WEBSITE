"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";

import About from "@/components/Activities/CommonComponents/About";
import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";
import Procedure from "@/components/Activities/CommonComponents/Procedure";
import Images from "@/components/Activities/CommonComponents/Images";

import { BASE_URL } from "@/config/apiService";

function StudentsGrievanceRedressalCell() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/students-grievance-redressal-cell`)
      .then((res) => {
        setData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch students-grievance-redressal-cell content:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Students Grievance Redressal Cell...
      </div>
    );
  }

  return (
    <div className="m-auto w-[90%]">
      <Banner data={data.bannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <About data={data.AboutVisionMissionSections} />

      <Procedure data={data.proceduresSection} />

      <Images data={data.ImagesSection} />

      <AntiragginCommitte data={data.Members} />
    </div>
  );
}

export default StudentsGrievanceRedressalCell;

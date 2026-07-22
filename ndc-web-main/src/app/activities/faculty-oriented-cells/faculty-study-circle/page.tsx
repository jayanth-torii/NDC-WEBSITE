"use client";
import React, { Suspense, useEffect, useState } from "react";

import About from "@/components/Activities/CommonComponents/About";
import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import axios from "axios";
import { BASE_URL } from "@/config/apiService";

function FacultyStudyCircle() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/faculty-study-circle`)
      .then((res) => {
        setData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch faculty-study-circle content:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Faculty Study Circle...
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

      <AntiragginCommitte data={data.AntiRaggingCommitteMembers} />
    </div>
  );
}

export default FacultyStudyCircle;

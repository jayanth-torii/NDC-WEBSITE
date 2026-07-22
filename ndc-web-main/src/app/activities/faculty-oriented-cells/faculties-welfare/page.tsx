"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";

import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Procedure from "@/components/Activities/CommonComponents/Procedure";

import { BASE_URL } from "@/config/apiService";

function FacultiesWelfare() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/faculties-welfare`)
      .then((res) => {
        setData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch faculties-welfare content:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Faculties Welfare...
      </div>
    );
  }

  return (
    <div className="m-auto w-[90%]">
      <Banner data={data.bannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <Procedure data={data.FacultiesWelfare} />
    </div>
  );
}

export default FacultiesWelfare;

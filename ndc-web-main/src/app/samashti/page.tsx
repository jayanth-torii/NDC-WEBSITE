"use client";

import React, {useState, useEffect, Suspense} from "react";
import { Box } from "@mantine/core";

// import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
const Breadcrumb = React.lazy(() => import("@/components/Breadcrumb/Breadcrumb"));
import SamashtiBanner from "@/components/SamashtiPage/SamashtiBanner";
import SamashtiAbout from "@/components/SamashtiPage/SamashtiAbout";
import ViewEditions from "@/components/SamashtiPage/ViewEditions";

import axios from "axios";
import { BASE_URL } from "@/config/apiService";


const Samashti = () => {

  const [data, setData] = useState(null);


    useEffect(() => {
        axios.get(`${BASE_URL}/samashti`)

        .then(res => {
          if (res?.data?.data?.length > 0) {
            setData(res.data.data[0]);
          }
        })
        .catch(err => console.error(err));
    }, []);
  
    if (!data) {
      return (
        <Box className="text-center py-10">
          <div className="text-lg font-medium">Loading Samashti...</div>
        </Box>
      );
    }
    

    console.log(data);

    const { BannerSection, About, Editions } = data;


    return (
        <Box style={{ margin: "auto", width: "90%" }}>
          <SamashtiBanner data={ BannerSection} />
      
          <Suspense>
            <Breadcrumb className="ml-0" />
          </Suspense>
      
          <SamashtiAbout data={ About} />
      
          <ViewEditions data={ Editions} />
        </Box>
      );
      
}

export default Samashti
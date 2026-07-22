"use client";

import React, {Suspense} from "react";
import { Box } from "@mantine/core";

// import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
const Breadcrumb = React.lazy(() => import("@/components/Breadcrumb/Breadcrumb"));
import SamashtiBanner from "@/components/SamashtiPage/SamashtiBanner";
import SamashtiAbout from "@/components/SamashtiPage/SamashtiAbout";
import ViewEditions from "@/components/SamashtiPage/ViewEditions";

import samashtiJson from "@/data-export/samashti/data.json";


const Samashti = () => {

  const data: any = (samashtiJson["samashti"] as any)?.data?.[0] || null;

    if (!data) {
      return null;
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
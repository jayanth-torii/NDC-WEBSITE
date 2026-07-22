"use client";

import React, {Suspense} from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DepartmentTabs from "@/components/DepartmentTabs/DepartmentTabs";
import HeroCourse from "@/components/DepartmentTabs/HeroCourse";
// import HeroCourse from "@/components/HeroCourse/HeroCourse";



const Department = () => {

    return (
        <div className="m-auto w-[90%]">
    
        <Suspense>
            <HeroCourse/>
        </Suspense>

        <Suspense>
            <Breadcrumb className="ml-0"/>
        </Suspense>
    

        <Suspense>
            <DepartmentTabs/>
        </Suspense>
            
     
        </div>

    )
}

export default Department
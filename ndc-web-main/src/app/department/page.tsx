"use client";

import React, { Suspense } from "react";

import DepartmentTabs from "@/components/DepartmentTabs/DepartmentTabs";
import HeroCourse from "@/components/DepartmentTabs/HeroCourse";

const Department = () => {
  return (
    <main className="min-h-screen flex flex-col w-full bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_40%,#f1f5f9_100%)]">
      <Suspense>
        <HeroCourse />
      </Suspense>

      <div className="relative pb-20 lg:pb-28">
        <Suspense>
          <DepartmentTabs />
        </Suspense>
      </div>
    </main>
  );
};

export default Department;

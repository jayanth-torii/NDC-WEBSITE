"use client";

import React, { Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import DepartmentBanner from '@/components/DepartmentsPage/DepartmentBanner';
import FacultyPublications from '@/components/DepartmentsPage/FacultyPublications';
import HODSMessage from '@/components/DepartmentsPage/HODSMessage';
import InternalCollaboration from '@/components/DepartmentsPage/InternalCollaboration';
import ProfessionalCourses from '@/components/DepartmentsPage/ProfessionalCourses';

import Programme from '@/components/DepartmentsPage/Programme';
import ResearchAwards from '@/components/DepartmentsPage/ResearchAwards';
import VisionMission from '@/components/DepartmentsPage/VisionMission';

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
        <div className="w-[90%] mx-auto">

            <Suspense>
                <Breadcrumb className='ml-0' />
            </Suspense>

            <DepartmentBanner data={BannerSection} />

            <Programme data={Programmes} />

            <InternalCollaboration data={International_Collaboration} />

            <ProfessionalCourses data={Professional_Courses} />

            <VisionMission data={Language_Department} />

            <HODSMessage data={Message_From_Hods} />

            <FacultyPublications data={Faculty_And_Publications} />

            <ResearchAwards data={Research_And_Awards} />

        </div>
    )
}

export default Departments

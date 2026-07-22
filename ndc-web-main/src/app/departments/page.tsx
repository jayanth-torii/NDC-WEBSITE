"use client";

import React, { useEffect, useState, Suspense } from 'react';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import DepartmentBanner from '@/components/DepartmentsPage/DepartmentBanner';
import FacultyPublications from '@/components/DepartmentsPage/FacultyPublications';
import HODSMessage from '@/components/DepartmentsPage/HODSMessage';
import InternalCollaboration from '@/components/DepartmentsPage/InternalCollaboration';
import ProfessionalCourses from '@/components/DepartmentsPage/ProfessionalCourses';
 
import Programme from '@/components/DepartmentsPage/Programme';
import ResearchAwards from '@/components/DepartmentsPage/ResearchAwards';
import VisionMission from '@/components/DepartmentsPage/VisionMission';
 
import { BASE_URL } from "@/config/apiService";
import axios from "axios";


const Departments = () => {

    const [deptData, setDeptData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeptData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/department-page`);
            setDeptData(res?.data?.data);
        } catch (error) {
            console.error("Error fetching department data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchDeptData();
    }, []);

    if (loading || !deptData) {
        return (
        <div className="text-center py-20 text-gray-500 text-lg">
            Loading Department...
        </div>
        );
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

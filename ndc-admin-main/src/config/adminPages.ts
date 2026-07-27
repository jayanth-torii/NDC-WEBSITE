import { API_ROUTES } from "../services/route";

// NDC-specific page/route lists — same idea as NCET admin's src/config/adminPages.js
// (small config module for menu/route lists that don't belong in the generic route.ts).

export const DEPARTMENT_TABS = [
  { key: "visionMission", label: "Vision & Mission", route: API_ROUTES.DEPARTMENT.VISION_MISSION },
  { key: "hodMessage", label: "HOD Message", route: API_ROUTES.DEPARTMENT.HOD_MESSAGE },
  { key: "objectives", label: "Objectives", route: API_ROUTES.DEPARTMENT.OBJECTIVES },
  { key: "programmeDetails", label: "Programme Details", route: API_ROUTES.DEPARTMENT.PROGRAMME_DETAILS },
  { key: "about", label: "About Course", route: API_ROUTES.DEPARTMENT.ABOUT },
  { key: "activities", label: "Activities", route: API_ROUTES.DEPARTMENT.ACTIVITIES },
  { key: "admissionProcess", label: "Admission Process", route: API_ROUTES.DEPARTMENT.ADMISSION_PROCESS },
  { key: "booksPatents", label: "Books & Patents", route: API_ROUTES.DEPARTMENT.BOOKS_PATENTS },
  { key: "courseDuration", label: "Course Duration", route: API_ROUTES.DEPARTMENT.COURSE_DURATION },
  { key: "research", label: "Research", route: API_ROUTES.DEPARTMENT.RESEARCH },
  { key: "syllabus", label: "Syllabus", route: API_ROUTES.DEPARTMENT.SYLLABUS },
  { key: "faculty", label: "Faculty", route: API_ROUTES.DEPARTMENT.FACULTY },
];

export const PROGRAMME_CODES = ["Bcom_BDA", "BCOM", "BBA", "BCA", "MBA", "MCom", "MCA", "BScience"];

export const ACTIVITY_GROUPS: Record<string, string[]> = {
  "academic-&-social-engagement-forums": [
    "ambedkar-study-circle",
    "commerce-and-management-forum",
    "industrial-visit",
    "ncc-cell",
    "nss-cell",
  ],
  "faculty-oriented-cells": [
    "ed-cell",
    "faculties-welfare",
    "faculty-study-circle",
    "icc-cell",
    "sc-st-obc-minority-cell",
  ],
  "student-oriented-cells": [
    "anti-ragging-cell",
    "anti-sexual-harassment-cell",
    "eco-clubs",
    "equal-opportunity-cell",
    "students-grievance-cell",
    "women-cell",
  ],
};

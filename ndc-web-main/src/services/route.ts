// Centralized API routes — same nested-object pattern as the admin panel's
// services/route.ts (and NCET's own route.js on both sides). Mirrors
// ndc-backend-main's src/routes/globalRoutes.js mount paths.
export const API_ROUTES = {
  HOME: "/home",
  FOOTER: "/footer",
  HEADLINE_BANNER: "/headline-banner",
  ABOUT_NDC: "/about-ndc",
  ADMISSIONS: "/admissions",
  ALUMNI: "/alumni",
  APPLY_NOW_PAGE: "/apply-now-page",
  CERTIFICATE_COURSES: "/certificate-courses",
  CONTACT_US_PAGE: "/contact-us-page",
  DEPARTMENTS_PAGE: "/departments-page",

  DEPARTMENT: {
    VISION_MISSION: "/department/vision-mission",
    HOD_MESSAGE: "/department/hod-message",
    OBJECTIVES: "/department/objectives",
    PROGRAMME_DETAILS: "/department/programme-details",
    ABOUT: "/department/about",
    ACTIVITIES: "/department/activities",
    ADMISSION_PROCESS: "/department/admission-process",
    BOOKS_PATENTS: "/department/books-patents",
    COURSE_DURATION: "/department/course-duration",
    RESEARCH: "/department/research",
    SYLLABUS: "/department/syllabus",
    FACULTY: "/department/faculty",
  },

  GALLERY: "/gallery",
  IIC: "/iic",
  IQAC: "/iqac",
  LIBRARY: "/library",
  QUESTION_BANK: "/question-bank",
  RESEARCH: "/research",
  RESEARCH_FORUM: "/research-forum",
  SAMASHTI: "/samashti",
  SPORTS: "/sports",
  STUDENTS: "/students",
  ACTIVITIES_PAGE: "/activities-page",
  BLOG_BANNER: "/blog-banner",

  BLOGS: { BASE: "/blogs" },
  ACTIVITY_CELLS: { BASE: "/activity-cells" },

  APPLY_NOW_FORMS: "/apply-now-forms",
  CONTACT_US_FORMS: "/contact-us-forms",

  UPLOAD: "/upload",
};

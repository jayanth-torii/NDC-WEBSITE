// Centralized API routes for the admin — same nested-object pattern as
// NCET's admin (src/services/route.js). Mirrors ndc-backend-main's
// src/routes/globalRoutes.js mount paths.
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/auth/me",
    UPDATE_PROFILE: "/auth/profile",
  },
  HOME: { GET: "/home", UPDATE: "/home" },
  FOOTER: { GET: "/footer", UPDATE: "/footer" },
  HEADLINE_BANNER: { GET: "/headline-banner", UPDATE: "/headline-banner" },
  ABOUT_NDC: { GET: "/about-ndc", UPDATE: "/about-ndc" },
  ADMISSIONS: { GET: "/admissions", UPDATE: "/admissions" },
  ALUMNI: { GET: "/alumni", UPDATE: "/alumni" },
  APPLY_NOW_PAGE: { GET: "/apply-now-page", UPDATE: "/apply-now-page" },
  CERTIFICATE_COURSES: { GET: "/certificate-courses", UPDATE: "/certificate-courses" },
  CONTACT_US_PAGE: { GET: "/contact-us-page", UPDATE: "/contact-us-page" },
  DEPARTMENTS_PAGE: { GET: "/departments-page", UPDATE: "/departments-page" },

  // Department sub-type routes (12), one per public DepartmentTabs component.
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

  GALLERY: { GET: "/gallery", UPDATE: "/gallery" },
  IIC: { GET: "/iic", UPDATE: "/iic" },
  IQAC: { GET: "/iqac", UPDATE: "/iqac" },
  LIBRARY: { GET: "/library", UPDATE: "/library" },
  QUESTION_BANK: { GET: "/question-bank", UPDATE: "/question-bank" },
  RESEARCH: { GET: "/research", UPDATE: "/research" },
  RESEARCH_FORUM: { GET: "/research-forum", UPDATE: "/research-forum" },
  SAMASHTI: { GET: "/samashti", UPDATE: "/samashti" },
  SPORTS: { GET: "/sports", UPDATE: "/sports" },
  STUDENTS: { GET: "/students", UPDATE: "/students" },
  ACTIVITIES_PAGE: { GET: "/activities-page", UPDATE: "/activities-page" },
  BLOG_BANNER: { GET: "/blog-banner", UPDATE: "/blog-banner" },

  // Blog posts (collection; append /:postId for GET one / PUT / DELETE)
  BLOGS: { GET: "/blogs", ADD: "/blogs", BASE: "/blogs" },

  // Activity cells (collection; append /:cellId for GET one / PUT)
  ACTIVITY_CELLS: { GET: "/activity-cells", BASE: "/activity-cells" },

  // Public form submissions (admin-facing inbox)
  APPLY_NOW_FORMS: { GET: "/apply-now-forms", BASE: "/apply-now-forms" },
  CONTACT_US_FORMS: { GET: "/contact-us-forms", BASE: "/contact-us-forms" },

  // File upload
  UPLOAD: "/upload",
};

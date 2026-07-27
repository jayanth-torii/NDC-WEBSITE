// Maps every singleton model to the data-export file/key it's seeded from.
// Verified directly against the real JSON (see _extraction-report.json and
// spot-checks of individual files) rather than assumed. `unwrapArray: true`
// means the source wraps its payload in a single-element array (a Strapi
// collection-type quirk affecting Home/Research/Samashti). `pick` extracts a
// sub-key instead of the whole endpoint payload (used for BlogBanner, which
// shares a file with the Blog collection).
module.exports = [
  { model: "Home", file: "_landing/data.json", endpointKey: "home", unwrapArray: true },
  { model: "Footer", file: "_shared/footer.json", endpointKey: "footer" },
  { model: "HeadlineBanner", file: "_shared/banner.json", endpointKey: "headline-banner" },
  { model: "AboutNdc", file: "about-ndc/data.json", endpointKey: "about-us" },
  { model: "Admissions", file: "admissions/data.json", endpointKey: "admission" },
  { model: "Alumni", file: "alumni/data.json", endpointKey: "alumni" },
  { model: "ApplyNowPage", file: "apply-now/data.json", endpointKey: "apply-now" },
  { model: "CertificateCourses", file: "certificate-courses/data.json", endpointKey: "certificate-course" },
  { model: "ContactUsPage", file: "contact-us/data.json", endpointKey: "contact-us" },
  { model: "DepartmentsPage", file: "departments/data.json", endpointKey: "department-page" },

  { model: "VisionMission", file: "department/data.json", endpointKey: "vision-missions" },
  { model: "HodMessage", file: "department/data.json", endpointKey: "hod-messages" },
  { model: "Objective", file: "department/data.json", endpointKey: "objectives" },
  { model: "ProgrammeDetail", file: "department/data.json", endpointKey: "programme-details" },
  { model: "AboutDepartment", file: "department/data.json", endpointKey: "about-departments" },
  { model: "DepartmentActivity", file: "department/data.json", endpointKey: "activities" },
  { model: "AdmissionProcess", file: "department/data.json", endpointKey: "admission-processes" },
  { model: "BookPatient", file: "department/data.json", endpointKey: "books-patients" },
  { model: "CourseDuration", file: "department/data.json", endpointKey: "course-durations" },
  { model: "DepartmentResearch", file: "department/data.json", endpointKey: "department-researches" },
  { model: "SyllabusDetail", file: "department/data.json", endpointKey: "syllabus-details" },
  { model: "DepartmentFacultyMember", file: "department/data.json", endpointKey: "department-faculty-member" },

  { model: "Gallery", file: "gallery/data.json", endpointKey: "gallery" },
  { model: "Iic", file: "iic/data.json", endpointKey: "iic" },
  { model: "Iqac", file: "iqac/data.json", endpointKey: "iqac" },
  // Library is NOT here on purpose — confirmed with the user that
  // app/Data/LibraryContent.tsx (the hand-edited object actually live today)
  // is the source of truth, not the stale data-export snapshot. See
  // seed/seedLibrary.js for its dedicated seeder.
  { model: "QuestionBank", file: "question-bank/data.json", endpointKey: "question-banks" },
  { model: "Research", file: "research/data.json", endpointKey: "research", unwrapArray: true },
  { model: "ResearchForum", file: "research-forum/data.json", endpointKey: "research-forum" },
  { model: "Samashti", file: "samashti/data.json", endpointKey: "samashti", unwrapArray: true },
  { model: "Sports", file: "sports/data.json", endpointKey: "sports" },
  { model: "Students", file: "students/data.json", endpointKey: "students" },
  { model: "ActivitiesPage", file: "activities/data.json", endpointKey: "activities-page" },
  { model: "BlogBanner", file: "blog/data.json", endpointKey: "blogs-content", pick: "BannerSection" },
];

const express = require("express");

const router = express.Router();

// Custom (non-generated) modules
router.use("/auth", require("./auth/route"));
router.use("/blogs", require("./blog/route"));
router.use("/activity-cells", require("./activityCell/route"));
router.use("/apply-now-forms", require("./applyNowForm/route"));
router.use("/contact-us-forms", require("./contactUsForm/route"));

// Generated singleton modules (see scripts/generateSingletonModules.js —
// re-run that script if this list needs to change, don't hand-edit around it)
router.use("/footer", require("../routes/footer/route"));
router.use("/home", require("../routes/home/route"));
router.use("/headline-banner", require("../routes/headlineBanner/route"));
router.use("/about-ndc", require("../routes/aboutNdc/route"));
router.use("/admissions", require("../routes/admissions/route"));
router.use("/alumni", require("../routes/alumni/route"));
router.use("/apply-now-page", require("../routes/applyNowPage/route"));
router.use("/certificate-courses", require("../routes/certificateCourses/route"));
router.use("/contact-us-page", require("../routes/contactUsPage/route"));
router.use("/departments-page", require("../routes/departmentsPage/route"));
router.use("/department/vision-mission", require("../routes/visionMission/route"));
router.use("/department/hod-message", require("../routes/hodMessage/route"));
router.use("/department/objectives", require("../routes/objective/route"));
router.use("/department/programme-details", require("../routes/programmeDetail/route"));
router.use("/department/about", require("../routes/aboutDepartment/route"));
router.use("/department/activities", require("../routes/departmentActivity/route"));
router.use("/department/admission-process", require("../routes/admissionProcess/route"));
router.use("/department/books-patents", require("../routes/bookPatient/route"));
router.use("/department/course-duration", require("../routes/courseDuration/route"));
router.use("/department/research", require("../routes/departmentResearch/route"));
router.use("/department/syllabus", require("../routes/syllabusDetail/route"));
router.use("/department/faculty", require("../routes/departmentFacultyMember/route"));
router.use("/gallery", require("../routes/gallery/route"));
router.use("/iic", require("../routes/iic/route"));
router.use("/iqac", require("../routes/iqac/route"));
router.use("/library", require("../routes/library/route"));
router.use("/question-bank", require("../routes/questionBank/route"));
router.use("/research", require("../routes/research/route"));
router.use("/research-forum", require("../routes/researchForum/route"));
router.use("/samashti", require("../routes/samashti/route"));
router.use("/sports", require("../routes/sports/route"));
router.use("/students", require("../routes/students/route"));
router.use("/activities-page", require("../routes/activitiesPage/route"));
router.use("/blog-banner", require("../routes/blogBanner/route"));

router.use("/upload", require("./uploadRoutes"));

module.exports = router;

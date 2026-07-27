// Dev-time generator only (not part of the running app). Creates the
// mechanical model/controller/route triple for every Mixed-data singleton
// content module listed below, matching the per-module folder convention.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "src");

// folder: directory name under models/controllers/routes
// modelName: Mongoose model name
// mount: path segment mounted under /api in globalRoutes.js
const MODULES = [
  { folder: "footer", modelName: "Footer", mount: "footer" },
  { folder: "home", modelName: "Home", mount: "home" },
  { folder: "headlineBanner", modelName: "HeadlineBanner", mount: "headline-banner" },
  { folder: "aboutNdc", modelName: "AboutNdc", mount: "about-ndc" },
  { folder: "admissions", modelName: "Admissions", mount: "admissions" },
  { folder: "alumni", modelName: "Alumni", mount: "alumni" },
  { folder: "applyNowPage", modelName: "ApplyNowPage", mount: "apply-now-page" },
  { folder: "certificateCourses", modelName: "CertificateCourses", mount: "certificate-courses" },
  { folder: "contactUsPage", modelName: "ContactUsPage", mount: "contact-us-page" },
  { folder: "departmentsPage", modelName: "DepartmentsPage", mount: "departments-page" },
  { folder: "visionMission", modelName: "VisionMission", mount: "department/vision-mission" },
  { folder: "hodMessage", modelName: "HodMessage", mount: "department/hod-message" },
  { folder: "objective", modelName: "Objective", mount: "department/objectives" },
  { folder: "programmeDetail", modelName: "ProgrammeDetail", mount: "department/programme-details" },
  { folder: "aboutDepartment", modelName: "AboutDepartment", mount: "department/about" },
  { folder: "departmentActivity", modelName: "DepartmentActivity", mount: "department/activities" },
  { folder: "admissionProcess", modelName: "AdmissionProcess", mount: "department/admission-process" },
  { folder: "bookPatient", modelName: "BookPatient", mount: "department/books-patents" },
  { folder: "courseDuration", modelName: "CourseDuration", mount: "department/course-duration" },
  { folder: "departmentResearch", modelName: "DepartmentResearch", mount: "department/research" },
  { folder: "syllabusDetail", modelName: "SyllabusDetail", mount: "department/syllabus" },
  { folder: "departmentFacultyMember", modelName: "DepartmentFacultyMember", mount: "department/faculty" },
  { folder: "gallery", modelName: "Gallery", mount: "gallery" },
  { folder: "iic", modelName: "Iic", mount: "iic" },
  { folder: "iqac", modelName: "Iqac", mount: "iqac" },
  { folder: "library", modelName: "Library", mount: "library" },
  { folder: "questionBank", modelName: "QuestionBank", mount: "question-bank" },
  { folder: "research", modelName: "Research", mount: "research" },
  { folder: "researchForum", modelName: "ResearchForum", mount: "research-forum" },
  { folder: "samashti", modelName: "Samashti", mount: "samashti" },
  { folder: "sports", modelName: "Sports", mount: "sports" },
  { folder: "students", modelName: "Students", mount: "students" },
  { folder: "activitiesPage", modelName: "ActivitiesPage", mount: "activities-page" },
  { folder: "blogBanner", modelName: "BlogBanner", mount: "blog-banner" },
];

function writeIfMissingDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

for (const mod of MODULES) {
  const modelDir = path.join(ROOT, "models", mod.folder);
  const controllerDir = path.join(ROOT, "controllers", mod.folder);
  const routeDir = path.join(ROOT, "routes", mod.folder);
  writeIfMissingDir(modelDir);
  writeIfMissingDir(controllerDir);
  writeIfMissingDir(routeDir);

  fs.writeFileSync(
    path.join(modelDir, "model.js"),
    `const { createSingletonModel } = require("../../utils/modelFactory");\n\nmodule.exports = createSingletonModel("${mod.modelName}");\n`
  );
  fs.writeFileSync(
    path.join(controllerDir, "controller.js"),
    `const Model = require("../../models/${mod.folder}/model");\nconst { createSingletonController } = require("../../utils/singletonFactory");\n\nmodule.exports = createSingletonController(Model);\n`
  );
  fs.writeFileSync(
    path.join(routeDir, "route.js"),
    `const Model = require("../../models/${mod.folder}/model");\nconst { createSingletonRouter } = require("../../utils/singletonFactory");\n\nmodule.exports = createSingletonRouter(Model);\n`
  );
}

// Emit the globalRoutes mount list so it's guaranteed consistent with what was generated.
const mountLines = MODULES.map(
  (m) => `router.use("/${m.mount}", require("../routes/${m.folder}/route"));`
).join("\n");
fs.writeFileSync(path.join(__dirname, "generatedMounts.txt"), mountLines + "\n");

console.log(`Generated ${MODULES.length} singleton modules.`);

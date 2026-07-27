// route-slug (frontend URL segment, = cellId) <-> CMS endpoint slug (key inside
// the corresponding data-export JSON file). 4 of 16 differ — verified directly
// against ndc-web-main/data-export/_extraction-report.json, do not guess these.
module.exports = [
  { group: "academic-&-social-engagement-forums", routeSlug: "ambedkar-study-circle", endpointSlug: "ambedkar-study-circle" },
  { group: "academic-&-social-engagement-forums", routeSlug: "commerce-and-management-forum", endpointSlug: "commerce-and-management-forum" },
  { group: "academic-&-social-engagement-forums", routeSlug: "industrial-visit", endpointSlug: "industrial-visit" },
  { group: "academic-&-social-engagement-forums", routeSlug: "ncc-cell", endpointSlug: "ncc" },
  { group: "academic-&-social-engagement-forums", routeSlug: "nss-cell", endpointSlug: "nss-and-red-cross" },

  { group: "faculty-oriented-cells", routeSlug: "ed-cell", endpointSlug: "ed-cell" },
  { group: "faculty-oriented-cells", routeSlug: "faculties-welfare", endpointSlug: "faculties-welfare" },
  { group: "faculty-oriented-cells", routeSlug: "faculty-study-circle", endpointSlug: "faculty-study-circle" },
  { group: "faculty-oriented-cells", routeSlug: "icc-cell", endpointSlug: "icc-cell" },
  { group: "faculty-oriented-cells", routeSlug: "sc-st-obc-minority-cell", endpointSlug: "sc-st-obc-minority-cell" },

  { group: "student-oriented-cells", routeSlug: "anti-ragging-cell", endpointSlug: "anti-ragging-cell" },
  { group: "student-oriented-cells", routeSlug: "anti-sexual-harassment-cell", endpointSlug: "anti-sexual-harassment-cell" },
  { group: "student-oriented-cells", routeSlug: "eco-clubs", endpointSlug: "eco-cell" },
  { group: "student-oriented-cells", routeSlug: "equal-opportunity-cell", endpointSlug: "equal-opportunity-cell" },
  { group: "student-oriented-cells", routeSlug: "students-grievance-cell", endpointSlug: "students-grievance-redressal-cell" },
  { group: "student-oriented-cells", routeSlug: "women-cell", endpointSlug: "women-cell" },
].map((row) => ({
  ...row,
  file: `activities/${row.group}/${row.routeSlug}/data.json`,
}));

import { NavLink } from "react-router-dom";
import { API_ROUTES } from "../../services/route";

// Same NAV_GROUPS shape as before, rendered as a plain nested nav — no
// metismenujs dependency (Redux/i18n/RTL scaffolding intentionally skipped
// per the confirmed scope), just the same visual result (dark sidebar,
// grouped links, active-state accent) as NCET's #sidebar-menu.
const NAV_GROUPS: { title?: string; items: { label: string; to: string }[] }[] = [
  {
    items: [
      { label: "Dashboard", to: "/" },
      { label: "Site Settings", to: "/site-settings" },
    ],
  },
  {
    title: "Pages",
    items: [
      { label: "Home Page", to: `/page/home/${encodeURIComponent(API_ROUTES.HOME.GET)}` },
      { label: "About NDC", to: `/page/about-ndc/${encodeURIComponent(API_ROUTES.ABOUT_NDC.GET)}` },
      { label: "Admissions", to: `/page/admissions/${encodeURIComponent(API_ROUTES.ADMISSIONS.GET)}` },
      { label: "Alumni", to: `/page/alumni/${encodeURIComponent(API_ROUTES.ALUMNI.GET)}` },
      { label: "Apply Now Page", to: `/page/apply-now-page/${encodeURIComponent(API_ROUTES.APPLY_NOW_PAGE.GET)}` },
      { label: "Certificate Courses", to: `/page/certificate-courses/${encodeURIComponent(API_ROUTES.CERTIFICATE_COURSES.GET)}` },
      { label: "Contact Us Page", to: `/page/contact-us-page/${encodeURIComponent(API_ROUTES.CONTACT_US_PAGE.GET)}` },
    ],
  },
  {
    title: "Departments",
    items: [
      { label: "Departments (overview)", to: `/page/departments-page/${encodeURIComponent(API_ROUTES.DEPARTMENTS_PAGE.GET)}` },
      { label: "Department Details Editor", to: "/department-details-editor" },
    ],
  },
  {
    title: "More pages",
    items: [
      { label: "Gallery", to: `/page/gallery/${encodeURIComponent(API_ROUTES.GALLERY.GET)}` },
      { label: "IIC", to: `/page/iic/${encodeURIComponent(API_ROUTES.IIC.GET)}` },
      { label: "IQAC", to: `/page/iqac/${encodeURIComponent(API_ROUTES.IQAC.GET)}` },
      { label: "Library", to: `/page/library/${encodeURIComponent(API_ROUTES.LIBRARY.GET)}` },
      { label: "Question Bank", to: `/page/question-bank/${encodeURIComponent(API_ROUTES.QUESTION_BANK.GET)}` },
      { label: "Research", to: `/page/research/${encodeURIComponent(API_ROUTES.RESEARCH.GET)}` },
      { label: "Research Forum", to: `/page/research-forum/${encodeURIComponent(API_ROUTES.RESEARCH_FORUM.GET)}` },
      { label: "Samashti", to: `/page/samashti/${encodeURIComponent(API_ROUTES.SAMASHTI.GET)}` },
      { label: "Sports", to: `/page/sports/${encodeURIComponent(API_ROUTES.SPORTS.GET)}` },
      { label: "Students", to: `/page/students/${encodeURIComponent(API_ROUTES.STUDENTS.GET)}` },
    ],
  },
  {
    title: "Activities",
    items: [
      { label: "Activities (overview)", to: `/page/activities-page/${encodeURIComponent(API_ROUTES.ACTIVITIES_PAGE.GET)}` },
      { label: "Activity Cells (16)", to: "/activity-cells" },
    ],
  },
  {
    title: "Blog",
    items: [
      { label: "Blog Banner", to: `/page/blog-banner/${encodeURIComponent(API_ROUTES.BLOG_BANNER.GET)}` },
      { label: "Blog Posts", to: "/blogs" },
    ],
  },
  {
    title: "Enquiries",
    items: [
      { label: "Apply Now Submissions", to: "/submissions/apply-now-forms" },
      { label: "Contact Us Submissions", to: "/submissions/contact-us-forms" },
    ],
  },
];

export function SidebarContent() {
  return (
    <div id="sidebar-menu">
      {NAV_GROUPS.map((group, i) => (
        <ul className="list-unstyled" key={i}>
          {group.title && <li className="menu-title">{group.title}</li>}
          {group.items.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end className={({ isActive }) => (isActive ? "active" : "")}>
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

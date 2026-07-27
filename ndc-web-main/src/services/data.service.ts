import { getRequest, postRequest } from "./httpServices";
import { API_ROUTES } from "./route";

// Per-page service functions — same convention as the admin panel's
// data.service.ts (getX per page, thin wrappers around httpServices +
// API_ROUTES).

function page(route: string) {
  return async () => (await getRequest<{ data: any }>(route))?.data ?? null;
}

export const getHome = page(API_ROUTES.HOME);
export const getFooter = page(API_ROUTES.FOOTER);
export const getHeadlineBanner = page(API_ROUTES.HEADLINE_BANNER);
export const getAboutNdc = page(API_ROUTES.ABOUT_NDC);
export const getAdmissions = page(API_ROUTES.ADMISSIONS);
export const getAlumni = page(API_ROUTES.ALUMNI);
export const getApplyNowPage = page(API_ROUTES.APPLY_NOW_PAGE);
export const getCertificateCourses = page(API_ROUTES.CERTIFICATE_COURSES);
export const getContactUsPage = page(API_ROUTES.CONTACT_US_PAGE);
export const getDepartmentsPage = page(API_ROUTES.DEPARTMENTS_PAGE);
export const getGallery = page(API_ROUTES.GALLERY);
export const getIic = page(API_ROUTES.IIC);
export const getIqac = page(API_ROUTES.IQAC);
export const getLibrary = page(API_ROUTES.LIBRARY);
export const getQuestionBank = page(API_ROUTES.QUESTION_BANK);
export const getResearch = page(API_ROUTES.RESEARCH);
export const getResearchForum = page(API_ROUTES.RESEARCH_FORUM);
export const getSamashti = page(API_ROUTES.SAMASHTI);
export const getSports = page(API_ROUTES.SPORTS);
export const getStudents = page(API_ROUTES.STUDENTS);
export const getActivitiesPage = page(API_ROUTES.ACTIVITIES_PAGE);
export const getBlogBanner = page(API_ROUTES.BLOG_BANNER);

// Department sub-type routes, one per src/components/DepartmentTabs/* component.
export const getDepartmentTab = async (route: string) => (await getRequest<{ data: any }>(route))?.data ?? null;

export async function getDepartmentBundle(): Promise<Record<string, any>> {
  const routes = API_ROUTES.DEPARTMENT;
  const entries = await Promise.all(
    Object.entries(routes).map(async ([key, route]) => [key, await getDepartmentTab(route)])
  );
  return Object.fromEntries(entries);
}

// --- Blogs (collection) ---
// Existing blog components read `.id`, matching the old data-export shape;
// the backend's Blog model field is `postId` — normalize here so no
// consuming component needs to know about that rename.
function withId(blog: any) {
  return blog ? { ...blog, id: blog.postId } : blog;
}

export async function getBlogs() {
  const blogs = await getRequest<{ data: any[] }>(API_ROUTES.BLOGS.BASE);
  return blogs?.data ? blogs.data.map(withId) : null;
}
export async function getBlogByPostId(postId: number | string) {
  const blog = await getRequest<{ data: any }>(`${API_ROUTES.BLOGS.BASE}/${postId}`);
  return withId(blog?.data ?? null);
}

export async function getActivityCell(cellId: string) {
  const cell = await getRequest<{ data: any }>(`${API_ROUTES.ACTIVITY_CELLS.BASE}/${cellId}`);
  return cell?.data ?? null;
}

// --- Public form submissions (write-only from the frontend) ---
export const submitApplyNow = (data: any) => postRequest(API_ROUTES.APPLY_NOW_FORMS, data);
export const submitContactUs = (data: any) => postRequest(API_ROUTES.CONTACT_US_FORMS, data);

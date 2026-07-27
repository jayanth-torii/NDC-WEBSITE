import { getRequest, postRequest, putRequest, patchRequest, deleteRequest } from "./httpServices";
import { API_ROUTES } from "./route";

// Per-feature service functions — same convention as NCET's admin
// (src/services/data.service.js): getX/addX/updateX per page, thin wrappers
// around httpServices + API_ROUTES. Every response here is already the
// unwrapped `{ success, data }` body (http.common's interceptor did that);
// callers read `.data` for the actual content.

export const login = (email: string, password: string) => postRequest(API_ROUTES.AUTH.LOGIN, { email, password });
export const getMe = () => getRequest(API_ROUTES.AUTH.ME);

// Generic singleton-page getter/setter — takes any backend route directly.
// Used by the generic JSON fallback editor (works for every Mixed-data page
// immediately) as well as the department sub-type routes below.
export const getPage = (route: string) => getRequest(route);
export const putPage = (route: string, data: any) => putRequest(route, data);

export const getHome = () => getRequest(API_ROUTES.HOME.GET);
export const updateHome = (data: any) => putRequest(API_ROUTES.HOME.UPDATE, data);

export const getFooter = () => getRequest(API_ROUTES.FOOTER.GET);
export const updateFooter = (data: any) => putRequest(API_ROUTES.FOOTER.UPDATE, data);

export const getHeadlineBanner = () => getRequest(API_ROUTES.HEADLINE_BANNER.GET);
export const updateHeadlineBanner = (data: any) => putRequest(API_ROUTES.HEADLINE_BANNER.UPDATE, data);

export const getAboutNdc = () => getRequest(API_ROUTES.ABOUT_NDC.GET);
export const updateAboutNdc = (data: any) => putRequest(API_ROUTES.ABOUT_NDC.UPDATE, data);

export const getAdmissions = () => getRequest(API_ROUTES.ADMISSIONS.GET);
export const updateAdmissions = (data: any) => putRequest(API_ROUTES.ADMISSIONS.UPDATE, data);

export const getAlumni = () => getRequest(API_ROUTES.ALUMNI.GET);
export const updateAlumni = (data: any) => putRequest(API_ROUTES.ALUMNI.UPDATE, data);

export const getApplyNowPage = () => getRequest(API_ROUTES.APPLY_NOW_PAGE.GET);
export const updateApplyNowPage = (data: any) => putRequest(API_ROUTES.APPLY_NOW_PAGE.UPDATE, data);

export const getCertificateCourses = () => getRequest(API_ROUTES.CERTIFICATE_COURSES.GET);
export const updateCertificateCourses = (data: any) => putRequest(API_ROUTES.CERTIFICATE_COURSES.UPDATE, data);

export const getContactUsPage = () => getRequest(API_ROUTES.CONTACT_US_PAGE.GET);
export const updateContactUsPage = (data: any) => putRequest(API_ROUTES.CONTACT_US_PAGE.UPDATE, data);

export const getDepartmentsPage = () => getRequest(API_ROUTES.DEPARTMENTS_PAGE.GET);
export const updateDepartmentsPage = (data: any) => putRequest(API_ROUTES.DEPARTMENTS_PAGE.UPDATE, data);

export const getDepartmentTab = getPage;
export const updateDepartmentTab = putPage;

export const getGallery = () => getRequest(API_ROUTES.GALLERY.GET);
export const updateGallery = (data: any) => putRequest(API_ROUTES.GALLERY.UPDATE, data);

export const getIic = () => getRequest(API_ROUTES.IIC.GET);
export const updateIic = (data: any) => putRequest(API_ROUTES.IIC.UPDATE, data);

export const getIqac = () => getRequest(API_ROUTES.IQAC.GET);
export const updateIqac = (data: any) => putRequest(API_ROUTES.IQAC.UPDATE, data);

export const getLibrary = () => getRequest(API_ROUTES.LIBRARY.GET);
export const updateLibrary = (data: any) => putRequest(API_ROUTES.LIBRARY.UPDATE, data);

export const getQuestionBank = () => getRequest(API_ROUTES.QUESTION_BANK.GET);
export const updateQuestionBank = (data: any) => putRequest(API_ROUTES.QUESTION_BANK.UPDATE, data);

export const getResearch = () => getRequest(API_ROUTES.RESEARCH.GET);
export const updateResearch = (data: any) => putRequest(API_ROUTES.RESEARCH.UPDATE, data);

export const getResearchForum = () => getRequest(API_ROUTES.RESEARCH_FORUM.GET);
export const updateResearchForum = (data: any) => putRequest(API_ROUTES.RESEARCH_FORUM.UPDATE, data);

export const getSamashti = () => getRequest(API_ROUTES.SAMASHTI.GET);
export const updateSamashti = (data: any) => putRequest(API_ROUTES.SAMASHTI.UPDATE, data);

export const getSports = () => getRequest(API_ROUTES.SPORTS.GET);
export const updateSports = (data: any) => putRequest(API_ROUTES.SPORTS.UPDATE, data);

export const getStudents = () => getRequest(API_ROUTES.STUDENTS.GET);
export const updateStudents = (data: any) => putRequest(API_ROUTES.STUDENTS.UPDATE, data);

export const getActivitiesPage = () => getRequest(API_ROUTES.ACTIVITIES_PAGE.GET);
export const updateActivitiesPage = (data: any) => putRequest(API_ROUTES.ACTIVITIES_PAGE.UPDATE, data);

export const getBlogBanner = () => getRequest(API_ROUTES.BLOG_BANNER.GET);
export const updateBlogBanner = (data: any) => putRequest(API_ROUTES.BLOG_BANNER.UPDATE, data);

// --- Blogs (collection) ---
export const getBlogs = () => getRequest(API_ROUTES.BLOGS.GET);
export const getBlogById = (postId: number) => getRequest(`${API_ROUTES.BLOGS.BASE}/${postId}`);
export const addBlog = (data: any) => postRequest(API_ROUTES.BLOGS.ADD, data);
export const updateBlog = (postId: number, data: any) => putRequest(`${API_ROUTES.BLOGS.BASE}/${postId}`, data);
export const deleteBlog = (postId: number) => deleteRequest(`${API_ROUTES.BLOGS.BASE}/${postId}`);

// --- Activity cells (collection) ---
export const getActivityCells = () => getRequest(API_ROUTES.ACTIVITY_CELLS.GET);
export const getActivityCellById = (cellId: string) => getRequest(`${API_ROUTES.ACTIVITY_CELLS.BASE}/${cellId}`);
export const updateActivityCell = (cellId: string, group: string, data: any) =>
  putRequest(`${API_ROUTES.ACTIVITY_CELLS.BASE}/${cellId}`, { group, data });

// --- Form submissions inbox ---
export const getApplyNowSubmissions = (page = 1, limit = 100) =>
  getRequest(API_ROUTES.APPLY_NOW_FORMS.GET, { params: { page, limit } });
export const markApplyNowRead = (id: string) => patchRequest(`${API_ROUTES.APPLY_NOW_FORMS.BASE}/${id}/read`);

export const getContactUsSubmissions = (page = 1, limit = 100) =>
  getRequest(API_ROUTES.CONTACT_US_FORMS.GET, { params: { page, limit } });
export const markContactUsRead = (id: string) => patchRequest(`${API_ROUTES.CONTACT_US_FORMS.BASE}/${id}/read`);

// --- Upload ---
export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return postRequest(API_ROUTES.UPLOAD, formData, { headers: { "Content-Type": "multipart/form-data" } });
};

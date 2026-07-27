// Maps a backend API route to the public frontend page that renders it, so
// a save can call the frontend's on-demand revalidation against a real
// route (ndc-web-main pages use `export const revalidate = 300` per
// segment, not per-fetch tags, since data.service.ts there is axios-based —
// same wiring as this admin). Returns null when there's no server-rendered
// page to revalidate (e.g. Footer/Banner are client-fetched and always
// refetch on mount; Department tabs are client-fetched too).
export function publicPathForRoute(route: string): string | null {
  if (route.startsWith("/department/")) return null;
  const map: Record<string, string> = {
    "/home": "/",
    "/about-ndc": "/about-ndc",
    "/admissions": "/admissions",
    "/alumni": "/alumni",
    "/apply-now-page": "/apply-now",
    "/certificate-courses": "/certificate-courses",
    "/contact-us-page": "/contact-us",
    "/departments-page": "/departments",
    "/gallery": "/gallery",
    "/iic": "/iic",
    "/iqac": "/iqac",
    "/library": "/library",
    "/question-bank": "/question-bank",
    "/research": "/research",
    "/research-forum": "/research-forum",
    "/samashti": "/samashti",
    "/sports": "/sports",
    "/students": "/students",
    "/activities-page": "/activities",
    "/blog-banner": "/blog",
  };
  return map[route] ?? null;
}

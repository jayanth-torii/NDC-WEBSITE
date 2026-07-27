// Calls ndc-web-main's POST /api/revalidate after a save so editors see their
// change live within seconds, instead of waiting out the route-segment ISR
// baseline (`export const revalidate = 300` on each page). The frontend's
// data.service.ts is axios-based (matching this admin's own services
// layer), so per-fetch cache tags don't apply — revalidation is path-based
// instead, matching a real public route. Best-effort: a failure here must
// never block the save itself.
export async function triggerRevalidate(path: string) {
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
  const secret = import.meta.env.VITE_REVALIDATE_SECRET;
  if (!frontendUrl || !secret || !path) return;
  try {
    await fetch(`${frontendUrl}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-revalidate-secret": secret },
      body: JSON.stringify({ path }),
    });
  } catch {
    // best-effort only
  }
}

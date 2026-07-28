import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Called by the admin panel immediately after a successful save so editors
// see their change live within seconds, on top of the 5-minute ISR baseline
// every dataService.ts function already sets. The admin panel is a separate
// origin (its own Vite/static app), so this needs CORS headers on every
// response, including the preflight OPTIONS the browser sends for a POST
// with a custom x-revalidate-secret header. The shared-secret check is what
// actually gates access — reflecting the caller's origin here is safe since
// no cookies/credentials are involved.
function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-revalidate-secret",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get("origin")) });
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req.headers.get("origin"));
  const secret = req.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false, message: "Invalid or missing secret" }, { status: 401, headers });
  }

  const body = await req.json().catch(() => null);
  const path: string | undefined = body?.path;
  const tag: string | undefined = body?.tag;

  if (!path && !tag) {
    return NextResponse.json({ success: false, message: "Provide a path or tag" }, { status: 400, headers });
  }

  if (path) revalidatePath(path);
  if (tag) revalidateTag(tag);

  return NextResponse.json({ success: true }, { headers });
}

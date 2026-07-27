import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Called by the admin panel immediately after a successful save so editors
// see their change live within seconds, on top of the 5-minute ISR baseline
// every dataService.ts function already sets.
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false, message: "Invalid or missing secret" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const path: string | undefined = body?.path;
  const tag: string | undefined = body?.tag;

  if (!path && !tag) {
    return NextResponse.json({ success: false, message: "Provide a path or tag" }, { status: 400 });
  }

  if (path) revalidatePath(path);
  if (tag) revalidateTag(tag);

  return NextResponse.json({ success: true });
}

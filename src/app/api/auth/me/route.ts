import { NextResponse } from "next/server";
import { getAppUser } from "@/lib/auth/session";
import { forbiddenResponse, unauthorizedResponse } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return await getMeResponse();
  } catch (error) {
    console.error("GET /api/auth/me failed", error);
    return NextResponse.json({ error: "Unable to load session" }, { status: 500 });
  }
}

async function getMeResponse() {
  const user = await getAppUser();
  if (!user) {
    return unauthorizedResponse();
  }

  if (user.permissions.size === 0) {
    return forbiddenResponse();
  }

  return NextResponse.json({
    email: user.email,
    permissions: [...user.permissions],
  });
}

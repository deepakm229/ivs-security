import { NextResponse } from "next/server";
import { getAppUser } from "@/lib/auth/session";
import { forbiddenResponse, unauthorizedResponse } from "@/lib/auth/guards";

export async function GET() {
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

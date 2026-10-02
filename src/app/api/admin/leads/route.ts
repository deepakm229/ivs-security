import { NextResponse } from "next/server";
import { PERMISSIONS } from "@/lib/auth/permissions";
import {
  forbiddenResponse,
  requirePermission,
  unauthorizedResponse,
} from "@/lib/auth/guards";
import { ForbiddenError, UnauthorizedError } from "@/lib/auth/errors";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await requirePermission(PERMISSIONS.LEADS_READ);
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    if (error instanceof ForbiddenError) return forbiddenResponse();
    throw error;
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const serviceType = searchParams.get("serviceType");

  const leads = await db.lead.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(serviceType ? { serviceType } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(leads);
}

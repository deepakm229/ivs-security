import { NextResponse } from "next/server";
import { PERMISSIONS } from "@/lib/auth/permissions";
import {
  forbiddenResponse,
  requirePermission,
  unauthorizedResponse,
} from "@/lib/auth/guards";
import { ForbiddenError, UnauthorizedError } from "@/lib/auth/errors";
import { db } from "@/lib/db";
import { leadUpdateSchema } from "@/lib/validations";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requirePermission(PERMISSIONS.LEADS_READ);
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    if (error instanceof ForbiddenError) return forbiddenResponse();
    throw error;
  }

  const { id } = await context.params;
  const lead = await db.lead.findUnique({ where: { id } });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requirePermission(PERMISSIONS.LEADS_WRITE);
  } catch (error) {
    if (error instanceof UnauthorizedError) return unauthorizedResponse();
    if (error instanceof ForbiddenError) return forbiddenResponse();
    throw error;
  }

  const { id } = await context.params;
  const body = await request.json();
  const parsed = leadUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid update" },
      { status: 400 },
    );
  }

  const lead = await db.lead.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json(lead);
}

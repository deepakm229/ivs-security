import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

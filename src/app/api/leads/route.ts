import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";
import { quoteFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 },
      );
    }

    const metadata =
      typeof body.metadata === "object" && body.metadata !== null
        ? body.metadata
        : {};

    const lead = await db.lead.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        serviceType: parsed.data.serviceType,
        location: parsed.data.location,
        message: parsed.data.message || null,
        metadata: JSON.stringify(metadata),
        source: body.source === "CONTACT" ? "CONTACT" : "QUOTE",
      },
    });

    await sendLeadNotification(lead);

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("Lead creation failed:", error);
    return NextResponse.json(
      { error: "Unable to submit request. Please try again." },
      { status: 500 },
    );
  }
}

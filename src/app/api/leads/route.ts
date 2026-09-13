import { NextResponse } from "next/server";
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
        ? (body.metadata as Record<string, string>)
        : {};

    const source = body.source === "CONTACT" ? "CONTACT" : "QUOTE";

    const result = await sendLeadNotification({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      serviceType: parsed.data.serviceType,
      location: parsed.data.location,
      message: parsed.data.message || null,
      metadata,
      source,
    });

    if (!result.ok) {
      console.error("Lead email failed:", result.error);
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? result.error
              : "Unable to submit request. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission failed:", error);
    return NextResponse.json(
      { error: "Unable to submit request. Please try again." },
      { status: 500 },
    );
  }
}

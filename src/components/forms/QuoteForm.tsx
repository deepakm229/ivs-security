"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SERVICE_TYPES, SHIFT_TYPES } from "@/lib/constants";
import {
  buildQuoteMetadata,
  quoteFormSchema,
  type QuoteFormValues,
} from "@/lib/validations";

export function QuoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultService =
    (searchParams.get("service")?.toUpperCase() as QuoteFormValues["serviceType"]) ||
    "RESIDENTIAL";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      serviceType: ["RESIDENTIAL", "COMMERCIAL", "EVENT", "GENERAL"].includes(
        defaultService,
      )
        ? defaultService
        : "RESIDENTIAL",
      name: "",
      phone: "",
      email: "",
      location: "",
      message: "",
    },
  });

  const serviceType = form.watch("serviceType");

  async function onSubmit(values: QuoteFormValues) {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: "QUOTE",
          metadata: buildQuoteMetadata(values),
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to submit quote request");
      }

      router.push("/quote/success");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" {...form.register("name")} placeholder="Your name" />
          {form.formState.errors.name && (
            <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" {...form.register("phone")} placeholder="+91..." />
          {form.formState.errors.phone && (
            <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} placeholder="you@email.com" />
          {form.formState.errors.email && (
            <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceType">Service Type *</Label>
          <Select id="serviceType" {...form.register("serviceType")}>
            {SERVICE_TYPES.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location">Location / Area *</Label>
          <Input id="location" {...form.register("location")} placeholder="Building area or city" />
          {form.formState.errors.location && (
            <p className="text-sm text-red-600">{form.formState.errors.location.message}</p>
          )}
        </div>
      </div>

      {serviceType === "RESIDENTIAL" && (
        <div className="grid gap-5 rounded-xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="buildingName">Building / Society Name</Label>
            <Input id="buildingName" {...form.register("buildingName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardsNeeded">Guards Needed</Label>
            <Input id="guardsNeeded" {...form.register("guardsNeeded")} placeholder="e.g. 4" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shiftType">Shift Type</Label>
            <Select id="shiftType" {...form.register("shiftType")}>
              <option value="">Select shift</option>
              {SHIFT_TYPES.map((shift) => (
                <option key={shift} value={shift}>
                  {shift}
                </option>
              ))}
            </Select>
          </div>
        </div>
      )}

      {serviceType === "COMMERCIAL" && (
        <div className="grid gap-5 rounded-xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Input id="businessType" {...form.register("businessType")} placeholder="Office, warehouse..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardsNeeded">Guards Needed</Label>
            <Input id="guardsNeeded" {...form.register("guardsNeeded")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contractLength">Contract Length</Label>
            <Input id="contractLength" {...form.register("contractLength")} placeholder="6 months, 1 year..." />
          </div>
        </div>
      )}

      {serviceType === "EVENT" && (
        <div className="grid gap-5 rounded-xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="eventDate">Event Date</Label>
            <Input id="eventDate" type="date" {...form.register("eventDate")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventVenue">Venue</Label>
            <Input id="eventVenue" {...form.register("eventVenue")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expectedAttendance">Expected Attendance</Label>
            <Input id="expectedAttendance" {...form.register("expectedAttendance")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardsNeeded">Guards Needed</Label>
            <Input id="guardsNeeded" {...form.register("guardsNeeded")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="eventDuration">Event Duration</Label>
            <Input id="eventDuration" {...form.register("eventDuration")} placeholder="e.g. 6 hours" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Additional Details</Label>
        <Textarea
          id="message"
          {...form.register("message")}
          placeholder="Tell us about your security requirements..."
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Quote Request"}
      </Button>

      <p className="text-sm text-slate-500">
        Prefer WhatsApp?{" "}
        <Link
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? "919876543210"}`}
          className="font-medium text-navy-700 underline"
          target="_blank"
        >
          Message us directly
        </Link>
      </p>
    </form>
  );
}

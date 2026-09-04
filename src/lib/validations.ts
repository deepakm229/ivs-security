import { z } from "zod";

export const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  serviceType: z.enum([
    "RESIDENTIAL",
    "COMMERCIAL",
    "EVENT",
    "INDUSTRIAL",
    "BODYGUARD",
    "GENERAL",
  ]),
  location: z.string().min(2, "Location is required"),
  message: z.string().optional(),
  buildingName: z.string().optional(),
  guardsNeeded: z.string().optional(),
  shiftType: z.string().optional(),
  businessType: z.string().optional(),
  contractLength: z.string().optional(),
  eventDate: z.string().optional(),
  eventVenue: z.string().optional(),
  expectedAttendance: z.string().optional(),
  eventDuration: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const leadUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUOTED", "WON", "LOST"]).optional(),
  notes: z.string().optional(),
});

export function buildQuoteMetadata(values: QuoteFormValues) {
  const metadata: Record<string, string> = {};

  if (values.serviceType === "RESIDENTIAL") {
    if (values.buildingName) metadata.buildingName = values.buildingName;
    if (values.guardsNeeded) metadata.guardsNeeded = values.guardsNeeded;
    if (values.shiftType) metadata.shiftType = values.shiftType;
  }

  if (values.serviceType === "COMMERCIAL") {
    if (values.businessType) metadata.businessType = values.businessType;
    if (values.guardsNeeded) metadata.guardsNeeded = values.guardsNeeded;
    if (values.contractLength) metadata.contractLength = values.contractLength;
  }

  if (values.serviceType === "EVENT") {
    if (values.eventDate) metadata.eventDate = values.eventDate;
    if (values.eventVenue) metadata.eventVenue = values.eventVenue;
    if (values.expectedAttendance) {
      metadata.expectedAttendance = values.expectedAttendance;
    }
    if (values.guardsNeeded) metadata.guardsNeeded = values.guardsNeeded;
    if (values.eventDuration) metadata.eventDuration = values.eventDuration;
  }

  if (values.serviceType === "INDUSTRIAL") {
    if (values.businessType) metadata.businessType = values.businessType;
    if (values.guardsNeeded) metadata.guardsNeeded = values.guardsNeeded;
    if (values.shiftType) metadata.shiftType = values.shiftType;
  }

  if (values.serviceType === "BODYGUARD") {
    if (values.guardsNeeded) metadata.guardsNeeded = values.guardsNeeded;
    if (values.shiftType) metadata.shiftType = values.shiftType;
    if (values.contractLength) metadata.contractLength = values.contractLength;
  }

  return metadata;
}

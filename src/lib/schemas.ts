import { z } from "zod"

export const ProcessStatusSchema = z.enum([
  "Completed",
  "Report Completed",
  "In Progress",
  "Pending",
])

const BaseSchema = z.object({
  title: z.string(),
  status: ProcessStatusSchema,
})

export const TowingServiceSchema = BaseSchema.extend({
  title: z.literal("Towing Service"),
  pickupLocation: z.string(),
  towingDate: z.string(),
})

export const ClaimNotificationSchema = BaseSchema.extend({
  title: z.literal("Claim Notification"),
  dateTime: z.string(),
  reportType: z.string(),
  reasonForDamage: z.string(),
  reportingParty: z.string(),
  contact: z.string(),
})

export const AppraisalSchema = BaseSchema.extend({
  title: z.literal("Appraisal"),
  expertAssignmentDate: z.string(),
  expertInfo: z.string(),
  contact: z.string(),
})

export const SubstituteVehicleSchema = BaseSchema.extend({
  title: z.literal("Substitute Rental Vehicle"),
  vehicleDuration: z.string(),
  vehicleModel: z.string(),
  extraDuration: z.string(),
})

export const FileReviewSchema = BaseSchema.extend({
  title: z.literal("File Review"),
  reviewReferralDate: z.string(),
  reviewCompletionDate: z.string(),
})

export const DeductionReasonSchema = BaseSchema.extend({
  title: z.literal("Deduction Reason"),
  actionRequired: z.string().optional(),
  occupationalDeduction: z.string(),
  appreciationDeduction: z.string(),
  policyDeductible: z.string(),
})

export const PaymentInfoSchema = BaseSchema.extend({
  title: z.literal("Payment Information"),
  paidTo: z.string(),
  iban: z.string(),
  paymentAmount: z.string(),
  note: z.string().optional(),
})

export const ClosedSchema = BaseSchema.extend({
  title: z.literal("Closed"),
  completionDate: z.string(),
})

export const ProcessDetailSchema = z.discriminatedUnion("title", [
  TowingServiceSchema,
  ClaimNotificationSchema,
  AppraisalSchema,
  SubstituteVehicleSchema,
  FileReviewSchema,
  DeductionReasonSchema,
  PaymentInfoSchema,
  ClosedSchema,
])

export const ClaimSchema = z.object({
  title: z.string(),
  fileNo: z.string(),
  estimatedRemainingTime: z.string(),
  currentStatus: z.string(),
  nonDamageAmount: z.string(),
  processDetails: z.array(ProcessDetailSchema),
})

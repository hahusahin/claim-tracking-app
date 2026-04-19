import { z } from "zod"
import {
  ClaimSchema,
  ProcessDetailSchema,
  ProcessStatusSchema,
  TowingServiceSchema,
  ClaimNotificationSchema,
  AppraisalSchema,
  SubstituteVehicleSchema,
  FileReviewSchema,
  DeductionReasonSchema,
  PaymentInfoSchema,
  ClosedSchema,
} from "@/lib/schemas"

export type ClaimData = z.infer<typeof ClaimSchema>
export type ProcessDetail = z.infer<typeof ProcessDetailSchema>
export type ProcessStatus = z.infer<typeof ProcessStatusSchema>

export type TowingServiceData = z.infer<typeof TowingServiceSchema>
export type ClaimNotificationData = z.infer<typeof ClaimNotificationSchema>
export type AppraisalData = z.infer<typeof AppraisalSchema>
export type SubstituteVehicleData = z.infer<typeof SubstituteVehicleSchema>
export type FileReviewData = z.infer<typeof FileReviewSchema>
export type DeductionReasonData = z.infer<typeof DeductionReasonSchema>
export type PaymentInfoData = z.infer<typeof PaymentInfoSchema>
export type ClosedData = z.infer<typeof ClosedSchema>

export interface NodeProps<TData = ProcessDetail> {
  data: TData
  stepIndex: number
  isActive: boolean
}

export interface AttachmentFile {
  id: string
  fileName: string
}

export interface DocAnalysisResult {
  valid: boolean
  confidence: number
  reason: string
  fileName: string
}

import React from "react"
import { TowingServiceNode } from "./TowingServiceNode"
import { ClaimNotificationNode } from "./ClaimNotificationNode"
import { AppraisalNode } from "./AppraisalNode"
import { SubstituteVehicleNode } from "./SubstituteVehicleNode"
import { FileReviewNode } from "./FileReviewNode"
import { DeductionReasonNode } from "./DeductionReasonNode"
import { PaymentInfoNode } from "./PaymentInfoNode"
import { ClosedNode } from "./ClosedNode"
import { GenericNode } from "./GenericNode"

import type { NodeProps, ProcessDetail } from "@/types/claim.types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeRegistry: Record<string, React.FC<NodeProps<any>>> = {
  "Towing Service": TowingServiceNode,
  "Claim Notification": ClaimNotificationNode,
  Appraisal: AppraisalNode,
  "Substitute Rental Vehicle": SubstituteVehicleNode,
  "File Review": FileReviewNode,
  "Deduction Reason": DeductionReasonNode,
  "Payment Information": PaymentInfoNode,
  Closed: ClosedNode,
}

export function resolveNode(title: string): React.FC<NodeProps<ProcessDetail>> {
  return nodeRegistry[title] ?? GenericNode
}

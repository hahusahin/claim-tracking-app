import { StepCard } from "@/components/claim/StepCard"
import { DetailRow } from "@/components/claim/DetailRow"
import { useAIAssistant } from "@/hooks/useAIAssistant"

import type { NodeProps, ClaimNotificationData } from "@/types/claim.types"

export function ClaimNotificationNode({
  data,
  stepIndex,
  isActive,
}: NodeProps<ClaimNotificationData>) {
  const { explainStep } = useAIAssistant()
  return (
    <StepCard
      title={data.title}
      status={data.status}
      stepNumber={stepIndex + 1}
      isActive={isActive}
      onExplainWithAI={() => explainStep(data)}
    >
      <DetailRow label="Date & Time" value={data.dateTime} />
      <DetailRow label="Report Type" value={data.reportType} />
      <DetailRow label="Reason for Damage" value={data.reasonForDamage} />
      <DetailRow label="Reporting Party" value={data.reportingParty} />
      <DetailRow label="Contact" value={data.contact} />
    </StepCard>
  )
}

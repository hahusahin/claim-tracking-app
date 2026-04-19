import { StepCard } from "@/components/claim/StepCard"
import { DetailRow } from "@/components/claim/DetailRow"
import { useAIAssistant } from "@/hooks/useAIAssistant"

import type { NodeProps, FileReviewData } from "@/types/claim.types"

export function FileReviewNode({
  data,
  stepIndex,
  isActive,
}: NodeProps<FileReviewData>) {
  const { explainStep } = useAIAssistant()
  return (
    <StepCard
      title={data.title}
      status={data.status}
      stepNumber={stepIndex + 1}
      isActive={isActive}
      onExplainWithAI={() => explainStep(data)}
    >
      <DetailRow label="Referral Date" value={data.reviewReferralDate} />
      <DetailRow label="Completion Date" value={data.reviewCompletionDate} />
    </StepCard>
  )
}

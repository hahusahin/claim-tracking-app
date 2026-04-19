import { StepCard } from "@/components/claim/StepCard"
import { DetailRow } from "@/components/claim/DetailRow"
import { useAIAssistant } from "@/hooks/useAIAssistant"

import type { NodeProps, AppraisalData } from "@/types/claim.types"

export function AppraisalNode({
  data,
  stepIndex,
  isActive,
}: NodeProps<AppraisalData>) {
  const { explainStep } = useAIAssistant()
  return (
    <StepCard
      title={data.title}
      status={data.status}
      stepNumber={stepIndex + 1}
      isActive={isActive}
      onExplainWithAI={() => explainStep(data)}
    >
      <DetailRow label="Assignment Date" value={data.expertAssignmentDate} />
      <DetailRow label="Expert" value={data.expertInfo} />
      <DetailRow label="Contact" value={data.contact} />
    </StepCard>
  )
}

import { StepCard } from "@/components/claim/StepCard"
import { DetailRow } from "@/components/claim/DetailRow"
import { useAIAssistant } from "@/hooks/useAIAssistant"

import type { NodeProps, ClosedData } from "@/types/claim.types"

export function ClosedNode({
  data,
  stepIndex,
  isActive,
}: NodeProps<ClosedData>) {
  const { explainStep } = useAIAssistant()
  return (
    <StepCard
      title={data.title}
      status={data.status}
      stepNumber={stepIndex + 1}
      isActive={isActive}
      onExplainWithAI={() => explainStep(data)}
    >
      <DetailRow label="Completion Date" value={data.completionDate} />
    </StepCard>
  )
}

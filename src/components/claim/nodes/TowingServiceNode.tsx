import { StepCard } from "@/components/claim/StepCard"
import { DetailRow } from "@/components/claim/DetailRow"
import { useAIAssistant } from "@/hooks/useAIAssistant"

import type { NodeProps, TowingServiceData } from "@/types/claim.types"

export function TowingServiceNode({
  data,
  stepIndex,
  isActive,
}: NodeProps<TowingServiceData>) {
  const { explainStep } = useAIAssistant()
  return (
    <StepCard
      title={data.title}
      status={data.status}
      stepNumber={stepIndex + 1}
      isActive={isActive}
      onExplainWithAI={() => explainStep(data)}
    >
      <DetailRow label="Pickup Location" value={data.pickupLocation} />
      <DetailRow label="Towing Date" value={data.towingDate} />
    </StepCard>
  )
}

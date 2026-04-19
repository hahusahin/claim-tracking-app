import { StepCard } from "@/components/claim/StepCard"
import { DetailRow } from "@/components/claim/DetailRow"
import { useAIAssistant } from "@/hooks/useAIAssistant"

import type { NodeProps, SubstituteVehicleData } from "@/types/claim.types"

export function SubstituteVehicleNode({
  data,
  stepIndex,
  isActive,
}: NodeProps<SubstituteVehicleData>) {
  const { explainStep } = useAIAssistant()
  return (
    <StepCard
      title={data.title}
      status={data.status}
      stepNumber={stepIndex + 1}
      isActive={isActive}
      onExplainWithAI={() => explainStep(data)}
    >
      <DetailRow label="Vehicle Model" value={data.vehicleModel} />
      <DetailRow label="Duration" value={data.vehicleDuration} />
      <DetailRow label="Extra Duration" value={data.extraDuration} />
    </StepCard>
  )
}

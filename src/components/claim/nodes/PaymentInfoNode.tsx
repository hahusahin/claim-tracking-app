import { StepCard } from "@/components/claim/StepCard"
import { DetailRow } from "@/components/claim/DetailRow"
import { useAIAssistant } from "@/hooks/useAIAssistant"

import type { NodeProps, PaymentInfoData } from "@/types/claim.types"

export function PaymentInfoNode({
  data,
  stepIndex,
  isActive,
}: NodeProps<PaymentInfoData>) {
  const { explainStep } = useAIAssistant()
  return (
    <StepCard
      title={data.title}
      status={data.status}
      stepNumber={stepIndex + 1}
      isActive={isActive}
      onExplainWithAI={() => explainStep(data)}
    >
      <DetailRow label="Paid To" value={data.paidTo} />
      <DetailRow label="IBAN" value={data.iban} mono />
      <DetailRow label="Payment Amount" value={data.paymentAmount} />
      {data.note && <DetailRow label="Note" value={data.note} />}
    </StepCard>
  )
}

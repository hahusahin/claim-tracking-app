import { useQuery } from "@tanstack/react-query"
import { useAIStore } from "@/stores/aiStore"
import type { ProcessDetail } from "@/types/claim.types"

const AI_EXPLANATIONS: Record<string, string> = {
  "Towing Service":
    "Your vehicle was safely retrieved from the incident location and transported to our partner service facility. The towing service is fully covered under your policy at no extra cost to you.",
  "Claim Notification":
    "This is the official record of your claim being opened. An 'Agreed Minutes' report means both parties involved in the incident documented and agreed on the facts at the scene — this strengthens your claim.",
  Appraisal:
    "A licensed expert inspector assessed the damage to your vehicle and prepared an official appraisal report. This report determines the repair cost and is the basis for your payment calculation.",
  "Substitute Rental Vehicle":
    "While your vehicle is being repaired, your policy entitles you to a courtesy car for up to the number of days shown. This is covered by your 'Loss of Use' benefit.",
  "File Review":
    "Our claims team is reviewing all documents — the police report, appraisal, and your policy details — to verify coverage and calculate the final settlement amount. This is a standard compliance step.",
  "Deduction Reason":
    "Three standard deductions apply to your settlement: (1) Occupational Deduction — a regulatory amount based on vehicle age; (2) Appreciation Deduction — adjusts for parts that improved in value; (3) Policy Deductible — the fixed amount you agreed to pay out-of-pocket when you bought the policy.",
  "Payment Information":
    "Once all documents are approved, the settlement amount will be transferred directly to the IBAN on file. Please verify the account details are correct. 'Payment Refunded' means the transfer has been initiated.",
  Closed:
    "Your claim file will be officially closed once all steps are completed and the payment is confirmed. No further action will be needed from you after this point.",
}

async function fetchExplanation(step: ProcessDetail): Promise<string> {
  // Simulate AI response latency
  await new Promise((resolve) => setTimeout(resolve, 1600))
  return (
    AI_EXPLANATIONS[step.title] ??
    "This step is part of the standard claims process. Our team is handling it according to your policy terms."
  )
}

export function useAIExplanation() {
  const activeStep = useAIStore((s) => s.activeStep)

  return useQuery({
    queryKey: ["ai-explanation", activeStep?.title ?? ""],
    queryFn: () => fetchExplanation(activeStep!),
    enabled: !!activeStep,
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000,
  })
}

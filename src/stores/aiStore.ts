import { create } from "zustand"
import type { ProcessDetail } from "@/types/claim.types"

interface AIStore {
  activeStep: ProcessDetail | null
  setActiveStep: (step: ProcessDetail | null) => void
  clearExplanation: () => void
  expandedStepIndex: number | null
  setExpandedStepIndex: (index: number | null) => void
}

export const useAIStore = create<AIStore>((set) => ({
  activeStep: null,
  setActiveStep: (step) => set({ activeStep: step }),
  clearExplanation: () => set({ activeStep: null }),
  expandedStepIndex: null,
  setExpandedStepIndex: (index) => set({ expandedStepIndex: index }),
}))

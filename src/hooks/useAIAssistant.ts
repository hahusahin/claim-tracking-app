import { useAIStore } from "@/stores/aiStore"

export function useAIAssistant() {
  const explainStep = useAIStore((s) => s.setActiveStep)
  return { explainStep }
}

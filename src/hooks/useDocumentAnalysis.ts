import { useMutation } from "@tanstack/react-query"
import type { DocAnalysisResult } from "@/types/claim.types"

const MOCK_RESULTS: Omit<DocAnalysisResult, "fileName">[] = [
  {
    valid: true,
    confidence: 97,
    reason:
      "Document verified successfully. The Occupational Certificate is legible, contains a valid stamp, and matches the policyholder's registered occupation. You may proceed with submission.",
  },
  {
    valid: false,
    confidence: 82,
    reason:
      "The document appears to be expired (issue date exceeds 6 months). Please provide a current Occupational Certificate issued within the last 6 months.",
  },
]

async function analyzeDocumentRequest(file: File): Promise<DocAnalysisResult> {
  // Simulate AI document analysis latency
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const template = MOCK_RESULTS[Math.random() > 0.35 ? 0 : 1]
  return { ...template, fileName: file.name }
}

export function useDocumentAnalysis() {
  return useMutation({
    mutationFn: analyzeDocumentRequest,
  })
}

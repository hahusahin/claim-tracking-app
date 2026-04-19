import { useRef } from "react"
import { AlertTriangle, Upload, Loader2 } from "lucide-react"
import { StepCard } from "@/components/claim/StepCard"
import { DetailRow } from "@/components/claim/DetailRow"
import { AIDocAnalyzer } from "@/components/ai/AIDocAnalyzer"
import { Button } from "@/components/ui/button"
import { useAIAssistant } from "@/hooks/useAIAssistant"
import { useDocumentAnalysis } from "@/hooks/useDocumentAnalysis"

import type { NodeProps, DeductionReasonData } from "@/types/claim.types"

export function DeductionReasonNode({
  data,
  stepIndex,
  isActive,
}: NodeProps<DeductionReasonData>) {
  const { explainStep } = useAIAssistant()
  const {
    mutate: analyzeDocument,
    data: docAnalysisResult,
    isPending: isAnalyzing,
  } = useDocumentAnalysis()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) analyzeDocument(file)
  }

  return (
    <StepCard
      title={data.title}
      status={data.status}
      stepNumber={stepIndex + 1}
      isActive={isActive}
      hasAction={!!data.actionRequired}
      onExplainWithAI={() => explainStep(data)}
    >
      {/* Action required banner */}
      {data.actionRequired && (
        <div className="mb-3 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Action Required
            </p>
            <p className="text-sm text-amber-700">{data.actionRequired}</p>
          </div>
        </div>
      )}

      {/* Deduction table */}
      <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
        <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase underline">
          Deduction Summary
        </p>
        <div className="space-y-3 sm:space-y-1.5">
          <DetailRow
            label="Occupational Deduction"
            value={data.occupationalDeduction}
          />
          <DetailRow
            label="Appreciation Deduction"
            value={data.appreciationDeduction}
          />
          <DetailRow label="Policy Deductible" value={data.policyDeductible} />
        </div>
      </div>

      {/* Upload section */}
      {data.actionRequired && (
        <div className="mt-3">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFile}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <Button
            onClick={() => inputRef.current?.click()}
            disabled={isAnalyzing}
            className="w-full gap-2 bg-blue-700 hover:bg-blue-800 sm:w-auto"
            size="sm"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing document...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Occupational Certificate
              </>
            )}
          </Button>

          {docAnalysisResult && (
            <div className="mt-3">
              <AIDocAnalyzer result={docAnalysisResult} />
            </div>
          )}
        </div>
      )}
    </StepCard>
  )
}

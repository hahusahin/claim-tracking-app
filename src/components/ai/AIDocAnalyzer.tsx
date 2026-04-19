import { CheckCircle2, XCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

import type { DocAnalysisResult } from "@/types/claim.types"

interface AIDocAnalyzerProps {
  result: DocAnalysisResult
}

export function AIDocAnalyzer({ result }: AIDocAnalyzerProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        result.valid
          ? "border-emerald-200 bg-emerald-50"
          : "border-red-200 bg-red-50",
      )}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <Sparkles
          className={cn(
            "h-3.5 w-3.5",
            result.valid ? "text-emerald-600" : "text-red-500",
          )}
        />
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          AI Document Analysis
        </span>
        <span className="ml-auto text-xs text-slate-400">
          {result.confidence}% confidence
        </span>
      </div>

      <div className="flex items-start gap-2">
        {result.valid ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        ) : (
          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
        )}
        <div>
          <p
            className={cn(
              "text-sm font-semibold",
              result.valid ? "text-emerald-800" : "text-red-700",
            )}
          >
            {result.valid ? "Document Verified" : "Verification Failed"}
          </p>
          <p
            className={cn(
              "mt-0.5 text-sm",
              result.valid ? "text-emerald-700" : "text-red-600",
            )}
          >
            {result.reason}
          </p>
          {result.fileName && (
            <p className="mt-1 text-xs text-slate-400">File: {result.fileName}</p>
          )}
        </div>
      </div>
    </div>
  )
}

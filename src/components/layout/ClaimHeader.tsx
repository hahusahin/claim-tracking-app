import { AlertTriangle, Clock, FileText, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

import type { ClaimData, ProcessDetail } from "@/types/claim.types"

interface ClaimHeaderProps {
  claim: ClaimData
}

function getActionStep(details: ProcessDetail[]): ProcessDetail | undefined {
  return details.find((d) => "actionRequired" in d && d.actionRequired)
}

export function ClaimHeader({ claim }: ClaimHeaderProps) {
  const actionStep = getActionStep(claim.processDetails)

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand row */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Insurance Claims Portal
          </span>
        </div>

        {/* Info row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {claim.title}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                File No:&nbsp;
                <span className="font-mono font-semibold text-slate-700">
                  {claim.fileNo}
                </span>
              </span>
            </div>
          </div>

          {/* Status chips */}
          <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
            <StatusBadge status={claim.currentStatus} />
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
              )}
            >
              <Clock className="h-3.5 w-3.5" />
              Est. {claim.estimatedRemainingTime} remaining
            </div>
          </div>
        </div>

        {/* Action alert */}
        {actionStep && "actionRequired" in actionStep && (
          <Alert className="mt-4 border-amber-200 bg-amber-50 text-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="font-medium">
              Action required:{" "}
              <span className="font-semibold">{actionStep.actionRequired}</span>
              <span className="ml-1 font-normal text-amber-700">
                — scroll to{" "}
                <span className="font-medium">Deduction Reason</span> step
                below.
              </span>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </header>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className="bg-blue-700 text-white hover:bg-blue-800">{status}</Badge>
  )
}

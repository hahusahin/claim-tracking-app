import { cn } from "@/lib/utils"

import type { ProcessStatus } from "@/types/claim.types"

const STATUS_STYLES: Record<ProcessStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Report Completed": "bg-teal-50 text-teal-700 ring-teal-200",
  "In Progress": "bg-blue-50 text-blue-700 ring-blue-200",
  Pending: "bg-slate-100 text-slate-500 ring-slate-200",
}

const DOT_STYLES: Record<ProcessStatus, string> = {
  Completed: "bg-emerald-500",
  "Report Completed": "bg-teal-500",
  "In Progress": "bg-blue-500 animate-pulse",
  Pending: "bg-slate-400",
}

interface StatusBadgeProps {
  status: ProcessStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",
        STATUS_STYLES[status]
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT_STYLES[status])} />
      {status}
    </span>
  )
}

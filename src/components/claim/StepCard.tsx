import { useState } from "react"
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "./StatusBadge"
import { cn } from "@/lib/utils"
import { useAIStore } from "@/stores/aiStore"

import type { ProcessStatus } from "@/types/claim.types"

const BORDER_COLORS: Record<ProcessStatus, string> = {
  Completed: "border-l-emerald-500",
  "Report Completed": "border-l-teal-500",
  "In Progress": "border-l-blue-600",
  Pending: "border-l-slate-300",
}

interface StepCardProps {
  title: string
  status: ProcessStatus
  stepNumber: number
  isActive: boolean
  hasAction?: boolean
  onExplainWithAI: () => void
  children: React.ReactNode
}

export function StepCard({
  title,
  status,
  stepNumber,
  isActive,
  hasAction = false,
  onExplainWithAI,
  children,
}: StepCardProps) {
  const [expanded, setExpanded] = useState(isActive || hasAction)
  const expandedStepIndex = useAIStore((s) => s.expandedStepIndex)
  const [prevExpandedStepIndex, setPrevExpandedStepIndex] = useState(expandedStepIndex)

  if (expandedStepIndex !== prevExpandedStepIndex) {
    setPrevExpandedStepIndex(expandedStepIndex)
    if (expandedStepIndex === stepNumber - 1) setExpanded(true)
  }

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden rounded-lg border border-l-4 border-slate-200 py-0 ring-0",
        BORDER_COLORS[status],
        isActive && "shadow-md",
        hasAction && "bg-amber-50/20"
      )}
    >
      <Button
        variant="ghost"
        onClick={() => setExpanded((v) => !v)}
        className="h-auto w-full cursor-pointer justify-between rounded-none px-4 py-3 font-normal hover:bg-slate-50 sm:px-5"
        aria-expanded={expanded}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
            {stepNumber}
          </span>
          <span className="truncate font-semibold text-slate-800">{title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatusBadge status={status} />
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </Button>

      {expanded && (
        <div className="border-t border-slate-100 px-4 pt-3 pb-4 sm:px-5">
          <div className="space-y-4 sm:space-y-2">{children}</div>

          <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onExplainWithAI()
              }}
              className="gap-1.5 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Explain with AI
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

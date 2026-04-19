import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAIStore } from "@/stores/aiStore"

import type { ProcessDetail, ProcessStatus } from "@/types/claim.types"

const STATUS_DOT: Record<ProcessStatus, string> = {
  Completed: "bg-emerald-500",
  "Report Completed": "bg-teal-500",
  "In Progress": "bg-blue-500 animate-pulse",
  Pending: "bg-slate-300",
}

interface TimelineSidebarProps {
  processDetails: ProcessDetail[]
}

export function TimelineSidebar({ processDetails }: TimelineSidebarProps) {
  const setExpandedStepIndex = useAIStore((s) => s.setExpandedStepIndex)

  const completedCount = processDetails.filter(
    (d) => d.status === "Completed" || d.status === "Report Completed"
  ).length
  const progress = Math.round((completedCount / processDetails.length) * 100)

  function scrollToStep(index: number) {
    setExpandedStepIndex(index)
    document
      .getElementById(`step-${index}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <Card className="gap-0 overflow-hidden rounded-lg py-0 ring-0">
      {/* Progressbar */}
      <div className="bg-blue-700 px-4 py-4 text-white">
        <p className="text-xs font-semibold tracking-wider text-blue-200 uppercase">
          Claim Progress
        </p>
        <p className="mt-1 text-sm font-medium">
          {completedCount} of {processDetails.length} steps completed
        </p>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-blue-800/60">
          <div
            className="h-full rounded-full bg-white transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step navigator */}
      <div className="divide-y divide-slate-100">
        {processDetails.map((step, index) => (
          <Button
            key={step.title}
            variant="ghost"
            onClick={() => scrollToStep(index)}
            className="h-auto w-full cursor-pointer justify-start rounded-none px-4 py-2.5 font-normal hover:bg-slate-50"
          >
            <span className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
              {index + 1}
            </span>
            <span className="flex-1 truncate text-left text-sm text-slate-700">
              {step.title}
            </span>
            <span
              className={cn(
                "ml-2 h-2 w-2 shrink-0 rounded-full",
                STATUS_DOT[step.status]
              )}
            />
          </Button>
        ))}
      </div>
    </Card>
  )
}

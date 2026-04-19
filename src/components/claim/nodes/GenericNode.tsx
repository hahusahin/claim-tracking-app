import { Card } from "@/components/ui/card"
import type { NodeProps, ProcessDetail } from "@/types/claim.types"

export function GenericNode({ data, stepIndex, isActive }: NodeProps<ProcessDetail>) {
  return (
    <Card className="gap-0 overflow-hidden rounded-lg border border-slate-200 py-0 ring-0">
      <div className="px-4 py-3">
        <p className="font-semibold text-slate-800">
          {stepIndex + 1}. {data.title}
        </p>
        <p className="mt-1 text-sm text-slate-500">{data.status}</p>
        {isActive && (
          <span className="mt-2 inline-block text-xs text-blue-600">
            Active step
          </span>
        )}
      </div>
    </Card>
  )
}

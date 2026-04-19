import { Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useAIStore } from "@/stores/aiStore"
import { useAIExplanation } from "@/hooks/useAIExplanation"

export function AIExplainPanel() {
  const { activeStep, clearExplanation } = useAIStore()
  const { data: explanation, isLoading: isExplaining } = useAIExplanation()

  const open = !!activeStep

  return (
    <Dialog open={open} onOpenChange={(v) => !v && clearExplanation()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:w-full lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700">
            <Sparkles className="h-4 w-4" />
            AI Explanation
          </DialogTitle>
        </DialogHeader>

        {activeStep && (
          <div className="space-y-3">
            <div className="rounded-md bg-slate-100 px-3 py-2">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Step
              </p>
              <p className="mt-0.5 font-semibold text-slate-800">
                {activeStep.title}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                Plain Language Explanation
              </p>
              {isExplaining ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-slate-700">
                  {explanation}
                </p>
              )}
            </div>

            <p className="text-xs text-slate-400">
              * AI-generated explanation for informational purposes only.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

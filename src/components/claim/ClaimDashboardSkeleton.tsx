import { Skeleton } from "@/components/ui/skeleton"

function NodeSkeleton() {
  return (
    <div className="rounded-lg border border-l-4 border-slate-200 border-l-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
    </div>
  )
}

export function ClaimDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header skeleton */}
      <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-56" />
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Skeleton className="h-6 w-40 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Timeline skeleton */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <NodeSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  )
}

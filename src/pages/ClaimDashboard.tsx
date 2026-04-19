import { useClaimData } from "@/hooks/useClaimData"
import { AppLayout } from "@/components/layout/AppLayout"
import { ClaimDashboardSkeleton } from "@/components/claim/ClaimDashboardSkeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

export function ClaimDashboard() {
  const { data, isLoading, isError, error, refetch } = useClaimData()

  if (isLoading) return <ClaimDashboardSkeleton />

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Failed to load claim data</AlertTitle>
            <AlertDescription className="mt-1">
              {error?.message ?? "An unexpected error occurred."}
            </AlertDescription>
          </Alert>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="mt-4 w-full gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!data) return null

  return <AppLayout claim={data} />
}

import { useQuery } from "@tanstack/react-query"
import { ClaimSchema } from "@/lib/schemas"

import type { ClaimData } from "@/types/claim.types"

async function fetchClaimData(): Promise<ClaimData> {
  // Simulate network latency so loading skeletons are visible
  await new Promise((resolve) => setTimeout(resolve, 1200))
  const module = await import("@/data/mockClaim.json")
  return ClaimSchema.parse(module.default)
}

export function useClaimData() {
  return useQuery<ClaimData, Error>({
    queryKey: ["claim"],
    queryFn: fetchClaimData,
    staleTime: Infinity,
    retry: 1,
  })
}

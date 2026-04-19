import type { ClaimData } from "@/types/claim.types"
import { ClaimHeader } from "./ClaimHeader"
import { ClaimTimeline } from "@/components/claim/ClaimTimeline"
import { TimelineSidebar } from "./TimelineSidebar"

interface AppLayoutProps {
  claim: ClaimData
}

export function AppLayout({ claim }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <ClaimHeader claim={claim} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <TimelineSidebar processDetails={claim.processDetails} />
            </div>
          </aside>

          {/* Main timeline */}
          <main className="min-w-0">
            <ClaimTimeline processDetails={claim.processDetails} />
          </main>
        </div>
      </div>
    </div>
  )
}

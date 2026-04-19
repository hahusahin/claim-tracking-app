import { useEffect, useRef } from "react"
import { resolveNode } from "./nodes/registry"
import { InsertNodeButton } from "./InsertNodeButton"
import { UserNoteNode } from "./UserNoteNode"
import { UserAttachmentGroupNode } from "./UserAttachmentGroupNode"
import { AIExplainPanel } from "@/components/ai/AIExplainPanel"
import { useClaimStore } from "@/stores/claimStore"

import type { ProcessDetail } from "@/types/claim.types"

interface ClaimTimelineProps {
  processDetails: ProcessDetail[]
}

function getActiveIndex(details: ProcessDetail[]): number {
  const inProgressIdx = details.findIndex((d) => d.status === "In Progress")
  if (inProgressIdx !== -1) return inProgressIdx
  return details.findIndex((d) => d.status === "Pending")
}

export function ClaimTimeline({ processDetails }: ClaimTimelineProps) {
  const notes = useClaimStore((s) => s.notes)
  const attachments = useClaimStore((s) => s.attachments)
  const activeIndex = getActiveIndex(processDetails)
  const activeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeRef.current) {
        activeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="space-y-0">
        {processDetails.map((step, index) => {
          const NodeComponent = resolveNode(step.title)
          const isActive = index === activeIndex
          const hasNote = index in notes
          const hasAttachments = index in attachments

          return (
            <div key={step.title} className="space-y-0">
              <div
                className="scroll-m-8"
                id={`step-${index}`}
                ref={isActive ? activeRef : undefined}
              >
                <NodeComponent
                  data={step}
                  stepIndex={index}
                  isActive={isActive}
                />
              </div>

              {hasNote && (
                <div className="mt-2">
                  <UserNoteNode afterIndex={index} />
                </div>
              )}

              {hasAttachments && (
                <div className="mt-2">
                  <UserAttachmentGroupNode afterIndex={index} />
                </div>
              )}

              {index < processDetails.length - 1 && (
                <InsertNodeButton afterIndex={index} />
              )}
            </div>
          )
        })}
      </div>

      {/* AI explanation modal */}
      <AIExplainPanel />
    </>
  )
}

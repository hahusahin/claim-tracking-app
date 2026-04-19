import { useRef } from "react"
import { Paperclip, Trash2, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useClaimStore } from "@/stores/claimStore"

import type { DynamicNode } from "@/types/claim.types"

interface UserAttachmentNodeProps {
  node: DynamicNode
}

export function UserAttachmentNode({ node }: UserAttachmentNodeProps) {
  const removeNode = useClaimStore((s) => s.removeNode)
  const updateNodeFile = useClaimStore((s) => s.updateNodeFile)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) updateNodeFile(node.id, file.name)
  }

  return (
    <div className="rounded-lg border border-dashed border-violet-200 bg-violet-50/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-violet-700">
          <Paperclip className="h-4 w-4" />
          Additional Attachment
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeNode(node.id)}
          className="h-7 w-7 text-slate-400 hover:text-red-500"
          aria-label="Remove attachment"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFile}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />

      {node.fileName ? (
        <div className="flex items-center gap-2 rounded-md border border-violet-200 bg-white px-3 py-2">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
          <span className="truncate text-sm text-slate-700">{node.fileName}</span>
          <button
            onClick={() => updateNodeFile(node.id, "")}
            className="ml-auto text-xs text-slate-400 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-violet-300 bg-white py-3 text-sm text-violet-600 transition-colors hover:border-violet-400 hover:bg-violet-50"
        >
          <Upload className="h-4 w-4" />
          Click to upload file
        </button>
      )}
    </div>
  )
}

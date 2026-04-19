import { useRef } from "react"
import { Paperclip, Trash2, Upload, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useClaimStore } from "@/stores/claimStore"

interface UserAttachmentGroupNodeProps {
  afterIndex: number
}

export function UserAttachmentGroupNode({
  afterIndex,
}: UserAttachmentGroupNodeProps) {
  const files = useClaimStore((s) => s.attachments[afterIndex] ?? [])
  const addAttachmentFile = useClaimStore((s) => s.addAttachmentFile)
  const removeAttachmentFile = useClaimStore((s) => s.removeAttachmentFile)
  const deactivateAttachments = useClaimStore((s) => s.deactivateAttachments)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      addAttachmentFile(afterIndex, file.name)
      e.target.value = ""
    }
  }

  return (
    <Card className="gap-0 overflow-hidden rounded-lg border border-dashed border-violet-200 bg-violet-50/40 py-0 ring-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-violet-100 px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium text-violet-700">
          <Paperclip className="h-4 w-4" />
          Additional Attachments
          {files.length > 0 && (
            <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-xs text-violet-600">
              {files.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="h-7 gap-1 text-xs text-violet-600 hover:text-violet-700"
          >
            + Add File
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deactivateAttachments(afterIndex)}
            className="h-7 w-7 text-slate-400 hover:text-red-500"
            aria-label="Remove attachment group"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFile}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />

      <div className="p-4">
        {files.length === 0 ? (
          <Button
            variant="outline"
            onClick={() => inputRef.current?.click()}
            className="w-full gap-2 border-dashed border-violet-300 text-violet-600 hover:border-violet-400 hover:bg-violet-50"
          >
            <Upload className="h-4 w-4" />
            Click to upload file
          </Button>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 rounded-md border border-violet-200 bg-white px-3 py-2"
              >
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                <span className="flex-1 truncate text-sm text-slate-700">
                  {file.fileName}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttachmentFile(afterIndex, file.id)}
                  className="h-6 w-6 shrink-0 text-slate-400 hover:text-red-500"
                  aria-label={`Remove ${file.fileName}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

import { FileText, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useClaimStore } from "@/stores/claimStore"

interface UserNoteNodeProps {
  afterIndex: number
}

export function UserNoteNode({ afterIndex }: UserNoteNodeProps) {
  const content = useClaimStore((s) => s.notes[afterIndex] ?? "")
  const setNoteContent = useClaimStore((s) => s.setNoteContent)
  const removeNote = useClaimStore((s) => s.removeNote)

  return (
    <Card className="gap-0 overflow-hidden rounded-lg border border-dashed border-blue-200 bg-blue-50/40 py-0 ring-0">
      <div className="flex items-center justify-between border-b border-blue-100 px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
          <FileText className="h-4 w-4" />
          Information Note
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeNote(afterIndex)}
          className="h-7 w-7 text-slate-400 hover:text-red-500"
          aria-label="Remove note"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="p-4">
        <Textarea
          placeholder="Add your note here..."
          value={content}
          onChange={(e) => setNoteContent(afterIndex, e.target.value)}
          className="min-h-20 resize-none border-blue-200 bg-white text-sm focus-visible:ring-blue-300"
        />
      </div>
    </Card>
  )
}

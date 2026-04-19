import { useRef, useState, useEffect } from "react"
import { Plus, FileText, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useClaimStore } from "@/stores/claimStore"
import { cn } from "@/lib/utils"

interface InsertNodeButtonProps {
  afterIndex: number
}

export function InsertNodeButton({ afterIndex }: InsertNodeButtonProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const notes = useClaimStore((s) => s.notes)
  const attachments = useClaimStore((s) => s.attachments)
  const addNote = useClaimStore((s) => s.addNote)
  const activateAttachments = useClaimStore((s) => s.activateAttachments)
  const addAttachmentFile = useClaimStore((s) => s.addAttachmentFile)

  const canAddNote = !(afterIndex in notes)
  const canAddAttachments = !(afterIndex in attachments)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // If neither action is available, render just the connector line
  if (!canAddNote && !canAddAttachments) {
    return (
      <div className="relative flex items-center justify-center py-2">
        <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
      </div>
    )
  }

  function handleAddNote() {
    addNote(afterIndex)
    setOpen(false)
  }

  function handleAddAttachment() {
    setOpen(false)
    // Open file picker — file selected handler does the rest
    fileInputRef.current?.click()
  }

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    activateAttachments(afterIndex)
    addAttachmentFile(afterIndex, file.name)
    e.target.value = ""
  }

  return (
    <div ref={ref} className="relative flex items-center justify-center py-2">
      <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelected}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />

      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative z-10 h-6 w-6 rounded-full border-2 bg-white p-0 transition-all",
          open
            ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-500"
            : "border-slate-300 text-slate-400 hover:border-blue-400 hover:text-blue-500",
        )}
        aria-label="Insert node"
      >
        <Plus className="h-3 w-3" />
      </Button>

      {open && (
        <div className="absolute top-full left-1/2 z-20 mt-1 w-52 -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {canAddNote && (
            <Button
              variant="ghost"
              onClick={handleAddNote}
              className="h-auto w-full justify-start rounded-none px-3 py-2.5 font-normal"
            >
              <FileText className="mr-2.5 h-4 w-4 text-slate-400" />
              Add Information Note
            </Button>
          )}
          {canAddNote && canAddAttachments && (
            <div className="border-t border-slate-100" />
          )}
          {canAddAttachments && (
            <Button
              variant="ghost"
              onClick={handleAddAttachment}
              className="h-auto w-full justify-start rounded-none px-3 py-2.5 font-normal"
            >
              <Paperclip className="mr-2.5 h-4 w-4 text-slate-400" />
              Add Attachment
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

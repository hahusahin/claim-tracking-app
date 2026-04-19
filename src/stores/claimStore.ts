import { create } from "zustand"
import type { AttachmentFile } from "@/types/claim.types"

interface ClaimStore {
  notes: Record<number, string>
  attachments: Record<number, AttachmentFile[]>

  addNote: (afterIndex: number) => void
  removeNote: (afterIndex: number) => void
  setNoteContent: (afterIndex: number, content: string) => void

  activateAttachments: (afterIndex: number) => void
  deactivateAttachments: (afterIndex: number) => void
  addAttachmentFile: (afterIndex: number, fileName: string) => void
  removeAttachmentFile: (afterIndex: number, fileId: string) => void
}

export const useClaimStore = create<ClaimStore>((set) => ({
  notes: {},
  attachments: {},

  addNote: (afterIndex) =>
    set((state) => ({ notes: { ...state.notes, [afterIndex]: "" } })),

  removeNote: (afterIndex) =>
    set((state) => {
      const notes = { ...state.notes }
      delete notes[afterIndex]
      return { notes }
    }),

  setNoteContent: (afterIndex, content) =>
    set((state) => ({ notes: { ...state.notes, [afterIndex]: content } })),

  activateAttachments: (afterIndex) =>
    set((state) => ({
      attachments: {
        ...state.attachments,
        [afterIndex]: state.attachments[afterIndex] ?? [],
      },
    })),

  deactivateAttachments: (afterIndex) =>
    set((state) => {
      const attachments = { ...state.attachments }
      delete attachments[afterIndex]
      return { attachments }
    }),

  addAttachmentFile: (afterIndex, fileName) =>
    set((state) => {
      const existing = state.attachments[afterIndex] ?? []
      return {
        attachments: {
          ...state.attachments,
          [afterIndex]: [
            ...existing,
            {
              id: `f-${Date.now()}-${Math.random().toString(36).slice(2)}`,
              fileName,
            },
          ],
        },
      }
    }),

  removeAttachmentFile: (afterIndex, fileId) =>
    set((state) => ({
      attachments: {
        ...state.attachments,
        [afterIndex]: (state.attachments[afterIndex] ?? []).filter(
          (f) => f.id !== fileId,
        ),
      },
    })),
}))

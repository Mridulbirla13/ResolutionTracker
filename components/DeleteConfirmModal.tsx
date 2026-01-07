"use client"

type Props = {
  open: boolean
  title: string
  description?: string
  onCancel: () => void
  onConfirm: () => void
}

export default function DeleteConfirmModal({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-sm rounded-lg bg-background p-6 text-foreground shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        {description && (
          <p className="text-sm text-foreground/80 mb-6">
            {description}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-600 hover:bg-foreground hover:text-background transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
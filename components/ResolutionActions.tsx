"use client"

import { useState } from "react"
import { deleteResolution } from "@/app/actions"
import DeleteConfirmModal from "./DeleteConfirmModal"
import { Trash2, Pencil } from "lucide-react"
import Link from "next/link"

export default function ResolutionActions({ id }: { id: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center gap-3">
        <Link href={`/resolutions/${id}/edit`}>
          <Pencil className="w-4 h-4 text-gray-400 hover:text-foreground cursor-pointer" />
        </Link>

        <Trash2
          className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>

      <DeleteConfirmModal
        open={open}
        title="Delete resolution?"
        description="This will permanently delete this resolution and its streak history."
        onCancel={() => setOpen(false)}
        onConfirm={async () => {
          await deleteResolution(id)
          setOpen(false)
        }}
      />
    </>
  )
}
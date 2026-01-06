"use client"

import { createPortal } from "react-dom"
import { ReactNode, useState } from "react"

type TooltipState = {
  date: Date
  rect: DOMRect
}

type ControllerAPI = {
  open: (date: Date, rect: DOMRect) => void
  close: () => void
}

type Props = {
  children: (api: ControllerAPI) => ReactNode
}

export default function HeatmapTooltipController({ children }: Props) {
  const [tooltip, setTooltip] = useState<{
    date: Date
    rect: DOMRect
  } | null>(null)

  return (
    <>
      {children({
        open: (date, rect) => setTooltip({ date, rect }),
        close: () => setTooltip(null),
      })}

      {tooltip &&
        createPortal(
          <div
            className="
              fixed z-[9999]
              -translate-x-1/2 -translate-y-2
              whitespace-nowrap rounded bg-black
              px-2 py-1 text-xs text-white shadow-lg
              pointer-events-none
            "
            style={{
              left: tooltip.rect.left + tooltip.rect.width / 2,
              top: tooltip.rect.top,
            }}
          >
            {tooltip.date.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>,
          document.body
        )}
    </>
  )
}

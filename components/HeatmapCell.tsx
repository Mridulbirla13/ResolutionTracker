"use client"

type Props = {
    date: Date
    completed: boolean
    isToday: boolean
    onActivate: (date: Date, rect: DOMRect) => void
    onDeactivate: () => void
}

export default function HeatmapCell({
    date,
    completed,
    isToday,
    onActivate,
    onDeactivate,
}: Props) {
    return (
    <div
        data-today={isToday ? "true" : undefined}
        onMouseEnter={(e) =>
            onActivate(date, e.currentTarget.getBoundingClientRect())
        }
        onMouseLeave={onDeactivate}
        onClick={(e) =>
            onActivate(date, e.currentTarget.getBoundingClientRect())
        }
        className={`
        w-4 h-4 rounded cursor-pointer
        ${completed ? "bg-green-500" : "bg-gray-700"}
        ${isToday ? "ring-2 ring-white" : ""}
      `}
    />
    )
}
"use client"

import HeatmapCell from "@/components/HeatmapCell"
import HeatmapScroller from "@/components/HeatmapScroller"
import HeatmapTooltipController from "@/components/HeatmapTooltipController"
import { groupIntoWeeks } from "@/util/groupIntoWeeks"
import { HeatmapDay } from "@/util/buildHeatmap"

type Props = {
    weekly: HeatmapDay[]
    yearly: HeatmapDay[]
}

export default function ResolutionHeatmaps({ weekly, yearly }: Props) {
    const yearWeeks = groupIntoWeeks(yearly)

    return (
        <>
            {/* Weekly */}
            <div className="mt-5 flex items-center gap-3">
                <div className="text-xs text-gray-500">Current Week</div>

                <HeatmapTooltipController>
                    {({ open, close }) => (
                        <div className="flex gap-2">
                            {weekly.map(day => (
                                <HeatmapCell
                                    key={day.date.toISOString()}
                                    date={day.date}
                                    completed={day.completed}
                                    isToday={day.isToday}
                                    onActivate={open}
                                    onDeactivate={close}
                                />
                            ))}
                        </div>
                    )}
                </HeatmapTooltipController>
            </div>

            {/* Year */}
            <div className="mt-4 grid grid-cols-[32px_1fr] gap-1">
                <div className="flex flex-col mt-5 mb-5 gap-1 text-xs text-gray-500">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                        <span key={d} className="h-4 flex items-center">{d}</span>
                    ))}
                </div>

                <HeatmapScroller>
                    <div className="min-w-max">
                        <div className="flex gap-1 mb-1 text-xs text-gray-500">
                            {yearWeeks.map((week, idx) => {
                                const firstDay = week[0]
                                const prevWeek = yearWeeks[idx - 1]?.[0]

                                const showMonth =
                                    !prevWeek ||
                                    firstDay.date.getMonth() !== prevWeek.date.getMonth()

                                return (
                                    <div key={idx} className="w-4 text-center">
                                        {showMonth &&
                                            firstDay.date.toLocaleString("default", { month: "short" })}
                                    </div>
                                )
                            })}
                        </div>
                        <HeatmapTooltipController>
                            {({ open, close }) => (

                                <div className="grid grid-flow-col auto-cols-max gap-1">
                                    {yearWeeks.map(week => (
                                        <div key={week[0].date.toISOString()} className="flex flex-col gap-1">
                                            {week.map(day => (
                                                <HeatmapCell
                                                    key={day.date.toISOString()}
                                                    date={day.date}
                                                    completed={day.completed}
                                                    isToday={day.isToday}
                                                    onActivate={open}
                                                    onDeactivate={close}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>

                            )}
                        </HeatmapTooltipController>
                    </div>
                </HeatmapScroller>
            </div>
        </>
    )
}

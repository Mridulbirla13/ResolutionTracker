import { HeatmapDay } from "@/util/buildHeatmap"

export function groupIntoWeeks(days: HeatmapDay[]) {
  const weeks: HeatmapDay[][] = []

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return weeks
}

export type HeatmapDay = {
    date: Date
    completed: boolean
    isToday: boolean
}

export function buildHeatmap(
    dates: Date[]
): HeatmapDay[] {
    //A Set only stores unique values.
    const completedDays = new Set(
        //map() – Change every item in an array and return a new array
        dates.map(d => {
            //converts the string "2026-01-05T09:30:00Z" to a Date object (year, month, day, hour, minute…)
            const x = new Date(d)
            // x = Mon Jan 05 2026 15:00:00 GMT+0530 (India Standard Time)
            x.setHours(0, 0, 0, 0)
            //1767571200000
            return x.getTime()
            //1767571200000
        })
    )

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const start = new Date(today)
    start.setDate(start.getDate() - start.getDay())

    start.setDate(start.getDate() - 52 * 7)

    const heatmap: HeatmapDay[] = []

    for (let i = 0; i < 53 * 7; i++) {
        const d = new Date(start)
        d.setDate(start.getDate() + i)

        const time = d.getTime()

        heatmap.push({
            date: d,
            completed: completedDays.has(time),
            isToday: time === today.getTime(),
        })
    }

    return heatmap
}
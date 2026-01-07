import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { checkIn, deleteResolution } from "@/app/actions"
import { redirect } from "next/navigation"
import calculateStreak from "@/util/calculateStreak"
import { buildHeatmap } from "@/util/buildHeatmap"
import { groupIntoWeeks } from "@/util/groupIntoWeeks"
import ResolutionHeatmaps from "@/components/ResolutionHeatmaps"
import Link from "next/link"
import { headingFont } from "../layout"
import { Pencil, Plus, Trash2 } from "lucide-react"
import ResolutionActions from "@/components/ResolutionActions"

export default async function ResolutionsPage() {
  const session = await getServerSession()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect("/login")
  }

  const resolutions = await prisma.resolution.findMany({
    where: { userId: user.id },
    include: { progress: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="p-6 space-y-6 text-white">
      <div className="relative flex items-center justify-center h-14">
        <Link
          href="/resolutions/new"
          className={`
            absolute left-0
            bg-green-600 px-4 py-2 rounded-lg text-white font-medium transition
            flex items-center justify-center
            ${resolutions.length === 0 ? "invisible pointer-events-none" : ""}
          `}
        >
          <span className="hidden sm:inline">Add New Resolution</span>
          <span className="sm:hidden text-sm leading-none">New</span>
        </Link>

        <div
          className={`${headingFont.className}
            text-2xl sm:text-4xl text-foreground 
            font-bold tracking-wide
            whitespace-nowrap
          `}
        >
          Resolutions
        </div>

        <Link
          href="/"
          className="
            absolute right-0
            px-4 py-2 rounded-lg border border-foreground bg-background text-foreground
            font-medium hover:bg-foreground hover:text-background hover:border-foreground/20 transition
            flex items-center justify-center
          "
        >
          <span className="hidden sm:inline">← Back to Dashboard</span>
          <span className="sm:hidden text-sm leading-none">back</span>
        </Link>
      </div>

      {resolutions.length === 0 && (
        <div className="mt-20 flex flex-col items-center text-center space-y-6">
          <div className="text-6xl">🎯</div>

          <h2 className={`${headingFont.className} text-3xl font-bold`}>
            Start your first resolution
          </h2>

          <p className="text-gray-400 max-w-md">
            Resolutions help you build consistency one day at a time.
            Pick something simple and show up daily.
          </p>

          <Link
            href="/resolutions/new"
            className="mt-4 inline-flex items-center gap-2
                 bg-green-600 px-6 py-3 rounded-lg
                 text-white font-medium
                 hover:bg-green-700 transition"
          >
            <Plus className="w-5 h-5 text-white" /> Add your first resolution
          </Link>

          <p className="text-xs text-gray-500">
            Tip: start with something achievable like “Wake up at 6AM”
          </p>
        </div>
      )}

      {resolutions.map((r) => {
        const checkedInToday = r.progress.some((p) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          const d = new Date(p.date)
          d.setHours(0, 0, 0, 0)

          return d.getTime() === today.getTime()
        })

        const streak = calculateStreak(r.progress.map(p => p.date))
        const yearHeatmap = buildHeatmap(
          r.progress.map(p => p.date)
        )

        const yearWeeks = groupIntoWeeks(yearHeatmap)

        // weekly = last 7 days of the SAME data
        const weeklyHeatmap = yearHeatmap.slice(-7)

        return (
          <div key={r.id} className="border border-foreground/20 p-4 rounded">
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center justify-between gap-4">
                <div className="font-semibold text-foreground truncate">{r.title}</div>

                <div className="flex items-center gap-3 shrink-0">
                  <form action={checkIn.bind(null, r.id)}>
                    <button
                      disabled={checkedInToday}
                      className={`px-3 py-1 rounded text-white flex item-center justify-center ${checkedInToday ? "bg-gray-400" : "bg-green-600"
                        }`}
                    >
                      <span className="hidden sm:inline">
                        {checkedInToday ? "Checked in today" : "Check in today"}
                      </span>
                      
                      <span className="sm:hidden text-lg leading-none">
                        {checkedInToday ? "✓" : "⏱️"}
                      </span>
                    </button>
                  </form>

                  <ResolutionActions id={r.id} />
                </div>
              </div>
            </div>

            <div className="text-sm text-foreground/80 mt-2">
              🔥 Streak: {streak} day{streak !== 1 && "s"}
            </div>

            <ResolutionHeatmaps
              weekly={weeklyHeatmap}
              yearly={yearHeatmap}
            />
          </div>
        )
      })}
    </main>
  )
}

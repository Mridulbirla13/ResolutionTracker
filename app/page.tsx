import Link from "next/link"
import { getServerSession } from "next-auth"
import { headingFont } from "./layout"
import { DAILY_MOTIVATION } from "@/lib/motivation"
import UserMenu from "@/components/UserMenu"

export default async function Home() {
  const session = await getServerSession()

  const userEmail = session?.user?.email

  const formatName = (name?: string | null) =>
    name
      ?.split(" ")
      .map(w => w[0]?.toUpperCase() + w.slice(1))
      .join(" ")

  const userName =
    formatName(session?.user?.name) ||
    formatName(userEmail?.split("@")[0])

  const today = new Date()
  const dayOfYear =
    Math.floor(
      (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
        Date.UTC(today.getFullYear(), 0, 0)) /
      86400000
    )

  const dailyMessage =
    DAILY_MOTIVATION[dayOfYear % DAILY_MOTIVATION.length]

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-10">

        <div className="flex w-full items-center justify-between flex-col sm:flex-row gap-4 mb-8">
          <div className={`${headingFont.className} text-2xl text-white font-bold`}>
            Resolution Tracker
          </div>

          {session && userName && (
            <UserMenu name={userName} />
          )}
        </div>

        <div className="space-y-6 mt-25 text-center">
          {session ? (
            <>
              <h1
                className={`${headingFont.className} text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight`}
              >
                Welcome back, {userName} !
              </h1>
              <h1
                className={`${headingFont.className} text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight`}>
                <span className="ml-2 inline-block">👋</span>
              </h1>

              <p className="text-gray-500 text-lg">
                Let’s keep your streak alive today.
              </p>

              <p className="text-gray-400 italic text-base">
                “{dailyMessage}”
              </p>
            </>
          ) : (
            <div className="mt-20">
              <h1
                className={`${headingFont.className} text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight`}
              >
                Build consistency.
              </h1>

              <p className="text-gray-500 text-base sm:text-xl lg:text-2xl mt-3">
                Track daily progress. Visualize your streaks.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            {session ? (
              <>
                <Link
                  href="/resolutions"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg
                         border border-white bg-white text-black
                         hover:bg-black hover:text-white transition"
                >
                  Go to Resolutions
                </Link>

                <Link
                  href="/resolutions/new"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg
                         border border-gray-300 hover:bg-gray-50 transition"
                >
                  Add Resolution
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg
                       border border-gray-300 text-lg hover:bg-gray-50 hover:text-gray-900 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

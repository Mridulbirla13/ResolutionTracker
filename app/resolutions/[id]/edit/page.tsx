import { prisma } from "@/lib/prisma"
import { updateResolution } from "@/app/actions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { headingFont } from "@/app/layout"

export default async function EditResolutionPage({
  params,
}: {
  params: Promise <{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession()
  if (!session?.user?.email) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) redirect("/login")

  const resolution = await prisma.resolution.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
  })

  if (!resolution) redirect("/resolutions")

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md border border-gray-700 rounded-xl p-6 space-y-6">

        <div className="flex items-center justify-between">
          <h1 className={`${headingFont.className} text-2xl font-bold`}>
            Edit Resolution
          </h1>

          <Link href="/resolutions" className="text-gray-400 hover:text-foreground transition">
            ✕
          </Link>
        </div>

        <form
          action={updateResolution.bind(null, resolution.id)}
          className="space-y-4"
        >
          <input
            name="title"
            defaultValue={resolution.title}
            required
            className="
              w-full rounded bg-background border border-gray-700
              px-3 py-2 text-foreground/40
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  )
}
import { createResolution } from "@/app/actions";
import { headingFont } from "@/app/layout";
import Link from "next/link";

export default function NewResolutionPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
            <div className="w-full max-w-md border border-gray-700 rounded-xl p-6 shadow-lg space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className={`${headingFont.className} text-foreground text-2xl font-bold`}>
                        New Resolution
                    </h1>

                    <Link
                        href="/resolutions"
                        className="text-sm text-gray-400 hover:text-foreground transition"
                    >
                        ✕
                    </Link>
                </div>

                <p className="text-sm text-gray-400">
                    Keep it specific and achievable. You can always edit it later.
                </p>

                <form action={createResolution} className="space-y-4">
                    <input
                        name="title"
                        required
                        autoFocus
                        placeholder="e.g. Workout 5 days a week"
                        className="
                          w-full rounded bg-background border border-gray-700
                          px-3 py-2 text-white
                          placeholder-gray-500
                          focus:outline-none focus:ring-2 focus:ring-green-500
                        "
                    />
                    <button
                        type="submit"
                        className="
                          w-full bg-green-600 hover:bg-green-700
                          text-white font-medium
                          py-2 rounded transition
                        "
                    >
                        Add Resolution
                    </button>
                </form>
                <div className="text-xs text-gray-500 text-center">
                    Small goals → consistent progress → real change
                </div>
            </div>
        </main>
    )
}
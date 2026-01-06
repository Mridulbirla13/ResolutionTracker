"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="relative w-full max-w-sm border border-gray-700 rounded-xl p-6 shadow-lg">
                <button
                    onClick={() => router.push("/")}
                    aria-label="Close"
                    className="
                      absolute right-5 top-4
                      text-gray-400 hover:text-white
                      transition
                    "
                >
                    ✕
                </button>
                <h1 className="text-2xl font-bold text-center mb-2">
                    Welcome!
                </h1>
                <p className="text-sm text-gray-400 text-center mb-6">
                    Log in to track your resolutions
                </p>

                {/* OAuth buttons */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="
                          w-full flex items-center justify-center gap-2
                          border border-gray-700 rounded
                          py-2 hover:bg-gray-800 transition
                        "
                    >
                        <span>Continue with Google</span>
                    </button>

                    <button
                        onClick={() => signIn("github", { callbackUrl: "/" })}
                        className="
                          w-full flex items-center justify-center gap-2
                          border border-gray-700 rounded
                          py-2 hover:bg-gray-800 transition
                        "
                    >
                        <span>Continue with GitHub</span>
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-gray-700" />
                    <span className="text-xs text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-700" />
                </div>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)

                        await signIn("credentials", {
                            email: formData.get("email"),
                            callbackUrl: "/",
                        })
                    }}
                    className="space-y-4"
                >
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        required
                        className="
                          w-full rounded bg-gray-900 border border-gray-700
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
                        Log in
                    </button>
                </form>
            </div>
        </div>
    )
}

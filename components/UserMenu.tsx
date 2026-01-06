"use client"

import { signOut } from "next-auth/react"
import { useEffect, useRef, useState } from "react"

type Props = {
    name: string
}

export default function UserMenu({ name }: Props) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition"
            >
                {name}
                <span className="text-xs">▾</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg border bg-white text-gray-900 shadow-lg z-50">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full text-left px-4 py-2 text-sm rounded-lghover:bg-gray-100 transition"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
"use client"

import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

type Props = {
    name: string
}

export default function UserMenu({ name }: Props) {
    const [open, setOpen] = useState(false)
    const { theme, setTheme } = useTheme()
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
                className="
                  flex items-center gap-2 rounded-lg
                  border border-foreground/20
                  px-4 py-2 text-sm font-medium
                  bg-background text-foreground
                  hover:bg-foreground/20 transition
                "
            >
                {name}
                <span className="text-xs">▾</span>
            </button>

            {open && (
                <div
                    className="
                      absolute right-0 mt-2 w-44
                      rounded-lg border border-foreground/20
                      bg-background text-foreground
                      shadow-xl z-50
                    "
                >
                    <button
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className="
                          w-full text-left px-4 py-2 text-sm bg-background text-foreground rounded-tl-lg rounded-tr-lg
                          hover:bg-foreground hover:text-background hover:rounded-tr-lg hover:rounded-tl-lg transition 
                        "
                    >
                        {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
                    </button>

                    <div className="h-px bg-foreground/20" />

                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="
                          w-full text-left  px-10 py-2 text-sm rounded-bl-lg rounded-br-lg
                          hover:bg-red-600 hover:text-white hover:rounded-br-lg hover:rounded-bl-lg transition
                        "
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
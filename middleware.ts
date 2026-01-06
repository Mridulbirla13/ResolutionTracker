import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    if (req.method !== "GET") {
        return NextResponse.next()
    }

    const token = await getToken({ req })

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/resolutions/:path*"],
}

// export default {auth as proxy} from "@/auth";

import {auth} from "@/auth";

export default auth((req) => {
    const publicPages = ["/login", "/register"]
    if (!req.auth && !publicPages.includes(req.nextUrl.pathname)) {
        const newUrl = new URL("/login", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }

    if (req.auth && publicPages.includes(req.nextUrl.pathname)) {
        const newUrl = new URL("/", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    // matcher: ["/", "/profile"],
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
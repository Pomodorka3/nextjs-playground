import {auth} from "@/auth";
import {NextResponse} from "next/server";

// export default function proxy(request)
// {
//         console.log("accessing middleware");
//         auth((request) => {
//         if (!request.auth && request.nextUrl.pathname !== "/login") {
//             return NextResponse.redirect(new URL('/login', request.url))
//         }
//         // return NextResponse.next();
//     })
//     // return auth(request);
// }

export default auth((req) => {
    console.log(req.auth.user.accessToken, 111)
    if (!req.auth.user.accessToken && req.nextUrl.pathname !== "/login") {
        const newUrl = new URL("/login", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ["/", "/profile"],
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
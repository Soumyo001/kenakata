import { NextResponse, type NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { ACCESS_TOKEN_COOKIE } from "@/lib/data/constants";

const PROTECTED_ROUTES = ["/checkout", "/account", "/admin"];
const AUTH_ROUTES = ["/login", "/register"];

const matchesPrefix = (pathname: string, routes: string[]) =>
    routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

function hasLiveToken(token: string | undefined): boolean {
    if (!token) return false;
    try {
        const { exp } = decodeJwt(token);
        return typeof exp === "number" && exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

export default function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isAuthed = hasLiveToken(req.cookies.get(ACCESS_TOKEN_COOKIE)?.value);

    if (!isAuthed && matchesPrefix(pathname, PROTECTED_ROUTES)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
    }

    if (isAuthed && matchesPrefix(pathname, AUTH_ROUTES)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
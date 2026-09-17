import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/data/constants";
import { getSafeRedirect, getTokenLifetime } from "@/lib/helpers/auth-helper";

const PROTECTED_ROUTES = ["/checkout", "/account", "/admin"];
const AUTH_ROUTES = ["/login", "/register"];

function matchesRoute(pathname: string, routes: string[]): boolean {
    return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    const hasSession = token !== undefined && getTokenLifetime(token) > 0;

    if (!hasSession && matchesRoute(pathname, PROTECTED_ROUTES)) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname + search);

        const response = NextResponse.redirect(loginUrl);
        if (token) response.cookies.delete(SESSION_COOKIE_NAME);
        return response;
    }

    if (hasSession && matchesRoute(pathname, AUTH_ROUTES)) {
        const target = getSafeRedirect(request.nextUrl.searchParams.get("redirect"));
        return NextResponse.redirect(new URL(target, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/checkout/:path*", "/account/:path*", "/admin/:path*", "/login", "/register"],
};
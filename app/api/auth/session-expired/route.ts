import { NextResponse, type NextRequest } from "next/server";
import { clearSessionCookie } from "@/lib/auth/session";
import { getSafeRedirect } from "@/lib/helpers/auth-helper";

export const GET = async (req: NextRequest) => {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", getSafeRedirect(req.nextUrl.searchParams.get("redirect")));

    const response = NextResponse.redirect(loginUrl);
    clearSessionCookie(response);
    return response;
};
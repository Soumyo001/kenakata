import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshTokens } from "@/lib/api/auth";
import { setAuthCookies, clearAuthCookies } from "@/lib/auth/session";
import { REFRESH_TOKEN_COOKIE } from "@/lib/data/constants";

export const POST = async () => {
    const store = await cookies();
    const refreshToken = store.get(REFRESH_TOKEN_COOKIE)?.value;

    if (!refreshToken) {
        return NextResponse.json({ message: "No refresh token" }, { status: 401 });
    }

    try {
        const tokens = await refreshTokens(refreshToken);
        setAuthCookies(store, tokens);
        return NextResponse.json({ message: "Refreshed" }, { status: 200 });
    } catch {
        clearAuthCookies(store);
        return NextResponse.json({ message: "Session expired" }, { status: 401 });
    }
};
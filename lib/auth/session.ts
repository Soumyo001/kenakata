import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { getProfile } from "@/lib/api/auth";
import { AuthTokensType, UserType } from "@/lib/types";
import {
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    ACCESS_TOKEN_MAX_AGE,
    REFRESH_TOKEN_MAX_AGE,
} from "@/lib/data/constants";

type CookieStoreType = Awaited<ReturnType<typeof cookies>>;

export const getCurrentUser = cache(async (): Promise<UserType | null> => {
    const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
    if (!token) return null;

    try {
        return await getProfile(token);
    } catch {
        return null;
    }
});

export function setAuthCookies(store: CookieStoreType, tokens: AuthTokensType): void {
    const secure = process.env.NODE_ENV === "production";
    store.set(ACCESS_TOKEN_COOKIE, tokens.access_token, {
        httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: ACCESS_TOKEN_MAX_AGE,
    });
    store.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
        httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: REFRESH_TOKEN_MAX_AGE,
    });
}

export function clearAuthCookies(store: CookieStoreType): void {
    store.delete(ACCESS_TOKEN_COOKIE);
    store.delete(REFRESH_TOKEN_COOKIE);
}
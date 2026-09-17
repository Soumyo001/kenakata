import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { ApiError } from "@/lib/api/client";
import { getProfile } from "@/lib/api/auth";
import { SESSION_COOKIE_NAME } from "@/lib/data/constants";
import { getTokenLifetime } from "@/lib/helpers/auth-helper";
import { PlatziUserType, UserType } from "@/lib/types";

export function toPublicUser(user: PlatziUserType): UserType {
    return {
        id:     user.id,
        email:  user.email,
        name:   user.name,
        role:   user.role,
        avatar: user.avatar,
    };
}

export function setSessionCookie(response: NextResponse, accessToken: string): void {
    response.cookies.set(SESSION_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure:   process.env.NODE_ENV === "production", 
        sameSite: "lax",
        path:     "/",
        maxAge:   getTokenLifetime(accessToken),
    });
}

export function clearSessionCookie(response: NextResponse): void {
    response.cookies.delete(SESSION_COOKIE_NAME);
}

export const getCurrentUser = cache(async (): Promise<UserType | null> => {
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
    if (!token || getTokenLifetime(token) === 0) return null;

    try {
        return toPublicUser(await getProfile(token));
    } catch (err) {
        if (err instanceof ApiError && [400, 401, 404].includes(err.status)) return null;
        throw err;
    }
});

export async function requireUser(returnTo: string): Promise<UserType> {
    const user = await getCurrentUser();

    if (!user) {
        redirect(`/api/auth/session-expired?redirect=${encodeURIComponent(returnTo)}`);
    }

    return user;
}
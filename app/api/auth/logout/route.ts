import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearAuthCookies } from "@/lib/auth/session";

export const POST = async () => {
    clearAuthCookies(await cookies());
    return NextResponse.json({ message: "Logged out" }, { status: 200 });
};
import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth/session";

export const POST = async () => {
    const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
    clearSessionCookie(response);
    return response;
};
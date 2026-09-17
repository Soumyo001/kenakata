import { NextResponse } from "next/server";
import { clearSessionCookie, getCurrentUser } from "@/lib/auth/session";

export const GET = async () => {
    try {
        const user = await getCurrentUser();
        const response = NextResponse.json({ user }, { status: 200 });
        
        if (!user) clearSessionCookie(response);

        return response;
    } catch (err: any) {
        return NextResponse.json({ message: `Server error: ${err.message}` }, { status: 500 });
    }
};
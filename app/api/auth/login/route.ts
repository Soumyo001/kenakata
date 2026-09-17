import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LoginSchema } from "@/lib/validators/schema-validators/login.schema";
import { loginRequest, getProfile } from "@/lib/api/auth";
import { setAuthCookies } from "@/lib/auth/session";
import { ApiError } from "@/lib/api/client";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const parsed = LoginSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Invalid request data", errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const tokens = await loginRequest(parsed.data);
        const user = await getProfile(tokens.access_token);

        setAuthCookies(await cookies(), tokens);

        return NextResponse.json({ message: "Logged in", user }, { status: 200 });
    } catch (err: any) {
        if (err instanceof ApiError && err.status === 401) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }
        return NextResponse.json({ message: `Server error: ${err.message}` }, { status: 500 });
    }
};
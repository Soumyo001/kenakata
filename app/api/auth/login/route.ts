import { NextResponse } from "next/server";
import { ApiError } from "@/lib/api/client";
import { getProfile, loginRequest } from "@/lib/api/auth";
import { setSessionCookie, toPublicUser } from "@/lib/auth/session";
import { LoginSchema } from "@/lib/validators/schema-validators/login.schema";

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

        const { access_token } = await loginRequest(parsed.data);
        const user = toPublicUser(await getProfile(access_token));

        const response = NextResponse.json({ message: "Logged in", user }, { status: 200 });
        setSessionCookie(response, access_token);
        return response;
    } catch (err: any) {
        if (err instanceof ApiError && err.status === 401) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }
        return NextResponse.json({ message: `Server error: ${err.message}` }, { status: 500 });
    }
};
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { RegisterSchema } from "@/lib/validators/schema-validators/register.schema";
import { registerRequest, loginRequest, getProfile } from "@/lib/api/auth";
import { setAuthCookies } from "@/lib/auth/session";
import { ApiError } from "@/lib/api/client";
import { DEFAULT_AVATAR } from "@/lib/data/constants";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const parsed = RegisterSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Invalid request data", errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, password } = parsed.data;
        await registerRequest({ name, email, password, avatar: DEFAULT_AVATAR });

        const tokens = await loginRequest({ email, password });
        const user = await getProfile(tokens.access_token);

        setAuthCookies(await cookies(), tokens);

        return NextResponse.json({ message: "Account created", user }, { status: 201 });
    } catch (err: any) {
        if (err instanceof ApiError) {
            return NextResponse.json(
                { message: "Could not create account. The email may already be in use." },
                { status: err.status }
            );
        }
        return NextResponse.json({ message: `Server error: ${err.message}` }, { status: 500 });
    }
};
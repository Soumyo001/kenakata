import { NextResponse } from "next/server";
import { ApiError } from "@/lib/api/client";
import { getProfile, loginRequest } from "@/lib/api/auth";
import { createUser, isEmailRegistered } from "@/lib/api/users";
import { setSessionCookie, toPublicUser } from "@/lib/auth/session";
import { RegisterSchema } from "@/lib/validators/schema-validators/register.schema";
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

        if (await isEmailRegistered(email)) {
            const message = "An account with this email already exists";
            return NextResponse.json({ message, errors: { email: [message] } }, { status: 409 });
        }
        await createUser({
            name,
            email,
            password,
            avatar: `${DEFAULT_AVATAR}?u=${encodeURIComponent(email)}`,
        });

        const { access_token } = await loginRequest({ email, password });
        const user = toPublicUser(await getProfile(access_token));

        const response = NextResponse.json({ message: "Account created", user }, { status: 201 });
        setSessionCookie(response, access_token);
        return response;
    } catch (err: any) {
        if (err instanceof ApiError && err.status === 400) {
            return NextResponse.json({ message: err.message }, { status: 400 });
        }
        return NextResponse.json({ message: `Server error: ${err.message}` }, { status: 500 });
    }
};
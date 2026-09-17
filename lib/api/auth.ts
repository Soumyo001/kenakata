import { apiFetch } from "@/lib/api/client";
import { AuthTokensType, UserType } from "@/lib/types";
import { LoginSchemaType } from "@/lib/validators/schema-validators/login.schema";

export async function loginRequest(credentials: LoginSchemaType): Promise<AuthTokensType> {
    return apiFetch<AuthTokensType>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        revalidate: false,
    });
}

export async function getProfile(accessToken: string): Promise<UserType> {
    return apiFetch<UserType>("/auth/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
        revalidate: false,
    });
}

type RegisterPayloadType = { name: string; email: string; password: string; avatar: string };

export async function registerRequest(payload: RegisterPayloadType): Promise<UserType> {
    return apiFetch<UserType>("/users/", {
        method: "POST",
        body: JSON.stringify(payload),
        revalidate: false,
    });
}

export async function refreshTokens(refreshToken: string): Promise<AuthTokensType> {
    return apiFetch<AuthTokensType>("/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        revalidate: false,
    });
}
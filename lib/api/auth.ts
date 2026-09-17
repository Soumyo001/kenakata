import { apiFetch } from "@/lib/api/client";
import { AuthTokensType, PlatziUserType } from "@/lib/types";
import { LoginSchemaType } from "@/lib/validators/schema-validators/login.schema";

export async function loginRequest(credentials: LoginSchemaType): Promise<AuthTokensType> {
    return apiFetch<AuthTokensType>("/auth/login", {
        method:     "POST",
        body:       JSON.stringify(credentials),
        revalidate: false,
    });
}

export async function getProfile(accessToken: string): Promise<PlatziUserType> {
    return apiFetch<PlatziUserType>("/auth/profile", {
        headers:    { Authorization: `Bearer ${accessToken}` },
        revalidate: false,
    });
}
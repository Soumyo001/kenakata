import { apiFetch } from "@/lib/api/client";
import { CreateUserPayloadType, PlatziUserType } from "@/lib/types";

export async function getUsers(): Promise<PlatziUserType[]> {
    return apiFetch<PlatziUserType[]>("/users", { revalidate: false });
}

export async function isEmailRegistered(email: string): Promise<boolean> {
    const users = await getUsers();
    return users.some((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function createUser(payload: CreateUserPayloadType): Promise<PlatziUserType> {
    return apiFetch<PlatziUserType>("/users", {
        method:     "POST",
        body:       JSON.stringify(payload),
        revalidate: false,
    });
}
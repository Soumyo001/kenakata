const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not set.");
}

type FetchOptions = RequestInit & {
    revalidate?: number | false
};

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const { revalidate, ...init } = options;
    // console.log("LIINNKK", `${BASE_URL}${path}`)
    const res = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init.headers,
        },
        ...(revalidate === false
            ? {cache: 'no-store'}
            : (revalidate !== undefined
                ? { next: {revalidate} }
                : {})),
    });

    if(!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new ApiError(body?.message ?? `Request failed: ${res.status}`, res.status);
    }
    return res.json() as Promise<T>;
}
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = RequestInit & {
    revalidate?: number | false
};

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const { revalidate, ...init } = options;

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
        throw new Error(body?.message ?? `Request failed: ${res.status}`);
    }
    return res.json() as Promise<T>;
}
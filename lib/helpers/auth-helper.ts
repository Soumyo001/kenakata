import { decodeJwt } from "jose";

export function getTokenLifetime(token: string): number {
    try {
        const { exp } = decodeJwt(token);
        if (!exp) return 0;
        return Math.max(0, exp - Math.floor(Date.now() / 1000));
    } catch {
        return 0;
    }
}

export function getSafeRedirect(target: string | null | undefined, fallback: string = "/"): string {
    if (!target || !/^\/(?![\/\\])/.test(target)) return fallback;
    return target;
}
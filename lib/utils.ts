export { cn } from "cn"
export const FALLBACK_IMAGE = "/placeholder.png";

const REJECTED_IMAGE_HOSTS = ["placeimg.com", "placehold.co"];

function isLikelyImageUrl(raw: string): boolean {
    try {
        const url = new URL(raw);
        if (url.protocol !== "http:" && url.protocol !== "https:") return false;
        if (REJECTED_IMAGE_HOSTS.includes(url.hostname.replace(/^www\./, ""))) return false;
        if (url.pathname === "" || url.pathname === "/") return false;
        return true;
    } catch {
        return false;
    }
}

export function sanitizeImages(images: string[] | undefined): string[] {
    if (!Array.isArray(images)) return [FALLBACK_IMAGE];

    const cleaned = images
        .map((img) => String(img ?? "").replace(/[\[\]"\\]/g, "").trim())
        .filter(isLikelyImageUrl);

    return cleaned.length > 0 ? cleaned : [FALLBACK_IMAGE];
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}
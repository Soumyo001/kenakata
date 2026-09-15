export { cn } from "cn"

export function sanitizeImages(images: string[] | undefined): string[] {
    if (!Array.isArray(images)) return [];
    const cleaned = images
        .map((img) => img?.replace(/[\[\]"]/g, "").trim())
        .filter((img) => img?.startsWith("http"));
    return cleaned.length > 0 ? cleaned : ["/placeholder.png"];
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}
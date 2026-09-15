import { ProductType, ProductQueryType } from "../types";
import { sanitizeImages } from "../utils";

export function buildQuery(q: ProductQueryType): string {
    const params = new URLSearchParams();
    Object.entries(q).forEach(([key, value]) => {
        if(value !== undefined || value !== "") params.set(key, String(value));
    });
    return params.toString();
}

export function normalize(p: ProductType): ProductType {
    return {...p, images: sanitizeImages(p.images)};
}
import { ProductType, ProductQueryType } from "../types";
import { apiFetch } from "./client";
import { buildQuery, normalizeProduct } from "../helpers/api-helper";

export async function getProducts(q: ProductQueryType = {}) {
    const products: ProductType[] = await apiFetch<ProductType[]>(`/products/?${buildQuery(q)}`, {revalidate: 60});
    return products.map(normalizeProduct);
}

export async function getProductById(id: string|number) {
    const product: ProductType = await apiFetch<ProductType>(`/products/${id}`, {revalidate: 300});
    return normalizeProduct(product);
}

export async function getRelatedProducts(categoryId: number, excludeId: number) {
    const products: ProductType[] = await apiFetch<ProductType[]>(`/products/?categoryId=${categoryId}&limit=5`, {revalidate: 300});
    return products.filter(p => p.id !== excludeId).slice(0,4).map(normalizeProduct);
}
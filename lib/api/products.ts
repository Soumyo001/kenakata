import { ProductType, ProductQueryType, PaginatedType } from "../types";
import { apiFetch } from "./client";
import { buildQuery, normalizeProduct } from "../helpers/api-helper";
import { ListingParamsSchemaType } from "../validators/schema-validators/listing-params.schema";
import { filterByPrice, sortProducts, paginate } from "../helpers/listing-helper";
import { PER_PAGE } from "../data/constants";

export async function getProducts(queries: ProductQueryType = {}): Promise<ProductType[]> {
    const products: ProductType[] = await apiFetch<ProductType[]>(`/products/?${buildQuery(queries)}`, {revalidate: 60});
    return products.map(normalizeProduct);
}

export async function getProductById(id: string|number): Promise<ProductType> {
    const product: ProductType = await apiFetch<ProductType>(`/products/${id}`, {revalidate: 300});
    return normalizeProduct(product);
}

export async function getRelatedProducts(categoryId: number, excludeId: number): Promise<ProductType[]> {
    const products: ProductType[] = await apiFetch<ProductType[]>(`/products/?categoryId=${categoryId}&offset=0&limit=5`, {revalidate: 300});
    return products.filter(p => p.id !== excludeId).slice(0,4).map(normalizeProduct);
}

export async function getProductListing(params: ListingParamsSchemaType): Promise<PaginatedType<ProductType>> {
    const products: ProductType[] = await getProducts({
        title: params.search,
        categoryId: params.category,
        // ...(params.minPrice && params.maxPrice 
        //     ? {price_min: params.minPrice, price_max: params.maxPrice}
        //     : {})
    });
    
    const filteredByPrice = filterByPrice(products, params.minPrice, params.maxPrice);
    const sorted = sortProducts(filteredByPrice, params.sort);

    return paginate(sorted, params.page, PER_PAGE);
}
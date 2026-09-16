import { ProductType, PaginatedType, SortOptionType } from "@/lib/types";
import { buildQuery } from "@/lib/helpers/api-helper";
import { DEFAULT_SORT } from "@/lib/data/constants";
import {
    ListingParamsSchema,
    ListingParamsSchemaType,
} from "@/lib/validators/schema-validators/listing-params.schema";

type RawSearchParamsType = Record<string, string | string[] | undefined>;

export function parseListingParams(raw: RawSearchParamsType): ListingParamsSchemaType {
    return ListingParamsSchema.parse(raw);
}

export function filterByPrice(products: ProductType[], min?: number, max?: number): ProductType[] {
    return products.filter((product) => {
        if (min !== undefined && product.price < min) return false;
        if (max !== undefined && product.price > max) return false;
        return true;
    });
}

export function sortProducts(products: ProductType[], sort: SortOptionType): ProductType[] {
    const copy = [...products];

    switch (sort) {
        case "price-asc":
            return copy.sort((a, b) => a.price - b.price);
        case "price-desc":
            return copy.sort((a, b) => b.price - a.price);
        case "name-asc":
            return copy.sort((a, b) => a.title.localeCompare(b.title));
        case "newest":
            return copy.sort((a, b) => b.id - a.id);
    }
}

export function paginate<T>(items: T[], page: number, perPage: number): PaginatedType<T> {
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * perPage;

    return {
        items: items.slice(start, start + perPage),
        total,
        page: currentPage,
        totalPages,
    };
}

export function getPageWindow(page: number, totalPages: number, size: number = 5): number[] {
    let start = Math.max(1, page - Math.floor(size / 2));
    const end = Math.min(totalPages, start + size - 1);
    start = Math.max(1, end - size + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function buildListingHref(params: ListingParamsSchemaType, page: number): string {
    const query = buildQuery({
        search:   params.search,
        category: params.category,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        sort:     params.sort === DEFAULT_SORT ? undefined : params.sort,
        page:     page > 1 ? page : undefined,
    });

    return query ? `/products?${query}` : "/products";
}
export type ProductQueryType = {
    title?: string;
    price_min?: number;
    price_max?: number;
    categoryId?: number;
    limit?: number;
    offset?: number;
};
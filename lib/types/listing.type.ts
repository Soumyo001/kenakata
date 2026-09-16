import { SORT_VALUES } from "../data/constants";

export type SortOptionType = (typeof SORT_VALUES)[number];

export type PaginatedType<T> = {
    items: T[];
    total: number;
    page: number;
    totalPages: number;
}
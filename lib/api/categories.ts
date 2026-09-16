import { CategoryType } from "../types";
import { apiFetch } from "./client";
import { normalizeCategory } from "../helpers/api-helper";

export async function getCategories(): Promise<CategoryType[]> {
    const categories: CategoryType[] = await apiFetch<CategoryType[]>('/categories', {revalidate: 3600});
    return categories.map(normalizeCategory);
}

export async function getCategoryById(id: string | number): Promise<CategoryType> {
    const category: CategoryType = await apiFetch<CategoryType>(`/categories/${id}`, {revalidate: 3600});
    return normalizeCategory(category);
}
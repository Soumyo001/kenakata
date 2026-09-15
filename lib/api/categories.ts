import { CategoryType } from "../types";
import { apiFetch } from "./client";

export async function getCategories() {
    const categories: CategoryType[] = await apiFetch<CategoryType[]>('/categories', {revalidate: 3600});
    return categories;
}

export async function getCategoryById(id: string | number) {
    const category: CategoryType = await apiFetch<CategoryType>(`/categories/${id}`, {revalidate: 3600});
    return category;
}
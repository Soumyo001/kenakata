import { CategoryType } from "./category.type";

export type ProductType = {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: CategoryType;
    images: string[];
    creationAt?: string;
    updatedAt?: string;
}
import Link from "next/link";
import SafeImage from "@/components/shared/safe-image";
import { CategoryType } from "@/lib/types";

const CategoryCard = ({ category }: { category: CategoryType }) => {
    return (
        <Link
            href={`/products?categoryId=${category.id}`}
            className="group relative aspect-4/3 overflow-hidden rounded-xl"
        >
            <SafeImage
                src={category.image}
                alt={category.name}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <h3 className="absolute bottom-3 left-3 right-3 truncate text-lg font-semibold text-white">
                {category.name}
            </h3>
        </Link>
    );
};

export default CategoryCard;
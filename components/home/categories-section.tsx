import { getCategories } from "@/lib/api/categories";
import CategoryCard from "@/components/home/category-card";
import Container from "@/components/layout/container";

const CategoriesSection = async () => {
    const categories = await getCategories();

    return (
        <section id="categories">
            <Container className="py-12">
                <h2 className="mb-6 text-2xl font-bold">Shop by Category</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {categories.slice(0, 8).map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default CategoriesSection;
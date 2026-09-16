import ProductGrid from "@/components/product/product-grid";
import { getRelatedProducts } from "@/lib/api/products";

type RelatedProductsProps = {
    categoryId: number;
    excludeId:  number;
};

const RelatedProducts = async ({ categoryId, excludeId }: RelatedProductsProps) => {
    const products = await getRelatedProducts(categoryId, excludeId);
    
    if (products.length === 0) return null;

    return (
        <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">You may also like</h2>
            <ProductGrid products={products} />
        </section>
    );
};

export default RelatedProducts;
import { getProducts } from "@/lib/api/products";
import ProductCard from "@/components/product/product-card";

const FeaturedProducts = async () => {
    const products = await getProducts({ limit: 8 });

    return (
        <section className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
import { getProducts } from "@/lib/api/products";
import ProductCard from "@/components/product/product-card";
import Container from "@/components/layout/container";

const FeaturedProducts = async () => {
    const products = await getProducts({ offset: 0, limit: 8 });

    return (
        <section>
            <Container className="py-12">
                <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default FeaturedProducts;
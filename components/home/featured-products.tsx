import { getProducts } from "@/lib/api/products";
import ProductGrid from "@/components/product/product-grid";
import Container from "@/components/layout/container";

const FeaturedProducts = async () => {
    const products = await getProducts({ offset: 0, limit: 8 });

    return (
        <section>
            <Container className="py-12">
                <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
                <ProductGrid products={products}/>
            </Container>
        </section>
    );
};

export default FeaturedProducts;
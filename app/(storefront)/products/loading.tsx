import Container from "@/components/layout/container";
import ProductGridSkeleton from "@/components/product/product-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsLoading = () => {
    return (
        <Container className="py-8">
            <Skeleton className="h-9 w-56" />
            <Skeleton className="mt-2 h-5 w-72" />
            <Skeleton className="mb-8 mt-6 h-10 w-full" />
            <ProductGridSkeleton />
        </Container>
    );
};

export default ProductsLoading;
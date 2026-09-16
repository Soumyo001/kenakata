import Container from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsLoading = () => {
    return (
        <Container className="py-8">
            <Skeleton className="mb-6 h-5 w-64 max-w-full" />
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                <div>
                    <Skeleton className="aspect-square rounded-xl" />
                    <div className="mt-3 grid grid-cols-4 gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="aspect-square rounded-lg" />
                        ))}
                    </div>
                </div>
                <div>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="mt-3 h-9 w-3/4" />
                    <Skeleton className="mt-4 h-9 w-32" />
                    <div className="mt-6 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="mt-8 h-11 w-40" />
                </div>
            </div>
        </Container>
    );
};

export default ProductDetailsLoading;
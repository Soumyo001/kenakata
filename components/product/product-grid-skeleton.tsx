import { Skeleton } from "@/components/ui/skeleton";
import { PER_PAGE } from "@/lib/data/constants";

const ProductGridSkeleton = ({ count = PER_PAGE }: { count?: number }) => {
    return (
        <div>
            <Skeleton className="mb-4 h-5 w-48" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border">
                        <Skeleton className="aspect-square rounded-none" />
                        <div className="space-y-2 p-3 sm:p-4">
                            <Skeleton className="h-3 w-1/3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="mt-3 h-6 w-1/4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGridSkeleton;
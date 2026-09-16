import { Skeleton } from "@/components/ui/skeleton";

const CartSkeleton = () => {
    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="divide-y border-y lg:col-span-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-3 py-4 sm:gap-4">
                        <Skeleton className="h-20 w-20 shrink-0 rounded-lg sm:h-24 sm:w-24" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="mt-4 h-8 w-24" />
                        </div>
                    </div>
                ))}
            </div>
            <Skeleton className="h-64 rounded-xl" />
        </div>
    );
};

export default CartSkeleton;
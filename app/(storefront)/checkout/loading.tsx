import Container from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutLoading = () => {
    return (
        <Container className="py-8">
            <Skeleton className="mb-6 h-9 w-40" />

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    <section>
                        <Skeleton className="h-6 w-44" />

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <Skeleton className="h-10 sm:col-span-2" />
                            <Skeleton className="h-10" />
                            <Skeleton className="h-10" />
                            <Skeleton className="h-10 sm:col-span-2" />
                            <Skeleton className="h-10" />
                            <Skeleton className="h-10" />
                        </div>
                    </section>

                    <section>
                        <Skeleton className="h-6 w-24" />

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                        </div>
                    </section>

                    <Skeleton className="h-11 w-full" />
                </div>

                <div className="order-first lg:order-0">
                    <Skeleton className="h-64 rounded-xl" />
                </div>
            </div>
        </Container>
    );
};

export default CheckoutLoading;
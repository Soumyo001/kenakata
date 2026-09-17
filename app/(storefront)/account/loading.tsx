import Container from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

const AccountLoading = () => {
    return (
        <Container className="py-8">
            <Skeleton className="mb-6 h-9 w-40" />

            <div className="max-w-xl rounded-xl border p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-14 w-14 rounded-full" />

                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-52" />
                    </div>

                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <Skeleton className="h-10 w-36" />
                <Skeleton className="h-10 w-28" />
            </div>

            <section className="mt-10 max-w-3xl">
                <Skeleton className="h-7 w-44" />
                <Skeleton className="mt-2 h-4 w-64" />

                <div className="mt-4 space-y-4">
                    <Skeleton className="h-44 rounded-xl" />
                    <Skeleton className="h-44 rounded-xl" />
                </div>
            </section>
        </Container>
    );
};

export default AccountLoading;
import Container from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <Container className="py-12">
            <Skeleton className="mb-6 h-8 w-48" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
            </div>
        </Container>
    );
};

export default Loading;
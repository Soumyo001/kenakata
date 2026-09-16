import Link from "next/link";
import { PackageX } from "lucide-react";
import Container from "@/components/layout/container";
import EmptyState from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

const ProductNotFound = () => {
    return (
        <Container className="py-16">
            <EmptyState
                icon={PackageX}
                title="Product not found"
                description="This product may have been removed, or the link is incorrect."
            >
                <Button asChild>
                    <Link href="/products">Browse products</Link>
                </Button>
            </EmptyState>
        </Container>
    );
};

export default ProductNotFound;
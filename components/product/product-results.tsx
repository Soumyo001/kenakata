import { PackageSearch } from "lucide-react";
import ProductGrid from "@/components/product/product-grid";
import PaginationControls from "@/components/shared/pagination-controls";
import EmptyState from "@/components/shared/empty-state";
import { getProductListing } from "@/lib/api/products";
import { PER_PAGE } from "@/lib/data/constants";
import { ListingParamsSchemaType } from "@/lib/validators/schema-validators/listing-params.schema";

const ProductResults = async ({ params }: { params: ListingParamsSchemaType }) => {
    const { items, total, page, totalPages } = await getProductListing(params);

    if (total === 0) {
        return (
            <EmptyState
                icon={PackageSearch}
                title="No products found"
                description="Try a different search term, category, or price range, or clear your filters."
            />
        );
    }

    const first = (page - 1) * PER_PAGE + 1;
    const last = first + items.length - 1;

    return (
        <section>
            <p className="mb-4 text-sm text-muted-foreground">
                Showing {first}-{last} of {total} products
            </p>
            <ProductGrid products={items} />
            <PaginationControls params={params} page={page} totalPages={totalPages} />
        </section>
    );
};

export default ProductResults;
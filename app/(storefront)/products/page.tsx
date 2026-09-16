import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/layout/container";
import ProductFilters from "@/components/product/product-filters";
import ProductResults from "@/components/product/product-results";
import ProductGridSkeleton from "@/components/product/product-grid-skeleton";
import { getCategories } from "@/lib/api/categories";
import { parseListingParams } from "@/lib/helpers/listing-helper";

export const metadata: Metadata = {
    title: "Products",
    description: "Browse, search, and filter every product on Kenakata.",
};

type ProductsPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
    const [rawParams, categories] = await Promise.all([searchParams, getCategories()]);
    const parsed = parseListingParams(rawParams);
    // console.log("Params from url",parsed, rawParams);

    const categoryExists = categories.some((category) => category.id === parsed.category);
    const params = categoryExists ? parsed : { ...parsed, category: undefined };

    return (
      <Container className="py-8">
        <div className="mb-6">
          <h1 className="text-2xl xs:text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-sm xs:text-base mt-1 text-muted-foreground">Find exactly what you&apos;re looking for.</p>
        </div>
        <ProductFilters categories={categories} params={params} />
        <Suspense key={JSON.stringify(params)} fallback={<ProductGridSkeleton />}>
            <ProductResults params={params} />
        </Suspense>
      </Container>
    );
};

export default ProductsPage;
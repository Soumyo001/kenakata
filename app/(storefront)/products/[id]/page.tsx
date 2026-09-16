import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Container from "@/components/layout/container";
import ProductGallery from "@/components/product/product-gallery";
import RelatedProducts from "@/components/product/related-products";
import ProductGridSkeleton from "@/components/product/product-grid-skeleton";
import { Badge } from "@/components/ui/badge";
import { getProductById, getProducts } from "@/lib/api/products";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/product/add-to-cart-button";

const PRERENDERED_PRODUCT_COUNT = 20;

type ProductDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
    const products = await getProducts({ offset: 0, limit: PRERENDERED_PRODUCT_COUNT });
    // console.log("PRODUCTSSS", products)
    return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) return { title: "Product not found" };

    return {
        title: product.title,
        description: product.description.slice(0, 160),
    };
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) notFound();

    return (
        <Container className="py-8">
            <nav className="mb-6 flex min-w-0 items-center gap-1 text-sm text-muted-foreground">
                <Link href="/products" className="shrink-0 hover:text-foreground">
                    Products
                </Link>
                {product.category && (
                    <>
                        <ChevronRight className="h-4 w-4 shrink-0" />
                        <Link
                            href={`/products?category=${product.category.id}`}
                            className="max-w-[35%] truncate hover:text-foreground"
                        >
                            {product.category.name}
                        </Link>
                    </>
                )}
                <ChevronRight className="h-4 w-4 shrink-0" />
                <span className="truncate text-foreground">{product.title}</span>
            </nav>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                <ProductGallery images={product.images} title={product.title} />

                <div className="flex min-w-0 flex-col">
                    {product.category && (
                        <Badge variant="secondary" asChild className="w-fit">
                            <Link href={`/products?category=${product.category.id}`}>
                                {product.category.name}
                            </Link>
                        </Badge>
                    )}

                    <h1 className="mt-3 text-2xl font-bold tracking-tight wrap-anywhere sm:text-3xl">
                        {product.title}
                    </h1>

                    <p className="mt-4 text-3xl font-bold wrap-anywhere">{formatPrice(product.price)}</p>

                    <p className="mt-6 leading-relaxed text-muted-foreground wrap-anywhere">
                        {product.description}
                    </p>

                    <div className="mt-8">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>

            {product.category && (
                <Suspense fallback={<div className="mt-16"><ProductGridSkeleton count={4} /></div>}>
                    <RelatedProducts categoryId={product.category.id} excludeId={product.id} />
                </Suspense>
            )}
        </Container>
    );
};

export default ProductDetailsPage;
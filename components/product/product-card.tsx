import Link from "next/link";
import { ProductType } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import SafeImage from "@/components/shared/safe-image";

const ProductCard = ({ product }: { product: ProductType }) => {
    return (
        <Link href={`/products/${product.id}`} className="group">
            <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <SafeImage
                        src={product.images[0]}
                        alt={product.title}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <CardContent className="p-2 sm:p-4">
                    <p className="truncate text-xs text-muted-foreground">{product.category?.name}</p>
                    <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-medium">
                        {product.title}
                    </h3>
                </CardContent>
                
                <CardFooter className="mt-auto p-2 pt-0 sm:p-4 sm:pt-0">
                    <span className="min-w-0 truncate text-base font-bold sm:text-lg">
                        {formatPrice(product.price)}
                    </span>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ProductCard;
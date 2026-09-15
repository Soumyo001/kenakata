import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProductCard = ({ product }: { product: ProductType }) => {
    return (
        <Link href={`/products/${product.id}`}>
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative aspect-square">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                    />
                </div>
                <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{product.category.name}</p>
                    <h3 className="line-clamp-1 font-medium">{product.title}</h3>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <span className="text-lg font-bold">${product.price}</span>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ProductCard;
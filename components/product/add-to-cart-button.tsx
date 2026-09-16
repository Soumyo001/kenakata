"use client";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { MAX_CART_QUANTITY } from "@/lib/data/constants";
import { ProductType } from "@/lib/types";

const AddToCartButton = ({ product }: { product: ProductType }) => {
    const { items, addItem } = useCart();

    const quantityInCart = items.find((item) => item.id === product.id)?.quantity ?? 0;
    const isAtLimit = quantityInCart >= MAX_CART_QUANTITY;

    const handleAdd = () => {
        addItem(product);
        toast.success("Added to cart", { description: product.title });
    };

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <Button size="lg" onClick={handleAdd} disabled={isAtLimit} className="w-full sm:w-auto">
                <ShoppingCart className="h-4 w-4" />
                {isAtLimit ? "Maximum quantity in cart" : "Add to cart"}
            </Button>
            {quantityInCart > 0 && (
                <p className="text-sm text-muted-foreground">{quantityInCart} in your cart</p>
            )}
        </div>
    );
};

export default AddToCartButton;
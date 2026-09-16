"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import CartItemRow from "@/components/cart/cart-item-row";
import CartSummary from "@/components/cart/cart-summary";
import CartSkeleton from "@/components/cart/cart-skeleton";
import EmptyState from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useIsClient } from "@/hooks/use-is-client";

const CartView = () => {
    const isClient = useIsClient();
    const { items, totalItems, subtotal, removeItem, updateQuantity } = useCart();

    if (!isClient) return <CartSkeleton />;

    if (items.length === 0) {
        return (
            <EmptyState
                icon={ShoppingBag}
                title="Your cart is empty"
                description="Browse the store and add something you like."
            >
                <Button asChild>
                    <Link href="/products">Start shopping</Link>
                </Button>
            </EmptyState>
        );
    }

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <ul className="divide-y border-y lg:col-span-2">
                {items.map((item) => (
                    <CartItemRow
                        key={item.id}
                        item={item}
                        onQuantityChange={updateQuantity}
                        onRemove={removeItem}
                    />
                ))}
            </ul>
            
            <div className="lg:sticky lg:top-24 lg:self-start">
                <CartSummary subtotal={subtotal} totalItems={totalItems}>
                    <Button size="lg" asChild className="w-full">
                        <Link href="/checkout">Proceed to checkout</Link>
                    </Button>
                </CartSummary>
            </div>
        </div>
    );
};

export default CartView;
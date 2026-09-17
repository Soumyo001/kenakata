"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import CartSkeleton from "@/components/cart/cart-skeleton";
import CartSummary from "@/components/cart/cart-summary";
import CheckoutForm from "@/components/forms/checkout-form";
import EmptyState from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useIsClient } from "@/hooks/use-is-client";
import { formatPrice } from "@/lib/utils";
import { UserType } from "@/lib/types";

const CheckoutView = ({ user }: { user: UserType }) => {
    const isClient = useIsClient();
    const { items, totalItems, subtotal } = useCart();

    if (!isClient) return <CartSkeleton />;

    if (items.length === 0) {
        return (
            <EmptyState
                icon={ShoppingBag}
                title="Nothing to check out"
                description="Your cart is empty. Add some products before checking out."
            >
                <Button asChild>
                    <Link href="/products">Browse products</Link>
                </Button>
            </EmptyState>
        );
    }

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <CheckoutForm items={items} user={user} />
            </div>

            <div className="order-first lg:order-0 lg:sticky lg:top-24 lg:self-start">
                <CartSummary subtotal={subtotal} totalItems={totalItems}>
                    <ul className="space-y-3 border-t pt-4 text-sm">
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between gap-3">
                                <span className="min-w-0 truncate text-muted-foreground">
                                    {item.quantity} × {item.title}
                                </span>
                                <span className="max-w-1/2 shrink-0 truncate">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </CartSummary>
            </div>
        </div>
    );
};

export default CheckoutView;
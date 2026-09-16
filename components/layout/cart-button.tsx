"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

const CartButton = () => {
    const { totalItems } = useCart();

    return (
        <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
                        {totalItems > 9 ? "9+" : totalItems}
                    </span>
                )}
            </Link>
        </Button>
    );
};

export default CartButton;
import { CartItemType, ProductType } from "@/lib/types";
import { MAX_CART_QUANTITY } from "@/lib/data/constants";

export function addCartItem(items: CartItemType[], product: ProductType, quantity: number = 1): CartItemType[] {
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
        return items.map((item) =>
            item.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_CART_QUANTITY) }
                : item
        );
    }

    return [
        ...items,
        {
            id:       product.id,
            title:    product.title,
            price:    product.price,
            image:    product.images[0],
            quantity: Math.min(quantity, MAX_CART_QUANTITY),
        },
    ];
}

export function getCartTotals(items: CartItemType[]) {
    return items.reduce(
        (totals, item) => ({
            totalItems: totals.totalItems + item.quantity,
            subtotal:   totals.subtotal + item.price * item.quantity,
        }),
        { totalItems: 0, subtotal: 0 }
    );
}
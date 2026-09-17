import { CartItemType, ProductType } from "@/lib/types";
import { FREE_SHIPPING_THRESHOLD, MAX_CART_QUANTITY, SHIPPING_FEE } from "@/lib/data/constants";

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

export function mergeCartItems(
    currentItems: CartItemType[],
    incomingItems: CartItemType[]
): CartItemType[] {
    return incomingItems.reduce<CartItemType[]>((items, incoming) => {
        const existing = items.find((item) => item.id === incoming.id);

        if (!existing) {
            return [...items, incoming];
        }

        return items.map((item) =>
            item.id === incoming.id
                ? {
                      ...item,
                      quantity: Math.min(
                          item.quantity + incoming.quantity,
                          MAX_CART_QUANTITY
                      ),
                  }
                : item
        );
    }, [...currentItems]);
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

export function removeCartItem(items: CartItemType[], id: number): CartItemType[] {
    return items.filter((item) => item.id !== id);
}

export function updateCartItemQuantity(items: CartItemType[], id: number, quantity: number): CartItemType[] {
    const clamped = Math.min(Math.max(quantity, 1), MAX_CART_QUANTITY);
    return items.map((item) => (item.id === id ? { ...item, quantity: clamped } : item));
}

export function getOrderTotals(subtotal: number) {
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    return { subtotal, shipping, total: subtotal + shipping };
}
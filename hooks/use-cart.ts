import { useSyncExternalStore } from "react";
import { CartItemType, ProductType } from "@/lib/types";
import { CART_STORAGE_KEY } from "@/lib/data/constants";
import { CartSchema } from "@/lib/validators/schema-validators/cart.schema";
import { addCartItem, getCartTotals } from "@/lib/helpers/cart-helper";

const EMPTY_CART: CartItemType[] = [];
const listeners = new Set<() => void>();

// useSyncExternalStore compares snapshots by reference. Returning a freshly parsed array on
// every read would look like a change every time and re-render forever, so we cache the last
// parsed result and only re-parse when the raw string actually changes.
let cachedRaw: string | null = null;
let cachedItems: CartItemType[] = EMPTY_CART;

function readCart(): CartItemType[] {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw === cachedRaw) return cachedItems;

    cachedRaw = raw;
    try {
        const parsed = CartSchema.safeParse(JSON.parse(raw ?? "[]"));
        cachedItems = parsed.success ? parsed.data : EMPTY_CART;
    } catch {
        cachedItems = EMPTY_CART;
    }
    return cachedItems;
}

function writeCart(items: CartItemType[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    // The browser's storage event only fires in other tabs. so, notify this tab ourselves.
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    window.addEventListener("storage", listener);

    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
    };
}

export function useCart() {
    const items = useSyncExternalStore(subscribe, readCart, () => EMPTY_CART);
    const { totalItems, subtotal } = getCartTotals(items);

    const addItem = (product: ProductType, quantity: number = 1) => {
        writeCart(addCartItem(readCart(), product, quantity));
    };

    return { items, totalItems, subtotal, addItem };
}
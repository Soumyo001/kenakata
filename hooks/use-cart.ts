import { useSyncExternalStore } from "react";
import { CartItemType, ProductType } from "@/lib/types";
import {
    CART_OWNER_KEY,
    CART_STORAGE_KEY,
} from "@/lib/data/constants";
import { CartSchema } from "@/lib/validators/schema-validators/cart.schema";
import {
    addCartItem,
    getCartTotals,
    mergeCartItems,
    removeCartItem,
    updateCartItemQuantity,
} from "@/lib/helpers/cart-helper";

const EMPTY_CART: CartItemType[] = [];
const listeners = new Set<() => void>();

// The cache has to remember the storage key too, because changing users can
// change the cart even when two stored JSON strings happen to be identical.
let cachedKey: string | null = null;
let cachedRaw: string | null = null;
let cachedItems: CartItemType[] = EMPTY_CART;

function getUserCartKey(userId: number): string {
    return `${CART_STORAGE_KEY}:user:${userId}`;
}

function getActiveCartKey(): string {
    const owner = localStorage.getItem(CART_OWNER_KEY);
    if (!owner) return CART_STORAGE_KEY;

    const userId = Number(owner);
    if (!Number.isInteger(userId) || userId <= 0) {
        return CART_STORAGE_KEY;
    }

    return getUserCartKey(userId);
}

function parseCart(raw: string | null): CartItemType[] {
    try {
        const parsed = CartSchema.safeParse(JSON.parse(raw ?? "[]"));
        return parsed.success ? parsed.data : EMPTY_CART;
    } catch {
        return EMPTY_CART;
    }
}

function resetCache(): void {
    cachedKey = null;
    cachedRaw = null;
    cachedItems = EMPTY_CART;
}

function notifyListeners(): void {
    listeners.forEach((listener) => listener());
}

export function activateUserCart(userId: number): void {
    const userKey = getUserCartKey(userId);

    const guestItems = parseCart(
        localStorage.getItem(CART_STORAGE_KEY)
    );

    const userItems = parseCart(
        localStorage.getItem(userKey)
    );

    const mergedItems = mergeCartItems(userItems, guestItems);

    localStorage.setItem(userKey, JSON.stringify(mergedItems));
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.setItem(CART_OWNER_KEY, String(userId));

    resetCache();
    notifyListeners();
}

export function activateGuestCart(): void {
    localStorage.removeItem(CART_OWNER_KEY);

    resetCache();
    notifyListeners();
}

export function clearCart(): void {
    writeCart(EMPTY_CART);
}

function readCart(): CartItemType[] {
    const key = getActiveCartKey();
    const raw = localStorage.getItem(key);

    if (key === cachedKey && raw === cachedRaw) {
        return cachedItems;
    }

    cachedKey = key;
    cachedRaw = raw;
    cachedItems = parseCart(raw);

    return cachedItems;
}

function writeCart(items: CartItemType[]): void {
    const key = getActiveCartKey();
    localStorage.setItem(key, JSON.stringify(items));
    resetCache();
    notifyListeners();
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

    const removeItem = (id: number) => {
        writeCart(removeCartItem(readCart(), id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        writeCart(updateCartItemQuantity(readCart(), id, quantity));
    };

    return { items, totalItems, subtotal, addItem, removeItem, updateQuantity };
}
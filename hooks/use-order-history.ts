import { useCallback, useSyncExternalStore } from "react";
import { ORDER_HISTORY_STORAGE_KEY } from "@/lib/data/constants";
import { OrderHistoryItemType } from "@/lib/types";
import { OrderHistorySchema } from "@/lib/validators/schema-validators/order-history.schema";

const EMPTY_HISTORY: OrderHistoryItemType[] = [];
const listeners = new Set<() => void>();

let cachedKey: string | null = null;
let cachedRaw: string | null = null;
let cachedHistory: OrderHistoryItemType[] = EMPTY_HISTORY;

function getOrderHistoryKey(userId: number): string {
    return `${ORDER_HISTORY_STORAGE_KEY}:user:${userId}`;
}

function parseOrderHistory(raw: string | null): OrderHistoryItemType[] {
    try {
        const parsed = OrderHistorySchema.safeParse(
            JSON.parse(raw ?? "[]")
        );

        return parsed.success ? parsed.data : EMPTY_HISTORY;
    } catch {
        return EMPTY_HISTORY;
    }
}

function resetCache(): void {
    cachedKey = null;
    cachedRaw = null;
    cachedHistory = EMPTY_HISTORY;
}

function notifyListeners(): void {
    listeners.forEach((listener) => listener());
}

function readOrderHistory(userId: number): OrderHistoryItemType[] {
    const key = getOrderHistoryKey(userId);
    const raw = localStorage.getItem(key);

    if (key === cachedKey && raw === cachedRaw) {
        return cachedHistory;
    }

    cachedKey = key;
    cachedRaw = raw;
    cachedHistory = parseOrderHistory(raw);

    return cachedHistory;
}

export function saveOrderHistoryItem( userId: number, order: OrderHistoryItemType) {
    const key = getOrderHistoryKey(userId);
    const current = readOrderHistory(userId);

    // Keep newest orders first and prevent accidental duplicate writes.
    const next = [
        order,
        ...current.filter((item) => item.orderId !== order.orderId),
    ];

    localStorage.setItem(key, JSON.stringify(next));

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

export function useOrderHistory(userId: number): OrderHistoryItemType[] {
    const getSnapshot = useCallback(
        () => readOrderHistory(userId),
        [userId]
    );

    return useSyncExternalStore(
        subscribe,
        getSnapshot,
        () => EMPTY_HISTORY
    );
}
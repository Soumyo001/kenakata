"use client";

import { ReceiptText } from "lucide-react";
import EmptyState from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsClient } from "@/hooks/use-is-client";
import { useOrderHistory } from "@/hooks/use-order-history";
import { getCartTotals } from "@/lib/helpers/cart-helper";
import { PaymentMethodType } from "@/lib/types";
import { formatDateTime, formatPrice } from "@/lib/utils";

const PAYMENT_LABELS: Record<PaymentMethodType, string> = {
    cod: "Cash on delivery",
    card: "Card",
};

const TransactionHistory = ({ userId }: { userId: number }) => {
    const isClient = useIsClient();
    const orders = useOrderHistory(userId);

    return (
        <section className="mt-10 max-w-3xl">
            <div className="mb-4">
                <h2 className="text-xl font-semibold">
                    Transaction history
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Your confirmed orders on this device.
                </p>
            </div>

            {!isClient ? (
                <Skeleton className="h-40 rounded-xl" />
            ) : orders.length === 0 ? (
                <EmptyState
                    icon={ReceiptText}
                    title="No transactions yet"
                    description="Your completed orders will appear here."
                />
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const { totalItems } = getCartTotals(order.items);

                        return (
                            <Card key={order.orderId}>
                                <CardContent>
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-mono text-sm font-medium">
                                                {order.orderId}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {formatDateTime(order.createdAt)}
                                            </p>
                                        </div>

                                        <Badge variant="secondary">
                                            Confirmed
                                        </Badge>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Payment
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {PAYMENT_LABELS[order.paymentMethod]}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Items
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {totalItems}
                                            </p>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <p className="text-xs text-muted-foreground">
                                                Total
                                            </p>
                                            <p className="mt-1 font-semibold">
                                                {formatPrice(order.total)}
                                            </p>
                                        </div>
                                    </div>

                                    <details className="mt-4 border-t pt-3">
                                        <summary className="cursor-pointer text-sm font-medium">
                                            View items
                                        </summary>

                                        <ul className="mt-3 space-y-2">
                                            {order.items.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="flex justify-between gap-4 text-sm"
                                                >
                                                    <span className="min-w-0 truncate text-muted-foreground">
                                                        {item.quantity} × {item.title}
                                                    </span>

                                                    <span className="shrink-0">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default TransactionHistory;
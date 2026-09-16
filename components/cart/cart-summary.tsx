import { Separator } from "@/components/ui/separator";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data/constants";
import { getOrderTotals } from "@/lib/helpers/cart-helper";
import { formatPrice } from "@/lib/utils";

type CartSummaryProps = {
    subtotal: number;
    totalItems: number;
    children?: React.ReactNode;
};

const CartSummary = ({ subtotal, totalItems, children }: CartSummaryProps) => {
    const { shipping, total } = getOrderTotals(subtotal);

    return (
        <div className="rounded-xl border p-4 sm:p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>

            <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </dt>
                    <dd className="min-w-0 truncate">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                </div>
            </dl>

            {shipping > 0 && (
                <p className="mt-3 rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                </p>
            )}

            <Separator className="my-4" />

            <div className="flex justify-between gap-4 font-semibold">
                <span>Total</span>
                <span className="min-w-0 truncate">{formatPrice(total)}</span>
            </div>

            {children && <div className="mt-6">{children}</div>}
        </div>
    );
};

export default CartSummary;
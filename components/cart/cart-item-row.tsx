import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import SafeImage from "@/components/shared/safe-image";
import { Button } from "@/components/ui/button";
import { MAX_CART_QUANTITY } from "@/lib/data/constants";
import { CartItemType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type CartItemRowProps = {
    item: CartItemType;
    onQuantityChange: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
};

const CartItemRow = ({ item, onQuantityChange, onRemove }: CartItemRowProps) => {
    return (
        <li className="flex gap-3 py-4 sm:gap-4">
            <Link
                href={`/products/${item.id}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-24"
            >
                <SafeImage src={item.image} alt={item.title} sizes="96px" className="object-cover" />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                    <Link
                        href={`/products/${item.id}`}
                        className="line-clamp-2 text-sm font-medium wrap-anywhere hover:underline"
                    >
                        {item.title}
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove(item.id)}
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <p className="mt-1 truncate text-sm text-muted-foreground">{formatPrice(item.price)} each</p>

                <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <div className="flex shrink-0 items-center rounded-md border">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={item.quantity <= 1}
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={item.quantity >= MAX_CART_QUANTITY}
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                    <p className="min-w-0 truncate font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
            </div>
        </li>
    );
};

export default CartItemRow;
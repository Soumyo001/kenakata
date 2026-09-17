import { CartItemType } from "@/lib/types/cart.type";
import { PaymentMethodType } from "@/lib/types/order.type";

export type OrderHistoryItemType = {
    orderId: string;
    createdAt: string;
    paymentMethod: PaymentMethodType;
    total: number;
    items: CartItemType[];
};
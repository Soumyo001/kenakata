import { z } from "zod";
import { PAYMENT_METHODS } from "@/lib/data/constants";
import { OrderHistoryItemType } from "@/lib/types";
import { CartItemSchema } from "@/lib/validators/schema-validators/cart.schema";

export const OrderHistoryItemSchema = z.object({
    orderId: z.string().regex(/^KK-[A-F0-9]{8}$/),
    createdAt: z.string(),
    paymentMethod: z.enum(PAYMENT_METHODS),
    total: z.number().min(0),
    items: z.array(CartItemSchema).min(1),
});

export const OrderHistorySchema: z.ZodType<OrderHistoryItemType[]> =
    z.array(OrderHistoryItemSchema);
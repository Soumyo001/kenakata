import { z } from "zod";
import { PAYMENT_METHODS } from "@/lib/data/constants";
import { CartItemSchema } from "@/lib/validators/schema-validators/cart.schema";
import { ShippingDetailsSchema } from "@/lib/validators/schema-validators/checkout.schema";

export const OrderPayloadSchema = z.object({
    shipping: ShippingDetailsSchema,
    paymentMethod: z.enum(PAYMENT_METHODS),
    cardLast4: z.string().regex(/^\d{4}$/).optional(),
    items: z.array(CartItemSchema).min(1, { message: "Cart is empty" }),
}).refine((data) => data.paymentMethod !== "card" || data.cardLast4 !== undefined, {
    message: "Card details are required for card payments",
    path: ["cardLast4"],
});

export type OrderPayloadSchemaType = z.infer<typeof OrderPayloadSchema>;
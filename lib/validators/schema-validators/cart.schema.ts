import { z } from "zod";
import { MAX_CART_QUANTITY } from "@/lib/data/constants";
import { CartItemType } from "@/lib/types";

const CartItemSchema = z.object({
    id: z.number().int().positive(),
    title: z.string(),
    price: z.number().min(0),
    image: z.string(),
    quantity: z.number().int().min(1).max(MAX_CART_QUANTITY),
});

export const CartSchema: z.ZodType<CartItemType[]> = z.array(CartItemSchema);
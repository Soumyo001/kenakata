import { NextResponse } from "next/server";
import { z } from "zod";
import { OrderPayloadSchema } from "@/lib/validators/payload-validators/order.schema";
import { getCartTotals, getOrderTotals } from "@/lib/helpers/cart-helper";
import { DECLINED_TEST_CARD_LAST4, MOCK_PAYMENT_DELAY_MS } from "@/lib/data/constants";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const parsed = OrderPayloadSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Invalid order data", errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        await new Promise((resolve) => setTimeout(resolve, MOCK_PAYMENT_DELAY_MS));

        const { paymentMethod, cardLast4, items } = parsed.data;

        if (paymentMethod === "card" && cardLast4 === DECLINED_TEST_CARD_LAST4) {
            return NextResponse.json(
                { message: "Your card was declined. Please try a different card." },
                { status: 402 }
            );
        }
        
        const { total } = getOrderTotals(getCartTotals(items).subtotal);
        const orderId = `KK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

        return NextResponse.json({ message: "Order placed", orderId, total }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ message: `Server error: ${err.message}` }, { status: 500 });
    }
};
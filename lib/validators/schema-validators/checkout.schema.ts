import { z } from "zod";
import { PAYMENT_METHODS } from "@/lib/data/constants";

const CARD_NUMBER_REGEX = /^(\d{4} ?){3}\d{4}$/;
const CARD_EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CARD_CVC_REGEX = /^\d{3,4}$/;

function isCardExpired(expiry: string): boolean {
    const [month, year] = expiry.split("/").map(Number);
    const firstDayAfterExpiry = new Date(2000 + year, month, 1);
    return firstDayAfterExpiry <= new Date();
}

export const ShippingDetailsSchema = z.object({
    fullName: z.string().trim().min(2, { message: "Please enter your full name" }),
    email: z.string().trim()
        .min(1, { message: "Please enter your email" })
        .email({ message: "Please enter a valid email" }),
    phone: z.string().trim().regex(/^\+?\d{10,15}$/, { message: "Please enter a valid phone number" }),
    address: z.string().trim().min(5, { message: "Please enter your street address" }),
    city: z.string().trim().min(2, { message: "Please enter your city" }),
    postalCode: z.string().trim().regex(/^\d{4,10}$/, { message: "Please enter a valid postal code" }),
});

export const CheckoutSchema = ShippingDetailsSchema.extend({
    paymentMethod: z.enum(PAYMENT_METHODS),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.paymentMethod !== "card") return;

    const expiry = data.cardExpiry ?? "";

    if (!CARD_NUMBER_REGEX.test(data.cardNumber ?? "")) {
        ctx.addIssue({ code: "custom", path: ["cardNumber"], message: "Enter a 16-digit card number" });
    }
    if (!CARD_EXPIRY_REGEX.test(expiry)) {
        ctx.addIssue({ code: "custom", path: ["cardExpiry"], message: "Use MM/YY format" });
    } else if (isCardExpired(expiry)) {
        ctx.addIssue({ code: "custom", path: ["cardExpiry"], message: "This card has expired" });
    }
    if (!CARD_CVC_REGEX.test(data.cardCvc ?? "")) {
        ctx.addIssue({ code: "custom", path: ["cardCvc"], message: "Enter the 3 or 4 digit code" });
    }
});

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;
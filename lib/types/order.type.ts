import type { PAYMENT_METHODS } from "@/lib/data/constants";

export type PaymentMethodType = (typeof PAYMENT_METHODS)[number];
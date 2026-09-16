"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import FormField from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DECLINED_TEST_CARD_LAST4, PAYMENT_METHODS } from "@/lib/data/constants";
import { getCartTotals, getOrderTotals } from "@/lib/helpers/cart-helper";
import { CartItemType, PaymentMethodType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
    CheckoutSchema,
    CheckoutSchemaType,
    ShippingDetailsSchema,
} from "@/lib/validators/schema-validators/checkout.schema";

const PAYMENT_LABELS: Record<PaymentMethodType, { title: string; description: string }> = {
    cod:  { title: "Cash on delivery", description: "Pay when your order arrives" },
    card: { title: "Credit / debit card", description: "Test mode, no real charge" },
};

const CheckoutForm = ({ items }: { items: CartItemType[] }) => {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutSchemaType>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
            paymentMethod: "cod",
            cardNumber: "",
            cardExpiry: "",
            cardCvc: "",
        },
    });

    const paymentMethod = useWatch({ control, name: "paymentMethod" });
    const { total } = getOrderTotals(getCartTotals(items).subtotal);
    const isBusy = isSubmitting || isRedirecting;

    const onSubmit = async (values: CheckoutSchemaType) => {
        const shipping = ShippingDetailsSchema.parse(values);
        const cardLast4 = values.paymentMethod === "card"
            ? values.cardNumber?.replace(/\s/g, "").slice(-4)
            : undefined;

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ shipping, paymentMethod: values.paymentMethod, cardLast4, items }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            setIsRedirecting(true);
            router.replace(`/checkout/success?order=${data.orderId}`);
        } catch (err: any) {
            toast.error(err.message ?? "Something went wrong. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
            <section>
                <h2 className="text-lg font-semibold">Contact & shipping</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <FormField id="fullName" label="Full name" error={errors.fullName?.message} className="sm:col-span-2">
                        <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} {...register("fullName")} />
                    </FormField>
                    <FormField id="email" label="Email" error={errors.email?.message}>
                        <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
                    </FormField>
                    <FormField id="phone" label="Phone" error={errors.phone?.message}>
                        <Input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone")} />
                    </FormField>
                    <FormField id="address" label="Street address" error={errors.address?.message} className="sm:col-span-2">
                        <Input id="address" autoComplete="street-address" aria-invalid={!!errors.address} {...register("address")} />
                    </FormField>
                    <FormField id="city" label="City" error={errors.city?.message}>
                        <Input id="city" autoComplete="address-level2" aria-invalid={!!errors.city} {...register("city")} />
                    </FormField>
                    <FormField id="postalCode" label="Postal code" error={errors.postalCode?.message}>
                        <Input id="postalCode" inputMode="numeric" autoComplete="postal-code" aria-invalid={!!errors.postalCode} {...register("postalCode")} />
                    </FormField>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold">Payment</h2>

                <Controller
                    control={control}
                    name="paymentMethod"
                    render={({ field }) => (
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="mt-4 grid gap-3 sm:grid-cols-2">
                            {PAYMENT_METHODS.map((method) => (
                                <Label
                                    key={method}
                                    htmlFor={`payment-${method}`}
                                    className="cursor-pointer items-start rounded-lg border p-4 has-data-[state=checked]:border-blue-600 dark:has-data-[state=checked]:border-blue-400"
                                >
                                    <RadioGroupItem id={`payment-${method}`} value={method} className="mt-0.5" />
                                    <span className="grid gap-1">
                                        <span className="font-medium">{PAYMENT_LABELS[method].title}</span>
                                        <span className="text-xs font-normal text-muted-foreground">
                                            {PAYMENT_LABELS[method].description}
                                        </span>
                                    </span>
                                </Label>
                            ))}
                        </RadioGroup>
                    )}
                />

                {paymentMethod === "card" && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <FormField id="cardNumber" label="Card number" error={errors.cardNumber?.message} className="col-span-2">
                            <Input
                                id="cardNumber"
                                inputMode="numeric"
                                autoComplete="cc-number"
                                placeholder="4242 4242 4242 4242"
                                maxLength={19}
                                aria-invalid={!!errors.cardNumber}
                                {...register("cardNumber")}
                            />
                        </FormField>
                        <FormField id="cardExpiry" label="Expiry" error={errors.cardExpiry?.message}>
                            <Input id="cardExpiry" autoComplete="cc-exp" placeholder="MM/YY" maxLength={5} aria-invalid={!!errors.cardExpiry} {...register("cardExpiry")} />
                        </FormField>
                        <FormField id="cardCvc" label="CVC" error={errors.cardCvc?.message}>
                            <Input id="cardCvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength={4} aria-invalid={!!errors.cardCvc} {...register("cardCvc")} />
                        </FormField>
                        <p className="col-span-2 text-xs text-muted-foreground">
                            Test mode: any valid card number works. Use a card ending in {DECLINED_TEST_CARD_LAST4} to simulate a decline.
                        </p>
                    </div>
                )}
            </section>

            <Button type="submit" size="lg" className="w-full" disabled={isBusy}>
                {isBusy ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing payment...
                    </>
                ) : (
                    `Place order · ${formatPrice(total)}`
                )}
            </Button>
        </form>
    );
};

export default CheckoutForm;
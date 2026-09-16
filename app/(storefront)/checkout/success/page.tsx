import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CircleCheck } from "lucide-react";
import Container from "@/components/layout/container";
import ClearCartOnMount from "@/components/checkout/clear-cart-on-mount";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Order confirmed",
};

const ORDER_ID_REGEX = /^KK-[A-F0-9]{8}$/;

type CheckoutSuccessPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const CheckoutSuccessPage = async ({ searchParams }: CheckoutSuccessPageProps) => {
    const { order } = await searchParams;

    if (typeof order !== "string" || !ORDER_ID_REGEX.test(order)) redirect("/");

    return (
        <Container className="flex flex-col items-center py-16 text-center">
            <ClearCartOnMount />
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
                <CircleCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mt-6 text-2xl font-bold tracking-tight xs:text-3xl">Order confirmed</h1>
            <p className="mt-2 max-w-md text-muted-foreground">
                Thank you for shopping with Kenakata. Your order has been placed.
            </p>
            <p className="mt-6 rounded-lg border px-4 py-2 font-mono text-sm">{order}</p>
            <Button asChild className="mt-8">
                <Link href="/products">Continue shopping</Link>
            </Button>
        </Container>
    );
};

export default CheckoutSuccessPage;
import type { Metadata } from "next";
import Container from "@/components/layout/container";
import CheckoutView from "@/components/checkout/checkout-view";
import { requireUser } from "@/lib/auth/session";

export const metadata: Metadata = {
    title: "Checkout",
};

const CheckoutPage = async () => {
    const user = await requireUser("/checkout");

    return (
        <Container className="py-8">
            <h1 className="mb-6 text-2xl font-bold tracking-tight xs:text-3xl">Checkout</h1>
            <CheckoutView user={user} />
        </Container>
    );
};

export default CheckoutPage;
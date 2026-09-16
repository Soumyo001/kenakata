import type { Metadata } from "next";
import Container from "@/components/layout/container";
import CartView from "@/components/cart/cart-view";

export const metadata: Metadata = {
    title: "Cart",
};

const CartPage = () => {
    return (
        <Container className="py-8">
            <h1 className="mb-6 text-2xl font-bold tracking-tight xs:text-3xl">Shopping cart</h1>
            <CartView />
        </Container>
    );
};

export default CartPage;
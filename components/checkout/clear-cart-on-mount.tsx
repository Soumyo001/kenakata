"use client";
import { useEffect } from "react";
import { clearCart } from "@/hooks/use-cart";

const ClearCartOnMount = () => {
    useEffect(() => {
        clearCart();
    }, []);

    return null;
};

export default ClearCartOnMount;
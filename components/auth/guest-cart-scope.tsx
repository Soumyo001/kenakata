"use client";

import { useEffect } from "react";
import { activateGuestCart } from "@/hooks/use-cart";

const GuestCartScope = () => {
    useEffect(() => {
        activateGuestCart();
    }, []);

    return null;
};

export default GuestCartScope;
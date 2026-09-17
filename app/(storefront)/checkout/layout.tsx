import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

const CheckoutLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();
    if (!user) redirect("/login?redirect=/checkout");
    return <>{children}</>;
};

export default CheckoutLayout;
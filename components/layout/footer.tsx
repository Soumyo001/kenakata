import Link from "next/link";
import { Store } from "lucide-react";
import Container from "./container";

const Footer = () => {
    return (
        <footer className="border-t">
            <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-950">
                        <Store className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium">Kenakata.com</span>
                </Link>
                <nav className="flex gap-4 text-sm text-muted-foreground">
                    <Link href="/products" className="hover:text-foreground">Products</Link>
                    <Link href="/cart" className="hover:text-foreground">Cart</Link>
                </nav>
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Kenakata. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
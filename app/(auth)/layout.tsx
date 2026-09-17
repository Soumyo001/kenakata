import Link from "next/link";
import { Store } from "lucide-react";
import ThemeToggle from "@/components/layout/theme-toggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-12">
            <div className="absolute right-4 top-4">
                <ThemeToggle />
            </div>

            <Link href="/" className="mb-8 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                    <Store className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-lg font-semibold">Kenakata.com</span>
            </Link>

            <div className="w-full max-w-sm">{children}</div>
        </div>
    );
};

export default AuthLayout;
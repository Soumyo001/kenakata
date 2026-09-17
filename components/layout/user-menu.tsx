"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User, UserRound } from "lucide-react";
import { toast } from "sonner";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserType } from "@/lib/types";

const UserMenu = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<UserType | null | undefined>(undefined);

    useEffect(() => {
        const controller = new AbortController();

        fetch("/api/auth/session", { signal: controller.signal })
            .then((res) => (res.ok ? res.json() : { user: null }))
            .then((data: { user: UserType | null }) => setUser(data.user))
            .catch((err) => {
                if (err.name !== "AbortError") setUser(null);
            });

        return () => controller.abort();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (!res.ok) throw new Error("Could not log out. Please try again.");

            setUser(null);
            toast.success("Logged out");
            router.refresh();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    if (user === undefined) {
        return <Skeleton className="h-9 w-9 rounded-full" />;
    }

    if (user === null) {
        // Only the pathname: useSearchParams here would force a Suspense boundary around the navbar on static pages.
        return (
            <Button variant="ghost" size="icon" asChild>
                <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
                    <UserRound className="h-5 w-5" />
                </Link>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <UserAvatar
                        name={user.name}
                        avatar={user.avatar}
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                        <User className="h-4 w-4" />
                        My account
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/container";
import UserAvatar from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/session";

export const metadata: Metadata = {
    title: "My account",
};

const AccountPage = async () => {
    const user = await requireUser("/account");

    return (
        <Container className="py-8">
            <h1 className="mb-6 text-2xl font-bold tracking-tight xs:text-3xl">My account</h1>

            <Card className="max-w-xl">
                <CardContent className="flex min-w-0 items-center gap-4 justify-center">
                    <UserAvatar name={user.name} avatar={user.avatar} className="h-14 w-14 text-lg" />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-lg text-center font-semibold">{user.name}</p>
                        <p className="truncate text-sm text-center text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 capitalize">
                        {user.role}
                    </Badge>
                </CardContent>
            </Card>

            <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                    <Link href="/products">Continue shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/cart">View cart</Link>
                </Button>
            </div>
        </Container>
    );
};

export default AccountPage;
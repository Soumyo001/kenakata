import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/forms/login-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getSafeRedirect } from "@/lib/helpers/auth-helper";

export const metadata: Metadata = {
    title: "Log in",
};

type LoginPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
    const { redirect: redirectParam } = await searchParams;
    const redirectTo = getSafeRedirect(typeof redirectParam === "string" ? redirectParam : null);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>Log in to check out and manage your account.</CardDescription>
            </CardHeader>

            <CardContent>
                <LoginForm redirectTo={redirectTo} />

                <p className="mt-4 rounded-md border border-dashed px-3 py-2 text-xs text-muted-foreground">
                    Demo account: <span className="font-mono">john@mail.com</span> /{" "}
                    <span className="font-mono">changeme</span>
                </p>
            </CardContent>

            <CardFooter className="justify-center text-sm text-muted-foreground">
                New to Kenakata?{" "}
                <Link
                    href={`/register?redirect=${encodeURIComponent(redirectTo)}`}
                    className="ml-1 font-medium text-foreground hover:underline"
                >
                    Create an account
                </Link>
            </CardFooter>
        </Card>
    );
};

export default LoginPage;
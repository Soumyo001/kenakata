import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/forms/register-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getSafeRedirect } from "@/lib/helpers/auth-helper";

export const metadata: Metadata = {
    title: "Create account",
};

type RegisterPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const RegisterPage = async ({ searchParams }: RegisterPageProps) => {
    const { redirect: redirectParam } = await searchParams;
    const redirectTo = getSafeRedirect(typeof redirectParam === "string" ? redirectParam : null);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>It takes less than a minute.</CardDescription>
            </CardHeader>

            <CardContent>
                <RegisterForm redirectTo={redirectTo} />
            </CardContent>

            <CardFooter className="justify-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
                    className="ml-1 font-medium text-foreground hover:underline"
                >
                    Log in
                </Link>
            </CardFooter>
        </Card>
    );
};

export default RegisterPage;
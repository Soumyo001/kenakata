"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import FormField from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applyServerErrors } from "@/lib/helpers/form-helper";
import { LoginSchema, LoginSchemaType } from "@/lib/validators/schema-validators/login.schema";

const LoginForm = ({ redirectTo }: { redirectTo: string }) => {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: "", password: "" },
    });

    const isBusy = isSubmitting || isRedirecting;

    const onSubmit = async (values: LoginSchemaType) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if (!res.ok) {
                applyServerErrors(setError, data);
                return;
            }

            setIsRedirecting(true);
            toast.success(`Welcome back, ${data.user.name}`);
            // replace, not push: pressing Back on the destination shouldn't return to a login form.
            router.replace(redirectTo);
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {errors.root && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {errors.root.message}
                </p>
            )}

            <FormField id="email" label="Email" error={errors.email?.message}>
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                />
            </FormField>

            <FormField id="password" label="Password" error={errors.password?.message}>
                <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                />
            </FormField>

            <Button type="submit" className="w-full" disabled={isBusy}>
                {isBusy ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Logging in...
                    </>
                ) : (
                    "Log in"
                )}
            </Button>
        </form>
    );
};

export default LoginForm;
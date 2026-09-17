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
import { RegisterSchema, RegisterSchemaType } from "@/lib/validators/schema-validators/register.schema";
import { activateUserCart } from "@/hooks/use-cart";

const RegisterForm = ({ redirectTo }: { redirectTo: string }) => {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });

    const isBusy = isSubmitting || isRedirecting;

    const onSubmit = async (values: RegisterSchemaType) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if (!res.ok) {
                applyServerErrors(setError, data);
                return;
            }
            activateUserCart(data.user.id);

            setIsRedirecting(true);
            toast.success(`Welcome to Kenakata, ${data.user.name}`);
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

            <FormField id="name" label="Full name" error={errors.name?.message}>
                <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
            </FormField>

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
                    autoComplete="new-password"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                />
                {!errors.password && (
                    <p className="text-xs text-muted-foreground">
                        8+ characters with uppercase, lowercase, and a number. Letters and numbers only.
                    </p>
                )}
            </FormField>

            <FormField id="confirmPassword" label="Confirm password" error={errors.confirmPassword?.message}>
                <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    aria-invalid={!!errors.confirmPassword}
                    {...register("confirmPassword")}
                />
            </FormField>

            <Button type="submit" className="w-full" disabled={isBusy}>
                {isBusy ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating account...
                    </>
                ) : (
                    "Create account"
                )}
            </Button>
        </form>
    );
};

export default RegisterForm;
import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().trim().min(2, { message: "Please enter your name" }),
    email: z.string().trim()
        .min(1, { message: "Please enter your email" })
        .email({ message: "Please enter a valid email" }),
    password: z.string()
        .min(1, { message: "Please enter your passowrd" })
        .min(6, { message: "Password must be at least 6 characters" })
        .regex(/[A-Z]/, "Must contain one uppercase letter")
        .regex(/[a-z]/, "Must contain one lowercase letter")
        .regex(/[0-9]/, "Must contain one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain special character"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
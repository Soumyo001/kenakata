import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().trim()
        .min(2, { message: "Please enter your name" })
        .max(50, { message: "Name must be at most 50 characters" }),
    email: z.string().trim().toLowerCase()
        .min(1, { message: "Please enter your email" })
        .email({ message: "Please enter a valid email" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(64, { message: "Password must be at most 64 characters" })
        .regex(/^[a-zA-Z0-9]+$/, { message: "Use letters and numbers only" })
        .regex(/[A-Z]/, { message: "Must contain one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain one number" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
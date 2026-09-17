import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().trim()
        .min(1, { message: "Please enter your email" })
        .email({ message: "Please enter a valid email" }),
    password: z.string().min(1, { message: "Please enter your password" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
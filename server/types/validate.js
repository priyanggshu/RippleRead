import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6)
});

export const LoginSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(6)
});

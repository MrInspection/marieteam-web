import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({
      message: "Invalid email address",
  }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignUpSchema = z.object({
    name: z.string().min(5, { message: "Full name is required" }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string()
        .min(12, { message: "Password must be at least 12 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one digit" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
});

export type SignInProps = z.infer<typeof SignInSchema>;
export type SignUpProps = z.infer<typeof SignUpSchema>;

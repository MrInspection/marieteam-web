import {z} from "zod";

export const AccountSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character",
  }).max(32, {
    message: "Name must be at most 32 characters",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }).max(50, {
    message: "Email must be at most 50 characters",
  }),
});

export const PasswordSchema = z.object({
  password: z.string()
    .min(12, {message: "Password must be at least 12 characters long"})
    .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
    .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
    .regex(/[0-9]/, {message: "Password must contain at least one digit"})
    .regex(/[^A-Za-z0-9]/, {message: "Password must contain at least one special character"})
})

export type AccountSchemaType = z.infer<typeof AccountSchema>;
export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
import { z } from "zod";

export const AccountSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be at least 1 character",
    }).max(50, {
        message: "Name must be at most 50 characters",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }).max(50, {
        message: "Email must be at most 50 characters",
    }),
});

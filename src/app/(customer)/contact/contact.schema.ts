import {z} from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }).max(500, {
    message: "Content must be at most 500 characters.",
  }),
})

export type ContactSchemaType = z.infer<typeof ContactSchema>;
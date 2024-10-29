"use client"

import {z} from "zod";
import {toast} from "sonner";
import {Loader} from "lucide-react";
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardHeader} from "@/components/ui/card";
import {zodResolver} from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {registerContact} from "@/app/(customer)/contact/contact.action";
import {useRouter} from "next/navigation";

const FormSchema = z.object({
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

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            content: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true);
            registerContact(data.name, data.email, data.subject, data.content)
            toast.success("You have been successfully registered")
            form.reset()
            router.push("/")
        } catch (error) {
            setIsLoading(false);
            toast.error(`${error}`)
        }
    }

    return (
        <Card>
        <CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Your email" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="Subject of your message" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Your message" {...field} maxLength={500} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                        {isLoading && <Loader className="size-4 animate-spin"/> }
                        Send Message
                    </Button>
                </form>
            </Form>
        </CardHeader>
    </Card>
    )
}

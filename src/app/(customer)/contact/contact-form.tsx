"use client"

import {toast} from "sonner";
import {Loader} from "lucide-react";
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
import {ContactSchema, ContactSchemaType} from "@/app/(customer)/contact/contact.schema";
import {useMutation} from "@tanstack/react-query";

export default function ContactForm() {
  const router = useRouter()

  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      content: "",
    },
  })

  const {mutate: SendMessage, isPending: isSendingMessage} = useMutation({
    mutationFn: async (data: ContactSchemaType) => {
      await registerContact(data)
    },
    onSuccess: () => {
      toast.success("Your message has been submitted")
      router.push("/")
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const onSubmit = (data: ContactSchemaType) => SendMessage(data)

  return (
    <Card>
      <CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>

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
                    <Textarea placeholder="Your message" {...field} maxLength={500} className="min-h-36"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4" disabled={isSendingMessage}>
              {isSendingMessage ?
                <div className="inline-flex items-center">
                  <Loader className="mr-2 size-4 animate-spin"/>
                  Sending message...
                </div>
                :
                <p>Send Message</p>
              }
            </Button>
          </form>
        </Form>
      </CardHeader>
    </Card>
  )
}

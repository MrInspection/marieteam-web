"use client"

import {useState} from "react";
import {UpdatePassword} from "@/app/(customer)/settings/account.action";
import {toast} from "sonner";
import {PasswordSchema, PasswordSchemaType} from "@/app/(customer)/settings/account.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";

export function EditPasswordForm({userId}: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  async function onSubmit(data: PasswordSchemaType) {
    setIsLoading(true);
    try {
      await UpdatePassword(userId, data.password);
      toast.success("Your password has been updated successfully");
    } catch (error) {
      toast.error(`${error}`);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="rounded-2xl">
        <CardHeader className="py-5">
          <CardTitle className="text-lg inline-flex items-center gap-2">
            Account Security
            <span className="bg-violet-100 dark:bg-violet-700/20 text-violet-500 text-sm font-medium px-2.5 py-0.5 rounded-xl">
              New
            </span>
            </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6 border-t py-6">
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Update Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="Your password"
                        maxLength={50}
                      />
                    </FormControl>
                    <FormDescription className="pt-1.5">
                      Enter a new password to update your account password if you have forgotten it. If your account doesn&apos;t have a password (0auth), it will create one for you.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button
                type="submit"
                variant="default"
                className="ml-auto"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader className="size-4 animate-spin"/>
                )}
                Save
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  )
}
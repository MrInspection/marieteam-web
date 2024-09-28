"use client";

import { UpdateAccountInformation } from "@/app/(customer)/settings/account.action";
import { AccountSchema } from "@/app/(customer)/settings/account.schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type AccountFormProps = {
  email: string | undefined | null;
  name: string | undefined | null;
  userId: string | undefined;
};

export default function EditAccountForm({
  email,
  name,
  userId,
}: AccountFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
    },
  });

  async function onSubmit({ name, email }: z.infer<typeof AccountSchema>) {
    if (!userId) return;
    setIsLoading(true);
    try {
      await UpdateAccountInformation({ email, name, userId });
    } catch (error) {
      console.error("Failed to update account information:", error);
      toast.error("Failed to update account information");
    } finally {
      setIsLoading(false);
      toast.success("Account information updated successfully");
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Information</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6 border-t py-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          placeholder="Name"
                          maxLength={50}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your full name, or a display name you are
                        comfortable with.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          placeholder="Email"
                          maxLength={50}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button
                type="submit"
                variant="default"
                className="ml-auto"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 className={"mr-2 size-4 animate-spin"} />
                )}
                Save
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}

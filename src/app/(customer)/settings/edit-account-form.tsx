"use client";

import {UpdateAccount} from "@/app/(customer)/settings/account.action";
import {AccountSchema, AccountSchemaType} from "@/app/(customer)/settings/account.schema";
import {Button} from "@/components/ui/button";
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
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {Loader} from "lucide-react";
import {toast} from "sonner";

type AccountFormProps = {
  email: string
  name: string
  userId: string;
};

export default function EditAccountForm({email, name, userId}: AccountFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AccountSchemaType>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: name,
      email: email,
    },
  });

  async function onSubmit(data: AccountSchemaType) {
    setIsLoading(true)
    try {
      await UpdateAccount(userId, data);
      setIsLoading(false)
      toast.success("Your account information has been updated.")
    } catch (error) {
      setIsLoading(false)
      toast.error(`${error}`);
    }
  }

  return (
    <Card className="rounded-2xl">
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
                render={({field}) => (
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
                      comfortable with. Maximum 32 characters.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
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
                    <FormDescription/>
                    <FormMessage/>
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
                <Loader className="size-4 animate-spin"/>
              )}
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

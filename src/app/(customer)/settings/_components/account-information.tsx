"use client"

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {AccountSchema, AccountSchemaType} from "@/app/(customer)/settings/account.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {UpdateAccountInformation} from "@/app/(customer)/settings/account.action";
import {toast} from "sonner";
import {signOut} from "next-auth/react";
import {EditPasswordForm} from "@/app/(customer)/settings/_components/edit-password-form";
import DeleteAccountZone from "@/app/(customer)/settings/_components/delete-account";

type AccountInformationProps = {
  id: string
  name: string | null
  email: string
  image: string | null
}

export function AccountInformation({id, name, email, image}: AccountInformationProps) {
  const form = useForm<AccountSchemaType>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: name!,
      email: email,
    },
  });

  const {mutate: UpdateUserInformation, isPending: isUpdatingUserInformation} = useMutation({
    mutationKey: ["update-user-info"],
    mutationFn: async (data: AccountSchemaType) => {
      await UpdateAccountInformation(id, data)
    },
    onSuccess: () => {
      toast.success("Your account information has been updated.")
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const onSubmit = (data: AccountSchemaType) => UpdateUserInformation(data)

  return (
    <div className="space-y-8">
      <Card className="rounded-2xl">
        <CardHeader className="bg-muted/40 border-b">
          <div className=" flex items-center gap-3">
            <Avatar className="focus:ring-0 size-14">
              <AvatarImage
                src={image ?? ""}
                className="shadow-md border-2 rounded-full"
              />
              <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="font-medium text-base">{name}</p>
                <p className="text-muted-foreground text-xs">
                  {id}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => signOut()}
                className="max-md:hidden"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="my-6 space-y-6 px-8">
          <section>
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="border-2 border-dashed rounded-xl p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <div className="ml-auto">
                      <Button
                        type="submit"
                        variant="default"
                        disabled={isUpdatingUserInformation}
                      >
                        {isUpdatingUserInformation && (
                          <Loader className="size-4 animate-spin"/>
                        )}
                        Save
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </section>
          <EditPasswordForm userId={id}/>
        </CardContent>
      </Card>
      <DeleteAccountZone userId={id} />
    </div>
  )
}
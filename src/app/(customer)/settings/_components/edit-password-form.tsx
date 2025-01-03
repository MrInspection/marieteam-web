"use client"

import {useState} from "react";
import {UpdateUserPassword} from "@/app/(customer)/settings/account.action";
import {toast} from "sonner";
import {PasswordSchema, PasswordSchemaType} from "@/app/(customer)/settings/account.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {EyeIcon, EyeOffIcon, Loader} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function EditPasswordForm({userId}: { userId: string }) {
  const [showPassword, setShowPassword] = useState(false)
  const queryClient = useQueryClient();

  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const {mutate: UpdatePassword, isPending: isUpdatingUserPassword} = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (data: PasswordSchemaType) => {
      await UpdateUserPassword(userId, data.password)
    },
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({queryKey: ["update-password"]})
      toast.success("Your password has been updated.")
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const onSubmit = (data: PasswordSchemaType) => UpdatePassword(data)

  return (
    <section>
      <h2 className="text-lg font-medium mb-4">Account Security</h2>
      <div className="border-2 border-dashed rounded-xl p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Update Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="Your password" {...field} />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-none h-8 w-8 px-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeIcon className="size-4"/> : <EyeOffIcon className="size-4"/>}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription className="pt-1.5">
                      Enter a new password to update your account password if you have forgotten it. If your account
                      doesn&apos;t have a password (0auth), it will create one for you.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className="ml-auto">
                <Button
                  type="submit"
                  variant="default"
                  disabled={isUpdatingUserPassword}
                >
                  {isUpdatingUserPassword && (
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
  )
}
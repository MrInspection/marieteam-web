"use client"

import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {DeleteAccount} from "@/app/(customer)/settings/account.action";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";

export default function DeleteAccountZone({userId}: { userId: string }) {

  const {mutate: onDeleteAccount, isPending: isDeleting} = useMutation({
    mutationKey: ["delete-account"],
    mutationFn: async (userId: string) => {
      await DeleteAccount(userId);
      toast.success("We have deleted your account");
    },
  })

  return (
    <Card className="border-destructive rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Delete Account</CardTitle>
        <CardDescription className="pt-1.5">
          Permanently remove your Personal Account and all of its contents
          from Spectron Labs platform. This action is not reversible, so
          please continue with caution.
        </CardDescription>
      </CardHeader>
      <CardFooter
        className="border-t px-6 py-4 bg-destructive/10 border-destructive">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="ml-auto">
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={isDeleting} onClick={() => onDeleteAccount(userId)}>
                {isDeleting && <Loader2 className="mr-2 size-4 animate-spin"/>}
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

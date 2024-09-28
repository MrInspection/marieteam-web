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
import {useState} from "react";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {DeleteAccount} from "@/app/(customer)/settings/account.action";

type DeleteAccountDialogProps = {
    userId: string | undefined;
};

export default function DeleteAccountZone({userId}: DeleteAccountDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        if (!userId) return;
        setIsDeleting(true);
        try {
            await DeleteAccount({userId: userId});
            toast.success("Your account has been deleted successfully");
        } catch (error) {
            console.error('Failed to delete account:', error);
            toast.error("Unable to delete your account.");
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className={"text-lg"}>Delete Account</CardTitle>
                    <CardDescription className={"pt-1.5"}>
                        Permanently remove your Personal Account and all of its contents
                        from Spectron Labs platform. This action is not reversible, so
                        please continue with caution.
                    </CardDescription>
                </CardHeader>
                <CardFooter
                    className={
                        "border-t px-6 py-4 bg-destructive/10 border-destructive"
                    }
                >
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className={"ml-auto"}>
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
                                <AlertDialogAction disabled={isDeleting} onClick={handleDeleteAccount}>
                                    {isDeleting && <Loader2 className={"mr-2 size-4 animate-spin"}/>}
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </>
    )
}

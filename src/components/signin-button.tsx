"use client";

import {Button} from "@/components/ui/button";
import {signIn, signOut} from "next-auth/react";
import {LogOut} from "lucide-react";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

export const SignInButton = () => {
  return (
    <Button variant={"ghost"} size={"default"} onClick={() => signIn()}>
      Sign In
    </Button>
  )
}

export const SignOutButton = () => {
  return (
    <>
      <DropdownMenuItem onClick={() => signOut()}>
        <LogOut className="size-4 mr-2"/> Logout
      </DropdownMenuItem>
    </>
  )
}

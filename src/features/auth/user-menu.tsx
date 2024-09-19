import { auth } from "@/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Bug, Settings, ShoppingCart, UserCog} from "lucide-react";
import { SignOutButton } from "@/features/auth/signin-button";
import {prisma} from "@/lib/db";
import Link from "next/link";

export default async function UserMenu() {
  const session = await auth();
  const user = session?.user;

  const isAdmin = await prisma.user.findUnique({
    where: {
      id: user?.id,
      role: "ADMIN"
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className={"focus:ring-0"}>
            <AvatarImage src={user?.image?.toString()} className={"shadow-md border-2 rounded-full"}/>
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem className={"flex items-center gap-2"}>
            <Settings className={"size-4"}/>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className={"flex items-center gap-2"}>
            <ShoppingCart className={"size-4"}/>
            Orders
          </DropdownMenuItem>
          <DropdownMenuItem className={"flex items-center gap-2"}>
            <Bug className={"size-4"}/>
            Get Help
          </DropdownMenuItem>
          {isAdmin && <>
            <DropdownMenuSeparator/>
            <Link href={"/dashboard"}>
              <DropdownMenuItem className={"flex items-center gap-2"}>
                <UserCog className={"size-4"}/> Admin
              </DropdownMenuItem>
            </Link>
          </>}
          <DropdownMenuSeparator/>
          <SignOutButton/>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

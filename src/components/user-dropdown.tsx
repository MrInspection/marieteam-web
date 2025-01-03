import {auth} from "@/auth/auth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {HeartHandshake, Settings, ShoppingCart, UserCog} from "lucide-react";
import {prisma} from "@/lib/db";
import Link from "next/link";
import {SignInButton, SignOutButton} from "@/components/signin-button";
import {ModeToggle} from "@/components/theme-toggle";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {redirect} from "next/navigation";

export default async function UserDropdown() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return redirect("/sign-in")
  }

  const isAdmin = await prisma.user.findUnique({
    where: {
      id: user?.id,
      role: "ADMIN"
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="focus:ring-0">
          <AvatarImage src={user?.image?.toString()} className="shadow-md border-2 rounded-full"/>
          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg w-52">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={user.image!} alt={user.name!}/>
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <Link href="/settings">
          <DropdownMenuItem>
            <Settings className="size-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
        <ModeToggle/>
        <Link href="/orders">
          <DropdownMenuItem>
            <ShoppingCart className="size-4 mr-2" />
            Orders
          </DropdownMenuItem>
        </Link>
        <Link href="/contact">
          <DropdownMenuItem>
            <HeartHandshake className="size-4 mr-2" />
            Support
          </DropdownMenuItem>
        </Link>
        {isAdmin && <>
          <DropdownMenuSeparator/>
          <Link href={"/admin"}>
            <DropdownMenuItem>
              <UserCog className={"size-4 mr-2"}/> Admin
            </DropdownMenuItem>
          </Link>
        </>}
        <DropdownMenuSeparator/>
        <SignOutButton/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export async function UserMenu() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex items-center gap-2">
      {user ? <UserDropdown/> :
        <>
          <SignInButton/>
          <Link href="/bookings" className={cn(buttonVariants({variant: "outline"}))}>
            Get started
          </Link>
        </>
      }
    </div>
  )
}

import {auth} from "@/auth/auth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import EditAccountForm from "@/app/(customer)/settings/edit-account-form";
import DeleteAccountZone from "@/app/(customer)/settings/delete-account";
import {prisma} from "@/lib/db";
import {EditPasswordForm} from "@/app/(customer)/settings/edit-password-form";
import {redirect} from "next/navigation";

export const metadata = {
  title: "Settings - MarieTeam",
  description: "Manage your account settings",
};

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) return redirect("/sign-in");

  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  if (!userData) return redirect("/sign-in");

  return (
    <div className="bg-muted/50 dark:bg-black">
      <section className="container max-w-7xl py-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
      </section>
      <section className="border-t-2">
        <div className="container max-w-3xl py-16 space-y-8">
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="py-2 flex items-center gap-3">
                <Avatar className="focus:ring-0 size-16">
                  <AvatarImage
                    src={user?.image?.toString()}
                    className="shadow-md border-2 rounded-full"
                  />
                  <AvatarFallback>{userData.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-lg">{userData.name}</p>
                  <p className="text-muted-foreground text-sm">
                    User ID: {user.id}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="border-t px-6 py-4 bg-muted/40">
              <p className="text-sm text-muted-foreground">
                Click on the avatar to upload a custom one from your files. (Unavailable)
              </p>
            </CardFooter>
          </Card>
          <EditAccountForm email={userData.email!} name={userData.name!} userId={user.id}/>
          <EditPasswordForm userId={user.id}/>
          <DeleteAccountZone userId={user.id}/>
        </div>
      </section>
    </div>
  );
}

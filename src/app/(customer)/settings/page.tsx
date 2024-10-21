import { auth } from "@/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import EditAccountForm from "@/app/(customer)/settings/edit-account-form";
import DeleteAccountZone from "@/app/(customer)/settings/delete-account";

export const metadata = {
  title: "Settings - MarieTeam",
  description: "Manage your account settings",
};

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return <div>You are not logged in</div>;
  }

  return (
    <>
      <section className={"container max-w-7xl py-8"}>
        <h1 className={"text-3xl font-bold"}>Account Settings</h1>
      </section>
      <section className={"bg-muted/50 dark:bg-black border-t-2"}>
        <div className={"container max-w-2xl py-16 space-y-10"}>
          <Card>
            <CardHeader>
              <div className={"py-2 flex items-center gap-3"}>
                <Avatar className={"focus:ring-0 size-16"}>
                  <AvatarImage
                    src={user?.image?.toString()}
                    className={"shadow-md border-2 rounded-full"}
                  />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className={"font-medium text-lg"}>{user?.name}</p>
                  <p className={"text-muted-foreground text-sm"}>
                    User ID: {user?.id}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardFooter className={"border-t px-6 py-4 bg-muted/40"}>
              <p className={"text-sm text-muted-foreground"}>
                Click on the avatar to upload a custom one from your files.
              </p>
            </CardFooter>
          </Card>
          <EditAccountForm email={user?.email} name={user?.name} userId={user.id} />
          <DeleteAccountZone userId={user.id}/>
        </div>
      </section>
    </>
  );
}

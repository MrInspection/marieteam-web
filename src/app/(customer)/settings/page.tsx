import {auth} from "@/auth/auth";
import {prisma} from "@/lib/db";
import {redirect} from "next/navigation";
import {AccountInformation} from "@/app/(customer)/settings/_components/account-information";

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
      id: true,
      name: true,
      email: true,
      image: true,
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
          <AccountInformation {...userData} />
        </div>
      </section>
    </div>
  );
}

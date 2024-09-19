import {auth} from "@/auth/auth";
import {prisma} from "@/lib/db";
import {DatabaseZap} from "lucide-react";

export default async function Home() {
  const session = await auth();
  const profile = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    select: {
      role: true, orders: true,
    },
  });
  return (
      <>
          <div className="container flex flex-col items-center justify-center my-60 space-y-10">
              <section className={"rounded-xl border-2 p-6 w-fit"}>
                  <DatabaseZap className={"size-5 text-blue-500"}/>
                  <h1 className={"mt-3 font-medium"}>Database Queries (Experiment)</h1>
                  <p className={"text-muted-foreground text-sm mt-0.5"}>This is a sample of queries to test if
                      everything is working properly.</p>
                  <div className={"border-2 border-dashed rounded-xl mt-4 p-4 bg-blue-50/40"}>
                      <p>Username : {session?.user?.name}</p>
                      <p>Email : {session?.user?.email}</p>
                      <p>Current Role : {profile?.role}</p>
                      <p>Orders : {profile?.orders?.length} verified orders</p>
                  </div>
              </section>
              <section className={"rounded-xl border-2 p-6 w-fit"}>
                  <DatabaseZap className={"size-5 text-blue-500"}/>
                  <h1 className={"mt-3 font-medium"}>Database Queries (Experiment)</h1>
                  <p className={"text-muted-foreground text-sm mt-0.5"}>This is a sample of queries to test if
                      everything is working properly.</p>
                  <div className={"border-2 border-dashed rounded-xl mt-4 p-4 bg-blue-50/40"}>
                      <p>Username : {session?.user?.name}</p>
                      <p>Email : {session?.user?.email}</p>
                      <p>Current Role : {profile?.role}</p>
                      <p>Orders : {profile?.orders?.length} verified orders</p>
                  </div>
              </section>
          </div>
      </>
  );
}

import type {Metadata} from "next";
import {OrdersTable} from "@/app/(customer)/orders/orders-table";
import {getRequiredUser} from "@/lib/auth-session";

export const metadata: Metadata = {
  title: "My Orders - MarieTeam",
};

export default async function OrdersPage() {
  const user = await getRequiredUser()

  return (
    <>
      <main className="bg-muted/40 dark:bg-black flex flex-col flex-grow">
        <section className="border-b">
          <div className="container max-w-7xl py-10">
            <h1 className="text-3xl font-medium tracking-tight">My Orders</h1>
            <p className="text-sm/7 text-muted-foreground mt-1">View the transaction history of and details of your
              orders.</p>
          </div>
        </section>
        <section className="container max-w-7xl py-10">
          <OrdersTable userId={user.id as string}/>
        </section>
      </main>
    </>
  )
}

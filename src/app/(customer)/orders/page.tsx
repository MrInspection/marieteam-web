import {auth} from "@/auth/auth";
import NotFound from "@/app/not-found";

export default async function OrdersPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NotFound()
    }
  return (
    <>
        <div className={"container max-w-7xl py-8"}>
            <h1 className={"text-3xl font-bold"}>My Orders</h1>
        </div>
    </>
  );
}

import {auth} from "@/auth/auth";
import {prisma} from "@/lib/db";

export default async function AdminPage() {

    const session = await auth();
    const user = session?.user;

    if (!user) {
        return <div>You are not authorized to access this page.</div>
    }

    const isAdmin = await prisma.user.findUnique({
        where: {
            id: user.id,
            role: "ADMIN"
        },
    });

    return (
        <>
            <section className={"container max-w-7xl py-8"}>
                <h1 className={"text-3xl font-bold"}>MarieTeam Dashboard</h1>
            </section>
            <section className={"bg-muted/40 dark:bg-black border-t-2"}>
            </section>

        </>
    )
}

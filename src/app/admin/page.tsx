import {auth} from "@/auth/auth";
import NotFound from "@/app/not-found";
import AdminDashboard from "@/app/admin/dashboard";
import {prisma} from "@/lib/db";

export default async function AdminPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return NotFound();
  }

  const isAdmin = await prisma.user.findUnique({
    where: {
      id: user.id,
      role: "ADMIN",
    },
  });

  if (!isAdmin) {
    return NotFound();
  }

  return <AdminDashboard/>
}

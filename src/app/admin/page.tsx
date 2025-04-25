import NotFound from "@/app/not-found";
import AdminDashboard from "@/app/admin/dashboard";
import {prisma} from "@/lib/db";
import {getUser} from "@/lib/auth-session";

export default async function AdminPage() {
  const user = await getUser()

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

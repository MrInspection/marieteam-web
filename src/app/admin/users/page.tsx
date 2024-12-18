import {prisma} from "@/lib/db";
import {Users} from "@/app/admin/users/users";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          reservations: true
        }
      }
    }
  })

  return <Users users={users}/>
}

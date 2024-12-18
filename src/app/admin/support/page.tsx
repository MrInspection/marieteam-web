import {prisma} from "@/lib/db";
import {ContactList} from "@/app/admin/support/support";

export default async function Support() {
  const contacts = await prisma.contact.findMany()
  return (
    <main>
      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Help & Support</h1>
      <p className="max-md:text-sm/8 mb-8 mt-2 text-muted-foreground">Manage everything related to the MarieTeam to make it work.</p>
      <ContactList contacts={contacts}/>
    </main>
  )
}
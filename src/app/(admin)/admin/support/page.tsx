import {prisma} from "@/lib/db";
import {ContactList} from "@/app/(admin)/admin/support/support";

export default async function Support() {
  const contacts = await prisma.contact.findMany()

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-bold">MarieTeam Support</h1>
      <p className="max-md:text-sm mb-8 mt-1.5">Manage everything related to the MarieTeam to make it work.</p>
      <ContactList contacts={contacts}/>
    </>
  )
}
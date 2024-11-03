'use server'

import {prisma} from '@/lib/db'
import {ContactSchemaType} from "@/app/(customer)/contact/contact.schema";

export async function registerContact(contact: ContactSchemaType) {
  try {
    await prisma.contact.create({
      data: {
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.content,
      },
    })
  } catch (error) {
    throw new Error("Failed to register contact");
  }
}

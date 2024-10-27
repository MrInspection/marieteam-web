'use server'

import { prisma } from '@/lib/db'

export async function registerContact(name: string, email: string, subject: string, message: string) {
    try {
        await prisma.contact.create({
            data: {
                name: name,
                email: email,
                subject: subject,
                message: message,
            },
        })
    } catch (error) {
        throw new Error("Failed to register contact");
    }
}

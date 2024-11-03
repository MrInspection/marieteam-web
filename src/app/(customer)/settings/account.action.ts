"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import {AccountSchemaType} from "@/app/(customer)/settings/account.schema";
import {signOut} from "@/auth/auth";
import {revalidatePath} from "next/cache";

export async function UpdateAccount(userId: string, data: AccountSchemaType) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        email: data.email,
      },
    })
  } catch (error) {
    throw new Error(`Error updating account: ${error}`);
  } finally {
    revalidatePath('/settings');
  }
}

export async function DeleteAccount({ userId }: { userId: string }) {
  try {
    // Step 1: Delete all seats associated with the user's reservations
    await prisma.seat.deleteMany({
      where: {
        reservation: {
          userId: userId,
        },
      },
    });

    // Step 2: Delete billing addresses associated with the user's reservations
    await prisma.billingAddress.deleteMany({
      where: {
        reservations: {
          some: {
            userId: userId,
          },
        },
      },
    });

    // Step 3: Delete reservations for the user
    await prisma.reservation.deleteMany({
      where: {
        userId: userId,
      },
    });

    // Step 4: Delete accounts associated with the user
    await prisma.account.deleteMany({
      where: { userId: userId },
    });

    // Step 4: Finally, delete the user
    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    throw new Error(`Error deleting user account: ${error}`);
  } finally {
    await signOut({redirect: false});
    await prisma.$disconnect();
    redirect("/");
  }
}

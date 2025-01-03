"use server";

import {prisma} from "@/lib/db";
import {redirect} from "next/navigation";
import {AccountSchemaType} from "@/app/(customer)/settings/account.schema";
import {auth, signOut} from "@/auth/auth";
import bcrypt from "bcryptjs";

export async function UpdateUserPassword(userId: string, password: string) {
  const session = await auth()
  if (!session || !(session.user?.id === userId)) {
    throw new Error("Unauthorized, required a connected user")
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    })
  } catch (error) {
    throw new Error(`Error updating password: ${error}`);
  }
}

export async function UpdateAccountInformation(userId: string, data: AccountSchemaType) {
  const session = await auth()
  if (!session || !(session.user?.id === userId)) {
    throw new Error("Unauthorized action")
  }

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
  }
}

export async function DeleteAccount(userId: string) {
  const session = await auth()
  if (!session || !(session.user?.id === userId)) {
    throw new Error("Unauthorized action")
  }

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
      where: {userId: userId},
    });

    // Step 4: Finally, delete the user
    await prisma.user.delete({
      where: {id: userId},
    });
  } catch (error) {
    throw new Error(`Error deleting user account: ${error}`);
  } finally {
    await signOut({redirect: false});
    await prisma.$disconnect();
    redirect("/");
  }
}

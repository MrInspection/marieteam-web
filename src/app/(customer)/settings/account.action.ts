"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

type AccountInformationProps = {
  name: string;
  email: string;
  userId: string;
};

export async function UpdateAccountInformation({
                                                 name,
                                                 email,
                                                 userId,
                                               }: AccountInformationProps) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
    },
  });
  console.log("REQUEST! Updated information for USER :", userId);
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

    // Step 2: Delete reservations for the user
    await prisma.reservation.deleteMany({
      where: {
        userId: userId,
      },
    });

    // Step 3: Delete accounts associated with the user
    await prisma.account.deleteMany({
      where: { userId: userId },
    });

    // Step 4: Finally, delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    console.log(`User with ID ${userId} and all related data have been deleted manually.`);
  } catch (error) {
    console.error("Error deleting user account:", error);
  } finally {
    await prisma.$disconnect();
    redirect("/");
  }
}

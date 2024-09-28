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
    await prisma.reservationItem.deleteMany({
      where: {
        reservation: {
          order: {
            userId: userId,
          },
        },
      },
    });

    await prisma.reservation.deleteMany({
      where: {
        order: {
          userId: userId,
        },
      },
    });

    await prisma.order.deleteMany({
      where: { userId: userId },
    });

    await prisma.account.deleteMany({
      where: { userId: userId },
    });

    await prisma.session.deleteMany({
      where: { userId: userId },
    });

    await prisma.user.delete({
      where: { id: userId },
    });
    console.log(
      `User with ID ${userId} and all related data have been deleted manually.`
    );
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
    redirect("/");
  }
}

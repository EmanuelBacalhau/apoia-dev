import { prisma } from "@/lib/prisma";

export async function getDonations(userId: string) {
  if (!userId) {
    return {
      success: false,
      error: "Usuário não encontrado",
    };
  }

  try {
    const donations = await prisma.donation.findMany({
      where: {
        userId: userId,
        status: "PAID",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        amountInCents: true,
        status: true,
        createdAt: true,
        donorName: true,
        donorMessage: true,
      },
    });

    return {
      success: true,
      error: null,
      data: donations,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao obter doações",
    };
  }
}

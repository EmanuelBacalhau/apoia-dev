import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function getStatsCreator(userId: string, stripeAccountId: string) {
  if (!userId) {
    return {
      success: false,
      error: "Usuário não encontrado",
    };
  }

  try {
    const totalDonations = await prisma.donation.count({
      where: {
        userId: userId,
        status: "PAID",
      },
    });

    const totalAmountDonated = await prisma.donation.aggregate({
      _sum: {
        amountInCents: true,
      },
      where: {
        userId: userId,
        status: "PAID",
      },
    });

    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountId,
    });

    return {
      success: true,
      error: null,
      data: {
        totalDonations,
        totalAmountDonated: totalAmountDonated._sum.amountInCents || 0,
        balance: balance?.pending[0]?.amount || 0,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao obter estatísticas do criador",
    };
  }
}

"use server";

import { stripe } from "@/lib/stripe";

export async function getStripeDashboard(accountId: string | null) {
  if (!accountId) {
    return {
      success: false,
      error: "Id do criador não encontrado",
    };
  }

  try {
    const dashboardAccountLink = await stripe.accounts.createLoginLink(
      accountId
    );

    return {
      success: true,
      error: null,
      url: dashboardAccountLink.url,
    };
  } catch (error) {
    console.error("Erro ao criar link de conta:", error);
    return {
      success: false,
      error: "Erro ao criar link de conta",
    };
  }
}

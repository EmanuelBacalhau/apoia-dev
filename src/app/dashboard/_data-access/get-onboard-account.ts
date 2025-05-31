"use server";

import { stripe } from "@/lib/stripe";

export async function getOnboardAccount(accountId: string | null) {
  if (!accountId) {
    return {
      success: false,
      error: "Id do criador não encontrado",
    };
  }

  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
      return_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
      type: "account_onboarding",
    });

    return {
      success: true,
      error: null,
      url: accountLink.url,
    };
  } catch (error) {
    console.error("Erro ao criar link de conta:", error);
    return {
      success: false,
      error: "Erro ao criar link de conta",
    };
  }
}

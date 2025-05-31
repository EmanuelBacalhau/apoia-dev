"use server";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { create } from "lodash";
import { z } from "zod";

const createPaymentSchema = z.object({
  slug: z.string({
    message: "Slug é obrigatório",
  }),
  name: z.string({
    message: "Nome é obrigatório",
  }),
  message: z.string({
    message: "Mensagem é obrigatória",
  }),
  price: z.coerce.number().min(1500, {
    message: "Valor deve ser pelo menos R$ 15",
  }),
  creatorId: z.string({
    message: "ID do criador é obrigatório",
  }),
});

type CreatePaymentSchema = z.infer<typeof createPaymentSchema>;

export async function createPayment(data: CreatePaymentSchema) {
  const schema = createPaymentSchema.safeParse(data);

  if (!schema.success) {
    return {
      success: false,
      error: schema.error.errors[0].message,
    };
  }

  try {
    const creator = await prisma.user.findFirst({
      where: {
        connectedStripeAccountId: data.creatorId,
      },
    });

    if (!creator) {
      return {
        success: false,
        error: "Criador não encontrado",
      };
    }

    const applicationFeeAmount = Math.floor(data.price * 0.1); // 10% de taxa

    const donate = await prisma.donation.create({
      data: {
        donorName: data.name,
        donorMessage: data.message,
        userId: creator.id,
        status: "PENDING",
        amountInCents: data.price - applicationFeeAmount,
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.HOST_URL}/creator/${data.slug}`,
      cancel_url: `${process.env.HOST_URL}/creator/${data.slug}`,
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `Apoiar ${creator.name}`,
              description: data.message,
            },
            unit_amount: data.price,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: applicationFeeAmount,
        transfer_data: {
          destination: creator.connectedStripeAccountId!,
        },
        metadata: {
          donorName: data.name,
          donorMessage: data.message,
          donationId: donate.id.toString(),
        },
      },
    });

    return {
      success: true,
      error: null,
      session: JSON.stringify(session),
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao criar pagamento",
    };
  }
}

"use server";

import { prisma } from "@/lib/prisma";
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
    const creator = await prisma.user.findUnique({
      where: { id: schema.data.creatorId },
    });
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao criar pagamento",
    };
  }
}

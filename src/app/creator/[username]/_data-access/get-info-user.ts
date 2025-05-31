"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createUserNameSchema = z.object({
  username: z.string({
    message: "Username é obrigatório",
  }),
});

type CreateUserNameSchema = z.infer<typeof createUserNameSchema>;

export async function getInfoUser(data: CreateUserNameSchema) {
  const schema = createUserNameSchema.safeParse(data);

  if (!schema.success) {
    return {
      success: false,
      error: schema.error.errors[0].message,
    };
  }

  const { username } = schema.data;

  try {
    const response = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true,
        connectedStripeAccountId: true,
      },
    });

    if (!response) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    return {
      success: true,
      error: null,
      user: {
        id: response.id,
        username: response.username,
        bio: response.bio,
        image: response.image,
        name: response.name,
        connectedStripeAccountId: response.connectedStripeAccountId,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao buscar informações do usuário",
    };
  }
}

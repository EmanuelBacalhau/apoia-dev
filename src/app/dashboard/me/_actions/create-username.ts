"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const usernameSchema = z
  .object({
    username: z
      .string()
      .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
      .max(20, "O nome de usuário deve ter no máximo 20 caracteres")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "O nome de usuário só pode conter letras, números e underscores"
      ),
  })
  .transform((data) => ({
    username: data.username.toLowerCase(),
  }));

type UsernameSchema = z.infer<typeof usernameSchema>;

export async function createUsername(data: UsernameSchema) {
  const session = await auth();

  if (!session) {
    return {
      success: false,
      error: "Você precisa estar logado para criar um nome de usuário.",
    };
  }

  const schema = usernameSchema.safeParse(data);

  if (!schema.success) {
    return {
      success: false,
      error: schema.error.errors[0].message,
    };
  }

  const { username } = schema.data;

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return {
      success: false,
      error: "Este nome de usuário já está em uso. Por favor, escolha outro.",
    };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username },
  });

  return {
    success: true,
    error: null,
    username,
  };
}

"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const changeNameSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
});

type ChangeNameSchema = z.infer<typeof changeNameSchema>;

export async function changeName(data: ChangeNameSchema) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      error: "Usuário não autenticado",
    };
  }

  const schema = changeNameSchema.safeParse(data);

  if (!schema.success) {
    return {
      success: false,
      error: schema.error.errors[0].message,
    };
  }

  const { name } = schema.data;

  await prisma.user.update({
    where: { id: userId },
    data: { name },
  });

  return {
    success: true,
    error: null,
    name,
  };
}

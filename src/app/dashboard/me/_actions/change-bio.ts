"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const changeBioSchema = z.object({
  bio: z
    .string()
    .min(3, "A bio deve ter pelo menos 3 caracteres")
    .max(50, "A bio deve ter no máximo 50 caracteres"),
});

type ChangeBioSchema = z.infer<typeof changeBioSchema>;

export async function changeBio(data: ChangeBioSchema) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      error: "Usuário não autenticado",
    };
  }

  const schema = changeBioSchema.safeParse(data);

  if (!schema.success) {
    return {
      success: false,
      error: schema.error.errors[0].message,
    };
  }

  const { bio } = schema.data;

  await prisma.user.update({
    where: { id: userId },
    data: { bio },
  });

  return {
    success: true,
    error: null,
    bio,
  };
}

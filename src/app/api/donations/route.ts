import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json(
      { error: "Usuário não autorizado", success: false },
      { status: 401 }
    );
  }

  try {
    const donations = await prisma.donation.findMany({
      where: { userId: request.auth.user.id, status: "PAID" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { data: donations, success: true, error: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch donations", success: false },
      { status: 400 }
    );
  }
});

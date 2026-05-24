import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {

  const { id } = await params;

  const updated =
    await prisma.reservation.update({
      where: { id },
      data: {
        status: "CONFIRMED"
      }
    });

  return Response.json(updated);
}
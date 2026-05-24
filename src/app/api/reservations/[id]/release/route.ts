import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    const result =
      await prisma.$transaction(
        async (tx) => {

          const reservation =
            await tx.reservation.findUnique({
              where: {
                id: id
              }
            });

          if (!reservation) {

            return Response.json(
              { error: "Reservation not found" },
              { status: 404 }
            );
          }

          // Already released
          if (
            reservation.status === "released"
          ) {

            return Response.json(
              { error: "Already released" },
              { status: 400 }
            );
          }

          // Reduce reserved quantity
          await tx.inventory.update({
            where: {
              id: reservation.inventoryId
            },
            data: {
              reservedQuantity: {
                decrement: reservation.quantity
              }
            }
          });

          // Update reservation
          const updatedReservation =
            await tx.reservation.update({
              where: {
                id: id
              },
              data: {
                status: "released"
              }
            });

          return Response.json(
            updatedReservation
          );
        }
      );

    return result;

  } catch (error) {

    console.log(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


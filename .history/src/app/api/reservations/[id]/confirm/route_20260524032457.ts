import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {

  try {

    const reservationId = params.id;

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: reservationId
        }
      });

    if (!reservation) {

      return Response.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    // Check expiry
    if (
      reservation.expiresAt <
      new Date()
    ) {

      return Response.json(
        { error: "Reservation expired" },
        { status: 410 }
      );
    }

    // Update reservation
    const updatedReservation =
      await prisma.reservation.update({
        where: {
          id: reservationId
        },
        data: {
          status: "confirmed"
        }
      });

    return Response.json(
      updatedReservation
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
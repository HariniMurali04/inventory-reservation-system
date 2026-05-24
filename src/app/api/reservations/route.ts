import { prisma } from "@/lib/prisma";

export async function GET() {

  const reservations =
    await prisma.reservation.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

  return Response.json(
    reservations
  );
}

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      inventoryId,
      quantity
    } = body;

    const result = await prisma.$transaction(
      async (tx) => {

        // Find inventory
        const inventory = await tx.inventory.findUnique({
          where: {
            id: inventoryId
          }
        });

        if (!inventory) {
          return Response.json(
            { error: "Inventory not found" },
            { status: 404 }
          );
        }

        const availableQuantity =
          inventory.totalQuantity -
          inventory.reservedQuantity;

        // Not enough stock
        if (availableQuantity < quantity) {

          return Response.json(
            { error: "Not enough stock" },
            { status: 409 }
          );
        }

        // Increase reserved quantity
        await tx.inventory.update({
          where: {
            id: inventoryId
          },
          data: {
            reservedQuantity: {
              increment: quantity
            }
          }
        });

        // Create reservation
        const reservation =
          await tx.reservation.create({
            data: {
              inventoryId,
              quantity,
              status: "pending",

              expiresAt: new Date(
                Date.now() + 10 * 60 * 1000
              )
            }
          });

        return Response.json(reservation);
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
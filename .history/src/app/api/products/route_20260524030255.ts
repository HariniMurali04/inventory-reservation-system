import { prisma } from "@/lib/prisma";

export async function GET() {

  const inventories = await prisma.inventory.findMany({
    include: {
      product: true,
      warehouse: true
    }
  });

  const formattedData = inventories.map((item) => ({
    inventoryId: item.id,

    product: item.product.name,

    warehouse: item.warehouse.name,

    totalQuantity: item.totalQuantity,

    reservedQuantity: item.reservedQuantity,

    availableQuantity:
      item.totalQuantity - item.reservedQuantity
  }));

  return Response.json(formattedData);
}
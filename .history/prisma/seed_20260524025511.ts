import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // Create products
  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 15"
    }
  });

  const laptop = await prisma.product.create({
    data: {
      name: "MacBook Pro"
    }
  });

  // Create warehouses
  const chennai = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse"
    }
  });

  const bangalore = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse"
    }
  });

  // Create inventory
  await prisma.inventory.createMany({
    data: [
      {
        productId: iphone.id,
        warehouseId: chennai.id,
        totalQuantity: 10,
        reservedQuantity: 0
      },
      {
        productId: iphone.id,
        warehouseId: bangalore.id,
        totalQuantity: 5,
        reservedQuantity: 0
      },
      {
        productId: laptop.id,
        warehouseId: chennai.id,
        totalQuantity: 3,
        reservedQuantity: 0
      }
    ]
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
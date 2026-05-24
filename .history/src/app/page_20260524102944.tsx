"use client";

import { useEffect, useState } from "react";

type Product = {
  inventoryId: string;
  product: string;
  warehouse: string;
  totalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
};

export default function HomePage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchProducts() {

    const response =
      await fetch("/api/products");

    const data =
      await response.json();

    setProducts(data);

    setLoading(false);
  }

  async function reserveProduct(
    inventoryId: string
  ) {

    const response =
      await fetch("/api/reservations", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          inventoryId,
          quantity: 1
        })
      });

    if (response.status === 409) {

      alert("Not enough stock");

      return;
    }

    const data =
      await response.json();

    window.location.href =
  `/reservation/${data.id}`;

fetchProducts();
  }

  useEffect(() => {

    fetchProducts();

  }, []);

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Inventory System
      </h1>

      <div className="space-y-4">

        {products.map((item) => (

          <div
            key={item.inventoryId}
            className="
  bg-gray-900
  border
  border-gray-700
  rounded-2xl
  p-6
  shadow-xl
  hover:scale-105
  transition
  duration-300
"
          >

            <h2 className="text-xl font-semibold">
              {item.product}
            </h2>

            <p>
              Warehouse:
              {" "}
              {item.warehouse}
            </p>

            <p>
              Available Stock:
              {" "}
              {item.availableQuantity}
            </p>

            <button
              onClick={() =>
                reserveProduct(
                  item.inventoryId
                )
              }
              className="mt-3 bg-black text-white px-4 py-2 rounded"
            >
              Reserve
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}
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

      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        text-3xl
        font-bold
      ">

        Loading...

      </div>
    );
  }

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      p-10
    ">

      <h1 className="
        text-5xl
        font-bold
        text-center
        mb-12
      ">
        Inventory System
      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

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

            <h2 className="
              text-2xl
              font-semibold
              mb-4
            ">
              {item.product}
            </h2>

            <p className="mb-2">
              <span className="font-semibold">
                Warehouse:
              </span>
              {" "}
              {item.warehouse}
            </p>

            <p className="mb-5">
              <span className="font-semibold">
                Available Stock:
              </span>
              {" "}
              {item.availableQuantity}
            </p>

            <button
              onClick={() =>
                reserveProduct(
                  item.inventoryId
                )
              }
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-4
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Reserve
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}
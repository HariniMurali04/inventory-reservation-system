"use client";

import {
  use,
  useEffect,
  useState
} from "react";

type Reservation = {
  id: string;
  status: string;
  expiresAt: string;
};

export default function ReservationPage({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = use(params);

  const [reservation, setReservation] =
    useState<Reservation | null>(null);

  const [timeLeft, setTimeLeft] =
    useState("");

  async function fetchReservation() {

    const response =
      await fetch("/api/reservations");

    const data =
      await response.json();

    const foundReservation =
      data.find(
        (item: Reservation) =>
          item.id === id
      );

    setReservation(foundReservation);
  }

  async function confirmPurchase() {

    if (!reservation) return;

    const response =
      await fetch(
        `/api/reservations/${reservation.id}/confirm`,
        {
          method: "POST"
        }
      );

    if (response.ok) {

      alert("Purchase confirmed");

      fetchReservation();
    }
  }

  async function cancelReservation() {

    if (!reservation) return;

    const response =
      await fetch(
        `/api/reservations/${reservation.id}/release`,
        {
          method: "POST"
        }
      );

    if (response.ok) {

      alert("Reservation cancelled");

      fetchReservation();
    }
  }

  useEffect(() => {

    fetchReservation();

  }, []);

  useEffect(() => {

    if (!reservation) return;

    const interval =
      setInterval(() => {

        const expiry =
          new Date(
            reservation.expiresAt
          ).getTime();

        const now =
          new Date().getTime();

        const difference =
          expiry - now;

        if (difference <= 0) {

          setTimeLeft("Expired");

          setReservation(null);

          clearInterval(interval);

          return;
        }

        const minutes =
          Math.floor(
            difference / 1000 / 60
          );

        const seconds =
          Math.floor(
            (difference / 1000) % 60
          );

        setTimeLeft(
          `${minutes}m ${seconds}s`
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, [reservation]);

  if (!reservation) {

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

        Reservation Expired

      </div>
    );
  }

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      p-6
    ">

      <div className="
        border
        border-gray-700
        bg-gray-900
        shadow-2xl
        p-8
        rounded-2xl
        max-w-2xl
        w-full
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-8
          text-center
        ">
          Reservation Details
        </h1>

        <div className="space-y-4">

          <p className="text-lg">
            <span className="font-semibold">
              Reservation ID:
            </span>
            {" "}
            {reservation.id}
          </p>

          <p className="text-lg">
            <span className="font-semibold">
              Status:
            </span>
            {" "}
            {reservation.status}
          </p>

          <p className="text-lg">
            <span className="font-semibold">
              Time Left:
            </span>
            {" "}
            {timeLeft}
          </p>

        </div>

        <div className="
          flex
          gap-4
          mt-8
        ">

          <button
            onClick={confirmPurchase}
            className="
              flex-1
              bg-green-600
              hover:bg-green-700
              text-white
              px-4
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Confirm Purchase
          </button>

          <button
            onClick={cancelReservation}
            className="
              flex-1
              bg-red-600
              hover:bg-red-700
              text-white
              px-4
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Cancel Reservation
          </button>

        </div>

      </div>

    </div>
  );
}
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
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Reservation Details
      </h1>

      <div className="border p-6 rounded-lg">

        <p>
          Reservation ID:
          {" "}
          {reservation.id}
        </p>

        <p>
          Status:
          {" "}
          {reservation.status}
        </p>

        <p>
          Time Left:
          {" "}
          {timeLeft}
        </p>

      </div>

    </div>
  );
}
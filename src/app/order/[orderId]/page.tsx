"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

type Order = {
  id: string;
  name: string;
  quantity: number;
  city: string;
  state: string;
  country: string;
  createdAt: string;
};

export default function ConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId;

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!token) {
          setError("Missing token");
          return;
        }

        const res = await fetch(`/api/order/${orderId}?token=${token}`);

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Order not found.");
          return;
        }

        setOrder(data.order);
      } catch (err) {
        setError("Failed to fetch order.");
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We’ve received your order and will process it shortly.
        </p>

        <div className="bg-white p-4 rounded shadow text-left w-full max-w-md mx-auto mb-6">
          <p>
            <strong>Order Id:</strong> {order.id}
          </p>
          <p>
            <strong>Name:</strong> {order.name}
          </p>
          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>
          <p>
            <strong>City:</strong> {order.city}
          </p>
          <p>
            <strong>State/Province:</strong> {order.state}
          </p>
          <p>
            <strong>Country:</strong> {order.country}
          </p>
          <p>
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="primary" onClick={() => router.push("/")}>
              Back to Home
            </Button>
            <Button variant="secondary" onClick={() => router.push("/order")}>
              Get Splash Again!!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import OrderForm from "../components/OrderForm";

export default function OrderPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 ">
      <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-orange-800">
          Get Your Splash
        </h2>
        <OrderForm />
      </div>
    </div>
  );
}

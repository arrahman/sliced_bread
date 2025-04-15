"use client";

import React from "react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
import InputField from "./InputField";
import CountrySelect from "./CountrySelect";
import StateSelect from "./StateSelect";
import { orderSchema } from "../validation/orderSchema";

export default function OrderForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    city: "",
    state: "",
    country: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      if (errors[name as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = orderSchema.parse(form);

      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/order/${result.orderId}/?token=${result.token}`);
      } else {
        setErrors(result.error || "Something went wrong.");
      }
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err);
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach(({ path, message }) => {
          const field = path[0] as string;
          fieldErrors[field] = message;
        });
        setErrors(fieldErrors);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Name"
        name="name"
        value={form.name}
        error={errors.name}
        onChange={handleChange}
      />
      <InputField
        label="Quantity"
        name="quantity"
        type="number"
        value={form.quantity}
        error={errors.quantity}
        onChange={handleChange}
      />
      <CountrySelect
        value={form.country}
        error={errors.country}
        onChange={handleChange}
      />
      <StateSelect
        country={form.country}
        value={form.state}
        error={errors.state}
        onChange={handleChange}
      />
      <InputField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        error={errors.city}
      />

      {generalError && (
        <p className="text-red-600 text-sm text-center">{generalError}</p>
      )}

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition duration-200"
      >
        Get Splash!!
      </button>
    </form>
  );
}

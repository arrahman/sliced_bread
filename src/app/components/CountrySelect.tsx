"use client";

import React from "react";

type Props = {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function CountrySelect({ value, error, onChange }: Props) {
  const id = "country-select";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-orange-700 mb-1"
      >
        Country *
      </label>
      <select
        id={id}
        name="country"
        value={value}
        onChange={onChange}
        className={`w-full border ${
          error ? "border-red-400" : "border-gray-300"
        } rounded px-3 py-2 focus:ring-2 focus:ring-orange-400`}
      >
        <option value="">Select a country</option>
        <option value="Canada">Canada</option>
        <option value="United States">United States</option>
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

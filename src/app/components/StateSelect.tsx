"use client";

import React from "react";
import { statesByCountry } from "../../../lib/locations";

type Props = {
  country: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function StateSelect({
  country,
  value,
  error,
  onChange,
}: Props) {
  const regions = statesByCountry[country] || [];
  const id = "state-select";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-orange-700 mb-1"
      >
        State/Province *
      </label>
      <select
        id={id}
        name="state"
        value={value}
        onChange={onChange}
        className={`w-full border ${
          error ? "border-red-400" : "border-gray-300"
        } rounded px-3 py-2 focus:ring-2 focus:ring-orange-400`}
        disabled={!country}
      >
        <option value="">Select a state/province</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

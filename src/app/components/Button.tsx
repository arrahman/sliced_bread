"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const baseStyle =
    "font-semibold py-2 px-4 rounded transition duration-200 inline-block";

  const variantStyle =
    variant === "primary"
      ? "bg-orange-500 hover:bg-orange-600 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle}`}
    >
      {children}
    </button>
  );
}

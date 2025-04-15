import { z } from "zod";

export const orderSchema = z.object({
  name: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Za-z\s'-]{2,}$/.test(val), {
      message: "Invalid Name",
    }),
  quantity: z
    .string()
    .optional()
    .refine((val) => !val || Number(val) > 0, {
      message: "Quantity must be greater than 0",
    }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State/Province is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export type OrderFormData = z.infer<typeof orderSchema>;

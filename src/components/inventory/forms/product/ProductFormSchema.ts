import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category_id: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  purchase_price: z.string().min(1, "Purchase price is required"),
  target_price: z.string().min(1, "Target price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  condition: z.string().min(1, "Condition is required"),
  notes: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
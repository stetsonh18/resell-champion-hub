import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category_id: z.string().optional(),
  purchase_price: z.number().min(0, "Purchase price must be positive"),
  target_price: z.number().min(0, "Target price must be positive"),
  quantity: z.number().int().min(0, "Quantity must be positive"),
  condition: z.string(),
  notes: z.string().optional(),
  store_id: z.string().optional(),
  location: z.string().optional(),
  purchase_date: z.date().optional(),
  status: z.enum(['in_stock', 'listed', 'pending_shipment', 'shipped']).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
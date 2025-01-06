import { z } from "zod";

export const saleFormSchema = z.object({
  sale_date: z.string(),
  product_id: z.string(),
  platform_id: z.string(),
  sale_price: z.number().min(0),
  quantity: z.number().min(1),
  estimated_profit: z.number(),
  shipping_amount_collected: z.number().default(0),
  shipping_cost: z.number().default(0),
  platform_fees: z.number().default(0),
});

export type SaleFormValues = z.infer<typeof saleFormSchema>;
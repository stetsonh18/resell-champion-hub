import { z } from "zod";

export const profileFormSchema = z.object({
  display_name: z.string().min(2, "Display name must be at least 2 characters"),
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  business_name: z.string().optional(),
  tax_id: z.string().optional(),
  shipping_address: z.string(),
  preferred_currency: z.string(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
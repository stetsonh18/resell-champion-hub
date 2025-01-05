import * as z from "zod";

export const storeFormSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  location: z.string().min(1, "Location is required"),
  notes: z.string().optional(),
});

export type StoreFormValues = z.infer<typeof storeFormSchema>;
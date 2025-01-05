import * as z from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["category", "subcategory"]),
  parentId: z.string().optional().nullable(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
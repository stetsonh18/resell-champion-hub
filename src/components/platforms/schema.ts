import * as z from "zod";

export const platformFormSchema = z.object({
  name: z.string().min(1, "Platform name is required"),
  url: z.string().url("Must be a valid URL").min(1, "URL is required"),
  base_fee: z.number().min(0, "Base fee must be positive"),
  percentage_fee: z.number().min(0, "Percentage fee must be positive").max(100, "Percentage fee cannot exceed 100"),
  notes: z.string().optional(),
});

export type PlatformFormValues = z.infer<typeof platformFormSchema>;
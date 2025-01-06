import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  purchase_price: z.coerce.number().min(0, "Purchase price must be 0 or greater"),
  target_price: z.coerce.number().min(0, "Target price must be 0 or greater"),
  quantity: z.coerce.number().min(0, "Quantity must be 0 or greater"),
  condition: z.enum(["new", "like_new", "very_good", "good", "acceptable", "for_parts"], {
    required_error: "Please select a condition",
  }),
  purchase_date: z.date({
    required_error: "Please select a purchase date",
  }),
  notes: z.string().optional(),
  store_id: z.string().optional(),
  category_id: z.string().optional(),
  status: z.enum(["in_stock", "listed", "pending_shipment", "shipped"]).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
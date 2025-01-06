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
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const useProductForm = (onSuccess: () => void, productId?: string) => {
  const queryClient = useQueryClient();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      purchase_price: 0,
      target_price: 0,
      quantity: 0,
      condition: undefined,
      notes: "",
      store_id: undefined,
      category_id: undefined,
      purchase_date: new Date(),
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Prepare the data for database insertion/update
      const { purchase_date, ...rest } = data;
      const productData = {
        ...rest,
        purchase_date: purchase_date.toISOString(),
        user_id: user.id,
      };

      if (productId) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", productId);

        if (error) throw error;

        toast.success("Product updated successfully");
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productData]);  // Note: Wrap in array for insert

        if (error) throw error;

        toast.success("Product created successfully");
      }

      queryClient.invalidateQueries({ queryKey: ["products"] });
      onSuccess();
      form.reset();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(productId ? "Failed to update product" : "Failed to create product");
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
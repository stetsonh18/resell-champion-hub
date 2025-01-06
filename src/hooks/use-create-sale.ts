import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const saleFormSchema = z.object({
  product_id: z.string().min(1, "Product is required"),
  platform_id: z.string().min(1, "Platform is required"),
  sale_price: z.coerce.number().min(0, "Sale price must be 0 or greater"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  shipping_amount_collected: z.coerce.number().min(0).optional(),
  shipping_cost: z.coerce.number().min(0).optional(),
  platform_fees: z.coerce.number().min(0).optional(),
  sale_date: z.date({
    required_error: "Sale date is required",
  }),
});

export type SaleFormValues = z.infer<typeof saleFormSchema>;

interface HandleProductSaleParams {
  p_product_id: string;
  p_sale_quantity: number;
  p_user_id: string;
}

export const useCreateSale = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      product_id: "",
      platform_id: "",
      sale_price: 0,
      quantity: 1,
      shipping_amount_collected: 0,
      shipping_cost: 0,
      platform_fees: 0,
      sale_date: new Date(),
    },
  });

  const onSubmit = async (data: SaleFormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // First, get the product details
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", data.product_id)
        .single();

      if (productError) throw productError;
      if (!product) throw new Error("Product not found");

      // Calculate estimated profit
      const estimatedProfit = data.sale_price - (product.purchase_price * data.quantity);

      const saleData = {
        user_id: user.id,
        product_id: data.product_id,
        platform_id: data.platform_id,
        sale_price: data.sale_price,
        quantity: data.quantity,
        shipping_amount_collected: data.shipping_amount_collected || 0,
        shipping_cost: data.shipping_cost || 0,
        platform_fees: data.platform_fees || 0,
        estimated_profit: estimatedProfit,
        sale_date: data.sale_date.toISOString(),
      };

      // Call the handle_product_sale function
      const { error: transactionError } = await supabase.rpc(
        'handle_product_sale',
        {
          p_product_id: data.product_id,
          p_sale_quantity: data.quantity,
          p_user_id: user.id,
        } as HandleProductSaleParams
      );

      if (transactionError) throw transactionError;

      // Create the sale record
      const { error: saleError } = await supabase
        .from("sales")
        .insert(saleData);

      if (saleError) throw saleError;

      toast.success("Sale created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      onSuccess();
      form.reset();
    } catch (error) {
      console.error("Error creating sale:", error);
      toast.error("Failed to create sale");
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { saleFormSchema, type SaleFormValues } from "../types";

export const useSaleForm = (defaultValues?: SaleFormValues, saleId?: string, onSuccess?: () => void) => {
  const navigate = useNavigate();

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: defaultValues || {
      sale_date: new Date().toISOString(),
      sale_price: 0,
      quantity: 1,
      estimated_profit: 0,
      shipping_amount_collected: 0,
      shipping_cost: 0,
      platform_fees: 0,
      product_id: "",
      platform_id: "",
    },
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products-for-sale", defaultValues?.product_id, saleId],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("id, name, purchase_price");

      if (saleId || defaultValues?.product_id) {
        query = query.or('status.eq.listed,status.eq.pending_shipment');
        
        if (defaultValues?.product_id) {
          query = query.or(`id.eq.${defaultValues.product_id}`);
        }
      } else {
        query = query.eq('status', 'listed');
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });

  const { data: platforms, isLoading: isLoadingPlatforms } = useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platforms")
        .select("id, name, base_fee, percentage_fee");
      
      if (error) throw error;
      return data;
    },
  });

  const calculatePlatformFees = (platformId: string, salePrice: number) => {
    const platform = platforms?.find(p => p.id === platformId);
    if (platform) {
      const fees = platform.base_fee + (salePrice * platform.percentage_fee / 100);
      form.setValue('platform_fees', Number(fees.toFixed(2)));
    }
  };

  const onSubmit = async (values: SaleFormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // First, get the product details
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", values.product_id)
        .single();

      if (productError) throw productError;
      if (!product) throw new Error("Product not found");

      // Calculate estimated profit
      const estimatedProfit = values.sale_price - (product.purchase_price * values.quantity);

      const saleData = {
        user_id: user.id,
        product_id: values.product_id,
        platform_id: values.platform_id,
        sale_price: values.sale_price,
        quantity: values.quantity,
        shipping_amount_collected: values.shipping_amount_collected || 0,
        shipping_cost: values.shipping_cost || 0,
        platform_fees: values.platform_fees || 0,
        estimated_profit: estimatedProfit,
        sale_date: new Date(values.sale_date).toISOString(),
      };

      // Call the handle_product_sale function
      const { error: transactionError } = await supabase.rpc(
        'handle_product_sale',
        {
          p_product_id: values.product_id,
          p_sale_quantity: values.quantity,
          p_user_id: user.id,
        }
      );

      if (transactionError) throw transactionError;

      // Create the sale record
      const { error: saleError } = await supabase
        .from("sales")
        .insert(saleData);

      if (saleError) throw saleError;

      toast.success("Sale created successfully");
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating sale:", error);
      toast.error("Failed to create sale");
      throw error; // Re-throw the error to prevent modal from closing on failure
    }
  };

  return {
    form,
    products,
    platforms,
    isLoading: isLoadingProducts || isLoadingPlatforms,
    calculatePlatformFees,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
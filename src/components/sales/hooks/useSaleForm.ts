import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { saleFormSchema, type SaleFormValues } from "../types";

export const useSaleForm = (defaultValues?: SaleFormValues, saleId?: string, onSuccess?: () => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: defaultValues || {
      sale_date: new Date().toISOString().split('T')[0],
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

      // If editing an existing sale (saleId exists) or we have a default product,
      // show both listed and pending_shipment products
      if (saleId || defaultValues?.product_id) {
        query = query.or('status.eq.listed,status.eq.pending_shipment');
        
        // Add the specific product if we have a default value
        if (defaultValues?.product_id) {
          query = query.or(`id.eq.${defaultValues.product_id}`);
        }
      } else {
        // For new sales, only show products with 'listed' status
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
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("No user found");

      const saleData = {
        ...values,
        user_id: user.id,
        sale_date: values.sale_date,
        product_id: values.product_id,
        platform_id: values.platform_id,
        sale_price: values.sale_price,
      };

      if (saleId) {
        const { error: saleError } = await supabase
          .from("sales")
          .update(saleData)
          .eq("id", saleId);

        if (saleError) throw saleError;

        toast({
          title: "Sale updated successfully",
          description: "The sale has been updated.",
        });
      } else {
        const { error: saleError } = await supabase
          .from("sales")
          .insert(saleData);

        if (saleError) throw saleError;

        const { error: productError } = await supabase
          .from("products")
          .update({ status: "pending_shipment" })
          .eq("id", values.product_id);

        if (productError) throw productError;

        toast({
          title: "Sale added successfully",
          description: "The sale has been recorded and product status updated.",
        });
      }

      onSuccess?.();
      if (!saleId) {
        navigate("/sales");
      }
    } catch (error) {
      console.error("Error adding/updating sale:", error);
      toast({
        title: "Error with sale",
        description: "There was a problem with the sale. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    products,
    platforms,
    isLoading: isLoadingProducts || isLoadingPlatforms,
    calculatePlatformFees,
    onSubmit,
  };
};
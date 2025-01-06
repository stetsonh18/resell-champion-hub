import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { DateField } from "./form-fields/DateField";
import { ProductField } from "./form-fields/ProductField";
import { PlatformField } from "./form-fields/PlatformField";
import { PriceFields } from "./form-fields/PriceFields";
import { saleFormSchema, type SaleFormValues } from "./types";

export function SaleForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      sale_date: new Date().toISOString().split('T')[0],
      sale_price: 0,
      quantity: 1,
      estimated_profit: 0,
      shipping_amount_collected: 0,
      shipping_cost: 0,
      platform_fees: 0,
    },
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products-for-sale"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name")
        .eq("status", "listed");
      
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

  async function onSubmit(values: SaleFormValues) {
    try {
      const { error } = await supabase
        .from("sales")
        .insert([{
          ...values,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }]);

      if (error) throw error;

      toast({
        title: "Sale added successfully",
        description: "The sale has been recorded in the system.",
      });

      navigate("/sales");
    } catch (error) {
      console.error("Error adding sale:", error);
      toast({
        title: "Error adding sale",
        description: "There was a problem adding the sale. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (isLoadingProducts || isLoadingPlatforms) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DateField form={form} />
        <ProductField form={form} products={products} />
        <PlatformField 
          form={form} 
          platforms={platforms}
          onPlatformChange={(platformId) => 
            calculatePlatformFees(platformId, form.getValues('sale_price'))
          }
        />
        <PriceFields 
          form={form}
          onSalePriceChange={(price) => 
            calculatePlatformFees(form.getValues('platform_id'), price)
          }
        />
        <Button type="submit" className="w-full">
          Add Sale
        </Button>
      </form>
    </Form>
  );
}
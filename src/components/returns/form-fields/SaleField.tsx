import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const SaleField = ({ form, onSaleSelect }: { 
  form: any;
  onSaleSelect: (sale: any) => void;
}) => {
  const { data: sales, isLoading: isLoadingSales } = useQuery({
    queryKey: ["sold-products"],
    queryFn: async () => {
      const { data: sales, error } = await supabase
        .from("sales")
        .select(`
          id,
          sale_price,
          sale_date,
          product_id,
          products (
            name
          )
        `)
        .order('sale_date', { ascending: false });
      
      if (error) throw error;
      return sales;
    },
  });

  return (
    <FormField
      control={form.control}
      name="sale_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select Product</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              const sale = sales?.find(s => s.id === value);
              onSaleSelect(sale);
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a sold product" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {sales?.map((sale) => (
                <SelectItem key={sale.id} value={sale.id}>
                  {sale.products.name} - Sold on {new Date(sale.sale_date).toLocaleDateString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
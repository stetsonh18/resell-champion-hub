import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StoreFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const StoreField = ({ form }: StoreFieldProps) => {
  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("status", "active");
      if (error) throw error;
      return data;
    },
  });

  return (
    <FormField
      control={form.control}
      name="store_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Store</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="bg-[#1A1A1A] border-zinc-800 text-white">
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-[#1A1A1A] border-zinc-800">
              {stores?.map((store) => (
                <SelectItem 
                  key={store.id} 
                  value={store.id}
                  className="text-white hover:bg-zinc-800"
                >
                  {store.name}
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
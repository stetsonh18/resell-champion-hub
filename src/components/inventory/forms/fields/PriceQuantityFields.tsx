import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";

interface PriceQuantityFieldsProps {
  form: UseFormReturn<ProductFormValues>;
}

export function PriceQuantityFields({ form }: PriceQuantityFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="purchase_price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Purchase Price</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                {...field} 
                className="bg-[#1A1A1A] border-zinc-800 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="target_price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Target Price</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                {...field} 
                className="bg-[#1A1A1A] border-zinc-800 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Quantity</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="0" 
                {...field} 
                className="bg-[#1A1A1A] border-zinc-800 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
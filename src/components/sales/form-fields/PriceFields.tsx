import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SaleFormValues } from "../types";

interface PriceFieldsProps {
  form: UseFormReturn<SaleFormValues>;
  onSalePriceChange?: (price: number) => void;
}

export const PriceFields = ({ form, onSalePriceChange }: PriceFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="sale_price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sale Price</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                {...field}
                onChange={e => {
                  const value = parseFloat(e.target.value);
                  field.onChange(value);
                  onSalePriceChange?.(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="shipping_amount_collected"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shipping Amount Collected</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                {...field}
                onChange={e => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="shipping_cost"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shipping Cost</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                {...field}
                onChange={e => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="platform_fees"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Platform Fees</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                {...field}
                onChange={e => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
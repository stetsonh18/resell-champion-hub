import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type UseFormReturn } from "react-hook-form";
import { type SaleFormValues } from "../types";

interface PriceFieldsProps {
  form: UseFormReturn<SaleFormValues>;
  onSalePriceChange: (price: number) => void;
}

export function PriceFields({ form, onSalePriceChange }: PriceFieldsProps) {
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
                min="0"
                {...field}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
                  onSalePriceChange(Number(e.target.value));
                }}
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
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                step="1"
                {...field}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
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
                min="0"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
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
                min="0"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
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
                min="0"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                readOnly
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
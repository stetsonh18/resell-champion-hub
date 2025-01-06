import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";

interface DateFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const PurchaseDateField = ({ form }: DateFieldProps) => (
  <FormField
    control={form.control}
    name="purchase_date"
    render={({ field }) => {
      const value = field.value instanceof Date 
        ? field.value.toISOString().split('T')[0]
        : new Date(field.value).toISOString().split('T')[0];

      return (
        <FormItem className="flex flex-col">
          <FormLabel className="text-white">Purchase Date</FormLabel>
          <FormControl>
            <Input
              type="date"
              value={value}
              onChange={(e) => {
                field.onChange(new Date(e.target.value));
              }}
              className="bg-[#1A1A1A] border-zinc-800 text-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    }}
  />
);
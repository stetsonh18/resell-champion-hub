import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";
import { format } from "date-fns";

interface DateFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const PurchaseDateField = ({ form }: DateFieldProps) => (
  <FormField
    control={form.control}
    name="purchase_date"
    render={({ field }) => {
      // Convert UTC date to local date for input display
      const localDate = field.value instanceof Date ? field.value : new Date(field.value);
      const formattedDate = format(localDate, "yyyy-MM-dd");

      return (
        <FormItem className="w-full">
          <FormLabel>Purchase Date</FormLabel>
          <FormControl>
            <Input
              type="date"
              value={formattedDate}
              className="w-full"
              onChange={(e) => {
                // Convert local date back to UTC for storage
                const localDate = new Date(e.target.value);
                const utcDate = new Date(
                  Date.UTC(
                    localDate.getFullYear(),
                    localDate.getMonth(),
                    localDate.getDate()
                  )
                );
                field.onChange(utcDate);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    }}
  />
);
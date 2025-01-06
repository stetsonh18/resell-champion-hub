import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SaleFormValues } from "../types";

interface DateFieldProps {
  form: UseFormReturn<SaleFormValues>;
}

export const DateField = ({ form }: DateFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="sale_date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sale Date</FormLabel>
          <FormControl>
            <Input 
              type="date" 
              {...field} 
              value={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
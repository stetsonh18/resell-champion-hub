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
      render={({ field }) => {
        // Convert the date to YYYY-MM-DD format for the input
        const value = field.value ? new Date(field.value).toISOString().split('T')[0] : '';
        
        return (
          <FormItem>
            <FormLabel>Sale Date</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                value={value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SaleFormValues } from "../types";
import { format } from "date-fns";

interface DateFieldProps {
  form: UseFormReturn<SaleFormValues>;
}

export const DateField = ({ form }: DateFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="sale_date"
      render={({ field }) => {
        // Format the date to YYYY-MM-DD, handling both string and Date inputs
        const value = field.value 
          ? format(new Date(field.value), 'yyyy-MM-dd')
          : '';
        
        return (
          <FormItem>
            <FormLabel>Sale Date</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                value={value}
                onChange={(e) => {
                  // Ensure we store the date in ISO format
                  const date = new Date(e.target.value);
                  field.onChange(date.toISOString());
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SaleFormValues } from "../types";
import { format } from "date-fns";

interface DateFieldProps {
  form: UseFormReturn<SaleFormValues>;
}

export const DateField = ({ form }: DateFieldProps) => (
  <FormField
    control={form.control}
    name="sale_date"
    render={({ field }) => {
      // Convert UTC date to local date for input display
      const localDate = new Date(field.value);
      const formattedDate = format(localDate, "yyyy-MM-dd");

      return (
        <FormItem>
          <FormLabel>Sale Date</FormLabel>
          <FormControl>
            <Input
              type="date"
              value={formattedDate}
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
                field.onChange(utcDate.toISOString());
              }}
            />
          </FormControl>
        </FormItem>
      );
    }}
  />
);
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ExpenseFormData } from "../types";

interface AmountFieldProps {
  form: UseFormReturn<ExpenseFormData>;
}

export const AmountField = ({ form }: AmountFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input {...field} type="number" step="0.01" placeholder="0.00" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
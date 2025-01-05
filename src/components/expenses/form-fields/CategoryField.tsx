import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ExpenseFormData } from "../types";

interface CategoryFieldProps {
  form: UseFormReturn<ExpenseFormData>;
}

export const CategoryField = ({ form }: CategoryFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Input {...field} placeholder="e.g., Utilities" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
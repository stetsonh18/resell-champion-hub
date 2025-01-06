import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";

interface ConditionFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const ConditionField = ({ form }: ConditionFieldProps) => (
  <FormField
    control={form.control}
    name="condition"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Condition</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like_new">Like New</SelectItem>
            <SelectItem value="very_good">Very Good</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="acceptable">Acceptable</SelectItem>
            <SelectItem value="for_parts">For Parts</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
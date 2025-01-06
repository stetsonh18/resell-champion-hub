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
        <FormLabel className="text-white">Condition</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger className="bg-[#1A1A1A] border-zinc-800 text-white">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-[#1A1A1A] border-zinc-800">
            <SelectItem value="new" className="text-white hover:bg-zinc-800">New</SelectItem>
            <SelectItem value="like_new" className="text-white hover:bg-zinc-800">Like New</SelectItem>
            <SelectItem value="very_good" className="text-white hover:bg-zinc-800">Very Good</SelectItem>
            <SelectItem value="good" className="text-white hover:bg-zinc-800">Good</SelectItem>
            <SelectItem value="acceptable" className="text-white hover:bg-zinc-800">Acceptable</SelectItem>
            <SelectItem value="for_parts" className="text-white hover:bg-zinc-800">For Parts</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
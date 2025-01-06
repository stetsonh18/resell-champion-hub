import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";

interface LocationFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const LocationField = ({ form }: LocationFieldProps) => (
  <FormField
    control={form.control}
    name="location"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Location</FormLabel>
        <FormControl>
          <Input 
            placeholder="Enter storage location" 
            {...field} 
            className="bg-background h-10"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
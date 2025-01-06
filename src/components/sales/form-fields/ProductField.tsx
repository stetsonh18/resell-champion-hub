import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SaleFormValues } from "../types";

interface ProductFieldProps {
  form: UseFormReturn<SaleFormValues>;
  products?: any[];
}

export const ProductField = ({ form, products }: ProductFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="product_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {products?.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-create-product";

interface StatusFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const StatusField = ({ form }: StatusFieldProps) => (
  <FormField
    control={form.control}
    name="status"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-white">Status</FormLabel>
        <Select onValueChange={field.onChange} value={field.value || "in_stock"}>
          <FormControl>
            <SelectTrigger className="bg-[#1A1A1A] border-zinc-800 text-white">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-[#1A1A1A] border-zinc-800">
            <SelectItem value="in_stock" className="text-white hover:bg-zinc-800">In Stock</SelectItem>
            <SelectItem value="listed" className="text-white hover:bg-zinc-800">Listed</SelectItem>
            <SelectItem value="pending_shipment" className="text-white hover:bg-zinc-800">Pending Shipment</SelectItem>
            <SelectItem value="shipped" className="text-white hover:bg-zinc-800">Shipped</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
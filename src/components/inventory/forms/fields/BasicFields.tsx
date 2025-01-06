import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-product-form";

interface FormFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

export const NameField = ({ form }: FormFieldProps) => (
  <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="Enter product name" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const NotesField = ({ form }: FormFieldProps) => (
  <FormField
    control={form.control}
    name="notes"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Notes</FormLabel>
        <FormControl>
          <Textarea placeholder="Add any additional notes" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);